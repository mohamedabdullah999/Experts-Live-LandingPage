import { createHash } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { applicationSchema, toFieldErrors, type Application } from '@/lib/applications';
import { getPool } from '@/lib/db';
import { isRateLimited } from '@/lib/rate-limit';

export const runtime = 'nodejs';

type ApiError = 'invalid' | 'rate_limited' | 'server' | 'too_large';

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

/**
 * The app is meant to run behind one reverse proxy (nginx, Azure, DO load balancer) that appends
 * the real client IP to X-Forwarded-For. Visitors can forge the *start* of that header, so we take
 * the entry added by our own proxy: the last one. Set TRUSTED_PROXY_HOPS if there are more proxies.
 */
function clientIp(req: NextRequest): string {
  const hops = Math.max(1, Number(process.env.TRUSTED_PROXY_HOPS ?? 1));
  const chain = (req.headers.get('x-forwarded-for') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return chain[chain.length - hops] ?? req.headers.get('x-real-ip') ?? 'unknown';
}

const MAX_BODY_BYTES = 10_000;

/** Reads the body as text but stops at MAX_BODY_BYTES, even when no Content-Length is sent. */
async function readLimited(req: NextRequest): Promise<string | null> {
  if (!req.body) return '';
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? '';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

function toRow(app: Application) {
  if (app.kind === 'startup') {
    return {
      organisation: app.startupName,
      pitchDeckUrl: app.pitchDeck,
      details: {
        website: app.website,
        sector: app.sector,
        stage: app.stage,
        pitch: app.pitch,
      },
    };
  }
  return {
    organisation: app.organisation,
    pitchDeckUrl: null,
    details: { role: app.role, investorType: app.investorType },
  };
}

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) return json(413, { ok: false, error: 'too_large' satisfies ApiError });

  const ip = clientIp(req);
  const ipHash = hashIp(ip);
  if (isRateLimited(ipHash)) return json(429, { ok: false, error: 'rate_limited' satisfies ApiError });

  const raw = await readLimited(req);
  if (raw === null) return json(413, { ok: false, error: 'too_large' satisfies ApiError });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: 'invalid' satisfies ApiError, fields: {} });
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return json(422, { ok: false, error: 'invalid' satisfies ApiError, fields: toFieldErrors(parsed.error) });
  }

  const app = parsed.data;

  // Honeypot filled: pretend success so bots learn nothing, store nothing.
  if (app.company_url) return json(201, { ok: true });

  const { organisation, pitchDeckUrl, details } = toRow(app);

  try {
    await getPool().query(
      `INSERT INTO applications
         (kind, full_name, email, phone, organisation, locale, details, consent_at, ip_hash, user_agent, pitch_deck_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, now(), $8, $9, $10)`,
      [
        app.kind,
        app.fullName,
        app.email.toLowerCase(),
        app.phone,
        organisation,
        app.locale,
        JSON.stringify(details),
        ipHash,
        req.headers.get('user-agent')?.slice(0, 400) ?? null,
        pitchDeckUrl,
      ],
    );
  } catch (err) {
    const detail = describeDbError(err);
    console.error(`[applications] insert failed: ${detail}`);
    // In development, return the reason so it shows in the browser's Network tab
    return json(500, {
      ok: false,
      error: 'server' satisfies ApiError,
      ...(process.env.NODE_ENV !== 'production' ? { detail } : {}),
    });
  }

  return json(201, { ok: true });
}

/** Turns common setup mistakes into a clear hint for the server log. */
function describeDbError(err: unknown): string {
  const e = err as { code?: string; message?: string };
  if (e?.message?.includes('DATABASE_URL is not set')) return 'DATABASE_URL is not set. Copy .env.example to .env and restart the server.';
  if (e?.code === 'ECONNREFUSED') return 'PostgreSQL is not running or not reachable at DATABASE_URL. Start it (docker compose up -d db).';
  if (e?.code === '42P01') return 'Table "applications" does not exist. Run: pnpm db:migrate';
  if (e?.code === '28P01') return 'Wrong database user or password in DATABASE_URL.';
  if (e?.code === '3D000') return 'Database in DATABASE_URL does not exist. Create it or use docker compose up -d db.';
  return e?.message ?? String(err);
}

export function GET() {
  return json(405, { ok: false, error: 'method_not_allowed' });
}

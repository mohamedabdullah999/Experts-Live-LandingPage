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

function clientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? '';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

function toRow(app: Application) {
  if (app.kind === 'startup') {
    return {
      organisation: app.startupName,
      details: {
        website: app.website ?? null,
        sector: app.sector,
        stage: app.stage,
        pitch: app.pitch,
        interests: app.interests,
      },
    };
  }
  return {
    organisation: app.organisation,
    details: { role: app.role, investorType: app.investorType, focusSectors: app.focusSectors },
  };
}

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get('content-length') ?? 0);
  if (contentLength > 10_000) return json(413, { ok: false, error: 'too_large' satisfies ApiError });

  const ip = clientIp(req);
  const ipHash = hashIp(ip);
  if (isRateLimited(ipHash)) return json(429, { ok: false, error: 'rate_limited' satisfies ApiError });

  let body: unknown;
  try {
    body = await req.json();
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

  const { organisation, details } = toRow(app);

  try {
    await getPool().query(
      `INSERT INTO applications
         (kind, full_name, email, phone, organisation, locale, details, consent_at, ip_hash, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, now(), $8, $9)`,
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
      ],
    );
  } catch (err) {
    console.error('[applications] insert failed', err instanceof Error ? err.message : err);
    return json(500, { ok: false, error: 'server' satisfies ApiError });
  }

  return json(201, { ok: true });
}

export function GET() {
  return json(405, { ok: false, error: 'method_not_allowed' });
}

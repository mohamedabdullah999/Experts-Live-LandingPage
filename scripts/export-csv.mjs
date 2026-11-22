// Exports applications to exports/applications-<date>.csv. Usage: pnpm db:export [startup|investor]
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

// Load .env from the project root when the variables aren't already set (Node 20.12+)
try {
  process.loadEnvFile(path.resolve(import.meta.dirname, '..', '.env'));
} catch {
  // no .env file: rely on the environment
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}
const kind = process.argv[2];
if (kind && !['startup', 'investor'].includes(kind)) {
  console.error('kind must be "startup" or "investor"');
  process.exit(1);
}

const client = new pg.Client({ connectionString: url });
await client.connect();
const { rows } = await client.query(
  `SELECT id, kind, status, created_at, full_name, email, phone, organisation, pitch_deck_url, locale, details
     FROM applications ${kind ? 'WHERE kind = $1' : ''} ORDER BY created_at DESC`,
  kind ? [kind] : [],
);
await client.end();

const detailKeys = [...new Set(rows.flatMap((r) => Object.keys(r.details ?? {})))].sort();
const header = ['id', 'kind', 'status', 'created_at', 'full_name', 'email', 'phone', 'organisation', 'pitch_deck_url', 'locale', ...detailKeys];
const cell = (v) => {
  if (v === null || v === undefined) return '';
  const s = Array.isArray(v) ? v.join('; ') : v instanceof Date ? v.toISOString() : String(v);
  // Quote, escape quotes and neutralise spreadsheet formulas
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
};
const lines = [header.join(',')];
for (const r of rows) {
  lines.push(header.map((h) => cell(h in r ? r[h] : r.details?.[h])).join(','));
}

const outDir = path.resolve(import.meta.dirname, '..', 'exports');
await mkdir(outDir, { recursive: true });
const file = path.join(outDir, `applications-${kind ?? 'all'}-${new Date().toISOString().slice(0, 10)}.csv`);
// BOM so Excel opens Arabic text correctly
await writeFile(file, '﻿' + lines.join('\n'), 'utf8');
console.log(`wrote ${rows.length} rows to ${file}`);

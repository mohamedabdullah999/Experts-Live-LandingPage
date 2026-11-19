// Applies db/migrations/*.sql in order, once each. Usage: pnpm db:migrate
import { readdir, readFile } from 'node:fs/promises';
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

const dir = path.resolve(import.meta.dirname, '..', 'db', 'migrations');

// A freshly started Postgres container restarts once while it initialises.
// Retry for up to ~30 s instead of failing on the first refused connection.
async function connectWithRetry(attempts = 15, delayMs = 2000) {
  for (let i = 1; ; i++) {
    const c = new pg.Client({ connectionString: url });
    try {
      await c.connect();
      return c;
    } catch (err) {
      await c.end().catch(() => {});
      if (i >= attempts) throw err;
      console.log(`database not ready (${err.code ?? err.message}), retrying ${i}/${attempts - 1}…`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

const client = await connectWithRetry();

try {
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    name TEXT PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`);
  const done = new Set((await client.query('SELECT name FROM schema_migrations')).rows.map((r) => r.name));
  const files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort();

  for (const file of files) {
    if (done.has(file)) continue;
    const sql = await readFile(path.join(dir, file), 'utf8');
    await client.query('BEGIN');
    try {
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
      await client.query('COMMIT');
      console.log(`applied ${file}`);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  }
  console.log('migrations up to date');
} finally {
  await client.end();
}

import 'server-only';
import { Pool } from 'pg';

declare global {
  // Reuse one pool across hot reloads in development
  var __elksaPool: Pool | undefined;
}

export function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  if (!globalThis.__elksaPool) {
    globalThis.__elksaPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }
  return globalThis.__elksaPool;
}

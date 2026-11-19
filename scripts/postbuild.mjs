// Copies static assets next to the standalone server so `pnpm start` serves them.
import { cp } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
await cp(path.join(root, 'public'), path.join(root, '.next/standalone/public'), { recursive: true });
await cp(path.join(root, '.next/static'), path.join(root, '.next/standalone/.next/static'), { recursive: true });
console.log('standalone assets copied');

import Link from 'next/link';
import en from '@/content/en';

export default function NotFound() {
  const c = en.notFound;
  return (
    <main id="main" className="container" style={{ minHeight: '70vh', display: 'grid', alignContent: 'center', gap: '1rem' }}>
      <h1 style={{ fontSize: 'var(--fs-2xl)' }}>{c.heading}</h1>
      <p>{c.body}</p>
      <p>
        <Link href="/en" style={{ color: 'var(--cyan)' }}>
          {c.back}
        </Link>
      </p>
    </main>
  );
}

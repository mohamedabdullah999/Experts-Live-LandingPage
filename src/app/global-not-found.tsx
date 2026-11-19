import type { Metadata } from 'next';
import { montserrat, plexArabic } from '@/lib/fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Page not found | Experts Live Saudi 2026',
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${montserrat.variable} ${plexArabic.variable}`}>
      <body>
        <main
          id="main"
          className="container"
          style={{ minHeight: '100svh', display: 'grid', alignContent: 'center', gap: 'var(--space-5)' }}
        >
          <h1 style={{ fontSize: 'var(--fs-2xl)' }}>This page doesn’t exist</h1>
          <p>The link may be old or mistyped.</p>
          <p lang="ar" dir="rtl" style={{ fontFamily: 'var(--font-ar-body)' }}>
            هذه الصفحة غير موجودة. ربما الرابط قديم أو فيه خطأ.
          </p>
          <p style={{ display: 'flex', gap: 'var(--space-5)' }}>
            <a href="/en" style={{ color: 'var(--cyan)' }}>
              Go to the English page
            </a>
            <a href="/ar" lang="ar" style={{ color: 'var(--cyan)', fontFamily: 'var(--font-ar-body)' }}>
              الصفحة العربية
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}

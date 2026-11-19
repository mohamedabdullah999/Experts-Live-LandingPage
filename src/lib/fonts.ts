import localFont from 'next/font/local';

// Montserrat (Latin, variable 100–900), IBM Plex Sans Arabic, Reem Kufi — per BRAND.md.
// Files are vendored from @fontsource (SIL Open Font License 1.1).
export const montserrat = localFont({
  src: '../fonts/montserrat-latin-var.woff2',
  variable: '--font-montserrat',
  weight: '100 900',
  display: 'swap',
  fallback: ['Segoe UI', 'system-ui', 'sans-serif'],
});

export const plexArabic = localFont({
  src: [
    { path: '../fonts/plex-arabic-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/plex-arabic-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/plex-arabic-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-plex-arabic',
  display: 'swap',
  // ~135 KB for three weights: load on demand instead of blocking the English page
  preload: false,
  fallback: ['Tahoma', 'sans-serif'],
});

export const reemKufi = localFont({
  src: [
    { path: '../fonts/reem-kufi-arabic-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/reem-kufi-arabic-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-reem-kufi',
  display: 'swap',
  fallback: ['Tahoma', 'sans-serif'],
});

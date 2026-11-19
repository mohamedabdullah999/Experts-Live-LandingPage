import { NextResponse, type NextRequest } from 'next/server';

/** Sends "/" to /ar or /en based on the browser language. Everything else passes through. */
export function proxy(request: NextRequest) {
  const accept = request.headers.get('accept-language') ?? '';
  const prefersArabic = accept
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)[0]?.tag.startsWith('ar');

  const url = request.nextUrl.clone();
  url.pathname = prefersArabic ? '/ar' : '/en';
  return NextResponse.redirect(url, 307);
}

export const config = { matcher: ['/'] };

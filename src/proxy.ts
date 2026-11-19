import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, locales } from '@/i18n/config';

const COOKIE = 'NEXT_LOCALE';

function pickLocale(req: NextRequest) {
  const saved = req.cookies.get(COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;
  const accept = req.headers.get('accept-language') ?? '';
  for (const part of accept.split(',')) {
    const code = part.trim().split(';')[0].toLowerCase().split('-')[0];
    if ((locales as readonly string[]).includes(code)) return code;
  }
  return defaultLocale;
}

// Next 16: proxy.ts. On Next 15 rename this file to middleware.ts and the function to `middleware`.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split('/')[1];

  // /fa/... : remember the choice
  if (isLocale(first)) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE, first, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return res;
  }

  // /about  ->  /<locale>/about
  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/((?!_next|api|.*\\..*).*)'] };

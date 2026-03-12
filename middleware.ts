import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from './i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false, // always use defaultLocale (ro) unless /en prefix
})

export default function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
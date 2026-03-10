import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

// Handles locale routing:
// / → /ro (redirect to default locale)
// /en/asistent → serves English version
// Manual selector in header changes locale via cookie
export default createMiddleware({
  locales,
  defaultLocale,
  // Keep locale prefix for all locales so URLs are explicit
  localePrefix: 'always',
})

export const config = {
  // Match all paths except API routes, static files, and Next.js internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

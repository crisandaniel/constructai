import { getRequestConfig } from 'next-intl/server'

// Supported locales — add new ones here and create messages/{locale}.json
export const locales = ['ro', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ro'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})

import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n'
import { Header } from '@/components/layout/Header'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('title'), description: t('description') }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate that the locale is supported
  if (!locales.includes(locale as Locale)) notFound()

  // Load messages for this locale and pass to client components
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="pt-16 relative z-10 min-h-screen">{children}</main>
    </NextIntlClientProvider>
  )
}

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
  const url = `https://constructai.ro/${locale}`

  return {
    title: {
      default:  t('title'),
      template: '%s | ConstructAI',
    },
    description: t('description'),
    metadataBase: new URL('https://constructai.ro'),
    alternates: {
      canonical: url,
      languages: {
        'ro': '/ro',
        'en': '/en',
      },
    },
    openGraph: {
      title:       t('title'),
      description: t('description'),
      url,
      siteName:    'ConstructAI',
      locale:      locale === 'ro' ? 'ro_RO' : 'en_US',
      type:        'website',
    },
    twitter: {
      card:        'summary_large_image',
      title:       t('title'),
      description: t('description'),
    },
    robots: {
      index:  true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as Locale)) notFound()
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="pt-16 relative z-10 min-h-screen">{children}</main>
    </NextIntlClientProvider>
  )
}
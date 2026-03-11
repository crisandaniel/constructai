import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t    = await getTranslations({ locale, namespace: 'meta' })
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://constructai.ro'

  return {
    title:       t('titleCalculator'),
    description: t('descriptionCalculator'),
    alternates: {
      canonical: `${base}/${locale}/calculator`,
      languages: {
        'ro': `${base}/ro/calculator`,
        'en': `${base}/en/calculator`,
      },
    },
    openGraph: {
      title:       t('titleCalculator'),
      description: t('descriptionCalculator'),
      url:         `${base}/${locale}/calculator`,
      siteName:    'ConstructAI',
      locale:      locale === 'ro' ? 'ro_RO' : 'en_US',
      type:        'website',
    },
  }
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
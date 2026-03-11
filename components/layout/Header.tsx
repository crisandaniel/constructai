'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { locales, type Locale } from '@/i18n'

const LOCALE_LABELS: Record<Locale, string> = {
  ro: 'RO',
  en: 'EN',
}

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  // Switch locale while staying on the same page
  // Pathname is like /ro/asistent → replace /ro with /en
  function switchLocale(next: Locale) {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  const base = `/${locale}`

  return (
    <header className="header">
      <Link href={base} className="header__logo">
        <div className="header__logo-icon">⬡</div>
        <span className="header__logo-text">
          Construct<span>AI</span>
        </span>
      </Link>

      <nav className="header__nav">
        <Link href={`${base}/calculator`} className="header__nav-link">{t('calculator')}</Link>
        <Link href={`${base}/materiale`} className="header__nav-link">{t('materials')}</Link>
        <Link href={`${base}/asistent`}  className="header__nav-link">{t('assistant')}</Link>

        {/* Language selector */}
        <div className="flex items-center gap-1 ml-2 border border-subtle rounded-lg overflow-hidden">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`px-3 py-1.5 text-xs font-bold tracking-widest transition-colors ${
                locale === loc
                  ? 'bg-gold text-concrete'
                  : 'text-dust hover:text-lime'
              }`}
            >
              {LOCALE_LABELS[loc]}
            </button>
          ))}
        </div>

        <Link href={`${base}/asistent`} className="header__nav-cta">{t('cta')}</Link>
      </nav>
    </header>
  )
}

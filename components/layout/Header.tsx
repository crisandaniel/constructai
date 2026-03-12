'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { locales, type Locale } from '@/i18n'

const LOCALE_LABELS: Record<Locale, string> = { ro: 'RO', en: 'EN' }

function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/')[1]
  return locales.includes(seg as Locale) ? (seg as Locale) : 'ro'
}

function getBarePath(pathname: string): string {
  const segments = pathname.split('/')
  // ['', 'en', 'calculator'] → /calculator
  // ['', 'calculator']       → /calculator
  if (locales.includes(segments[1] as Locale)) {
    const rest = segments.slice(2).join('/')
    return rest ? '/' + rest : '/'
  }
  return pathname
}

function FeedbackModal({ onClose, locale }: { onClose: () => void; locale: string }) {
  const [message, setMessage] = useState('')
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const pathname = usePathname()

  async function submit() {
    if (!message.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/feedback', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, email, page: pathname, locale }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl border border-subtle bg-card p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-syne font-bold text-lg">💡 Sugestii</h2>
            <p className="text-dust text-xs mt-0.5">Ajută-mă să devin mai bun</p>
          </div>
          <button onClick={onClose} className="text-dust hover:text-sand text-xl leading-none">×</button>
        </div>
        {status === 'done' ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🙏</div>
            <p className="text-sand font-medium">Mulțumesc! Feedback-ul tău contează.</p>
            <button onClick={onClose} className="mt-4 text-xs text-dust hover:text-sand">Închide</button>
          </div>
        ) : (
          <>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Ce ar trebui să îmbunătățesc? Ce îți lipsește? Ce nu funcționează?"
              rows={4}
              className="w-full bg-surface border border-subtle rounded-xl px-4 py-3 text-sand text-sm outline-none focus:border-gold resize-none mb-3"
            />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email (opțional — dacă vrei să te contactez)"
              className="w-full bg-surface border border-subtle rounded-xl px-4 py-2.5 text-sand text-sm outline-none focus:border-gold mb-4"
            />
            {status === 'error' && <p className="text-red-400 text-xs mb-3">Eroare — încearcă din nou.</p>}
            <button
              onClick={submit}
              disabled={!message.trim() || status === 'sending'}
              className="w-full bg-gold text-concrete font-syne font-bold py-2.5 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {status === 'sending' ? 'Se trimite...' : 'Trimite sugestia'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export function Header() {
  const t            = useTranslations('nav')
  const pathname     = usePathname()
  const router       = useRouter()
  const locale       = getLocaleFromPath(pathname)
  const [showFeedback, setShowFeedback] = useState(false)

  function switchLocale(next: Locale) {
    const barePath = getBarePath(pathname)
    const target   = next === 'ro' ? barePath : `/${next}${barePath === '/' ? '' : barePath}`
    router.push(target)
  }

  const base = locale === 'ro' ? '' : `/${locale}`

  return (
    <>
      <header className="header">
        <Link href={base || '/'} className="header__logo">
          <div className="header__logo-icon">⬡</div>
          <span className="header__logo-text">Construct<span>AI</span></span>
        </Link>

        <nav className="header__nav">
          <Link href={`${base}/calculator`} className="header__nav-link">{t('calculator')}</Link>
          <Link href={`${base}/materiale`}  className="header__nav-link">{t('materials')}</Link>
          <Link href={`${base}/asistent`}   className="header__nav-link">{t('assistant')}</Link>

          <button
            onClick={() => setShowFeedback(true)}
            className="header__nav-link text-gold/80 hover:text-gold transition"
          >
            💡 Sugestii
          </button>

          <div className="flex items-center gap-1 ml-2 border border-subtle rounded-lg overflow-hidden">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`px-3 py-1.5 text-xs font-bold tracking-widest transition-colors ${
                  locale === loc ? 'bg-gold text-concrete' : 'text-dust hover:text-lime'
                }`}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>

          <Link href={`${base}/asistent`} className="header__nav-cta">{t('cta')}</Link>
        </nav>
      </header>

      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} locale={locale} />}
    </>
  )
}
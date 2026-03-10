import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { MATERIALS_KB } from '@/lib/materials-data'
import { MaterialsGrid } from '@/components/ui/MaterialsGrid'

interface Props {
  params: { locale: string }
}

export default async function HomePage({ params: { locale } }: Props) {
  const t       = await getTranslations('hero')
  const tStats  = await getTranslations('stats')
  const tKb     = await getTranslations('kb')
  const tCta    = await getTranslations('cta')
  const tFooter = await getTranslations('footer')

  return (
    <>
      {/* Hero */}
      <section className="max-w-app mx-auto px-4 py-12 md:px-6 md:py-24 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            <span className="animate-pulse-dot text-[0.4rem]">●</span>
            {t('badge')}
          </div>
          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl leading-none tracking-tight mb-4 md:mb-6">
            {t.rich('title', {
              highlight: (chunks) => (
                <em className="not-italic text-gold">{chunks}</em>
              ),
            })}
          </h1>
          <p className="text-dust text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md">{t('description')}</p>
          <div className="flex gap-3 flex-wrap">
            <Link href={`/${locale}/asistent`} className="btn btn--primary">{t('ctaPrimary')}</Link>
            <Link href={`/${locale}/asistent`} className="btn btn--secondary">{t('ctaSecondary')}</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-px bg-subtle rounded-xl overflow-hidden border border-subtle">
          {[
            { num: '200+', key: 'materials' },
            { num: '50+',  key: 'workTypes' },
            { num: '±5%',  key: 'precision' },
            { num: '24/7', key: 'availability' },
          ].map((s) => (
            <div key={s.key} className="stat-card">
              <div className="stat-card__number">{s.num}</div>
              <div className="stat-card__label">{tStats(s.key as any)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge base — client component handles filter strip + grid */}
      <section className="max-w-app mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="section__header">
          <h2 className="section__title">{tKb('title')}</h2>
          <p className="section__subtitle">{tKb('subtitle')}</p>
        </div>
        <MaterialsGrid
          materials={MATERIALS_KB}
          locale={locale}
          labels={{
            all:   tKb('all'),
            askAI: tKb('askAI'),
          }}
        />
      </section>

      {/* CTA */}
      <section className="border-t border-subtle bg-surface">
        <div className="max-w-app mx-auto px-4 md:px-6 py-12 md:py-20 text-center">
          <h2 className="font-syne font-extrabold text-2xl md:text-4xl mb-4">{tCta('title')}</h2>
          <p className="text-dust mb-8 max-w-md mx-auto">{tCta('description')}</p>
          <Link href={`/${locale}/asistent`} className="btn btn--primary inline-flex">
            {tCta('button')}
          </Link>
        </div>
      </section>

      <footer className="footer">
        <span className="footer__brand">ConstructAI © 2025</span>
        <span className="footer__note">{tFooter('disclaimer')}</span>
      </footer>
    </>
  )
}
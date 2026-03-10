import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { MATERIALS_KB } from '@/lib/materials-data'

interface Props {
  params: { locale: string }
}

export default async function MaterialePage({ params: { locale } }: Props) {
  const t = await getTranslations('materials')
  const categories = Array.from(new Set(MATERIALS_KB.map((m) => m.category)))

  return (
    <div className="max-w-app mx-auto px-6 py-12">
      <h1 className="font-syne font-extrabold text-4xl mb-2">{t('title')}</h1>
      <p className="text-dust mb-10">{t('subtitle')}</p>

      {categories.map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="font-syne font-bold text-xl text-gold mb-4 border-b border-subtle pb-2">{cat}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MATERIALS_KB.filter((m) => m.category === cat).map((m) => (
              <div key={m.id} className="material-card rounded-xl border border-subtle">
                <div className="material-card__name">{m.name}</div>
                <p className="material-card__description">{m.description}</p>
                <div className="space-y-1.5 mb-4">
                  {Object.entries(m.keyProperties).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-dust">{k}</span>
                      <span className="text-sand font-medium">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="material-card__specs">
                  {m.specs.map((s) => <span key={s} className="spec-tag">{s}</span>)}
                </div>
                <Link
                  href={`/${locale}/asistent?q=${encodeURIComponent(t('askFull', { name: m.name }))}`}
                  className="material-card__link mt-4"
                >
                  {t('title')} →
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

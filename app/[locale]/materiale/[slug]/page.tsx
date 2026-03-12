import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MATERIALS_KB } from '@/lib/materials-data'

export const dynamic = 'force-dynamic'

interface Props {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ params: { locale, slug } }: Props) {
  const material = MATERIALS_KB.find((m) => m.id === slug)
  if (!material) return {}

  return {
    title:       `${material.name} | ConstructAI`,
    description: material.description.slice(0, 160),
    openGraph: {
      title:       material.name,
      description: material.description.slice(0, 160),
    },
  }
}

export default async function MaterialPage({ params: { locale, slug } }: Props) {
  const t        = await getTranslations('materials')
  const material = MATERIALS_KB.find((m) => m.id === slug)

  if (!material) notFound()

  const askUrl = `/${locale}/asistent?q=${encodeURIComponent(t('askFull', { name: material.name }))}`

  return (
    <div className="max-w-app mx-auto px-4 md:px-6 py-10 md:py-14">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-dust mb-8">
        <Link href={locale === "ro" ? "/" : "/en"} className="hover:text-sand transition-colors">Acasă</Link>
        <span>›</span>
        <Link href={locale === "ro" ? "/materiale" : "/en/materiale"} className="hover:text-sand transition-colors">Materiale</Link>
        <span>›</span>
        <span className="text-sand">{material.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold mb-3">
          {material.category}
        </span>
        <h1 className="font-syne font-extrabold text-2xl md:text-4xl leading-tight mb-4">
          {material.name}
        </h1>
        <p className="text-dust text-base leading-relaxed max-w-2xl">
          {material.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Key Properties */}
        <div className="rounded-xl border border-subtle overflow-hidden">
          <div className="px-5 py-3 border-b border-subtle bg-surface">
            <h2 className="text-xs font-bold tracking-widest uppercase text-dust">Proprietăți cheie</h2>
          </div>
          <div className="divide-y divide-subtle">
            {Object.entries(material.keyProperties).map(([k, v]) => (
              <div key={k} className="flex justify-between px-5 py-3 hover:bg-surface transition-colors">
                <span className="text-sm text-dust">{k}</span>
                <span className="text-sm font-medium text-sand">{v as string}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Consumption */}
        {material.consumption && (
          <div className="rounded-xl border border-subtle overflow-hidden">
            <div className="px-5 py-3 border-b border-subtle bg-surface">
              <h2 className="text-xs font-bold tracking-widest uppercase text-dust">Consum</h2>
            </div>
            <div className="divide-y divide-subtle">
              {material.consumption.kgPerM2Standard && (
                <div className="flex justify-between px-5 py-3 hover:bg-surface transition-colors">
                  <span className="text-sm text-dust">Consum standard</span>
                  <span className="text-sm font-medium text-gold">{material.consumption.kgPerM2Standard} kg/m²</span>
                </div>
              )}
              {material.consumption.m2PerPackage && (
                <div className="flex justify-between px-5 py-3 hover:bg-surface transition-colors">
                  <span className="text-sm text-dust">Randament</span>
                  <span className="text-sm font-medium text-sand">{material.consumption.m2PerPackage} m²/{material.consumption.packageDescription}</span>
                </div>
              )}
              {material.consumption.thicknessMinMm && (
                <div className="flex justify-between px-5 py-3 hover:bg-surface transition-colors">
                  <span className="text-sm text-dust">Grosime aplicare</span>
                  <span className="text-sm font-medium text-sand">
                    {material.consumption.thicknessMinMm}
                    {material.consumption.thicknessMaxMm ? `–${material.consumption.thicknessMaxMm}` : ''} mm
                  </span>
                </div>
              )}
              {material.consumption.kgPerM2PerMm && (
                <div className="flex justify-between px-5 py-3 hover:bg-surface transition-colors">
                  <span className="text-sm text-dust">Consum per mm</span>
                  <span className="text-sm font-medium text-sand">{material.consumption.kgPerM2PerMm} kg/m²/mm</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Specs */}
      {material.specs && material.specs.length > 0 && (
        <div className="mt-6 rounded-xl border border-subtle overflow-hidden">
          <div className="px-5 py-3 border-b border-subtle bg-surface">
            <h2 className="text-xs font-bold tracking-widest uppercase text-dust">Specificații tehnice</h2>
          </div>
          <div className="flex flex-wrap gap-2 p-5">
            {material.specs.map((s) => (
              <span key={s} className="spec-tag">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link href={askUrl} className="btn btn--primary">
          🤖 Întreabă AI despre acest material
        </Link>
        <Link href={locale === "ro" ? "/materiale" : "/en/materiale"} className="btn btn--secondary">
          ← Înapoi la materiale
        </Link>
      </div>

    </div>
  )
}
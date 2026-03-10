'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { MaterialSpec } from '@/types'

interface Props {
  materials: MaterialSpec[]
  locale: string
  labels: {
    all: string
    askAI: string
  }
}

export function MaterialsGrid({ materials, locale, labels }: Props) {
  const [active, setActive] = useState<string | null>(null)

  // Build unique category list in order of first appearance
  const categories = Array.from(new Set(materials.map(m => m.category)))

  const filtered = active
    ? materials.filter(m => m.category === active)
    : materials

  return (
    <>
      {/* Category filter strip */}
      <div className="materials-strip mb-8">
        <button
          onClick={() => setActive(null)}
          className={`chip ${active === null ? 'chip--active' : ''}`}
        >
          {labels.all}
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`chip ${active === cat ? 'chip--active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Materials grid */}
      <div className="materials-grid">
        {filtered.map(m => (
          <Link
            key={m.id}
            href={`/${locale}/asistent?q=${encodeURIComponent(m.name)}`}
            className="material-card block"
          >
            <div className="material-card__category">{m.category}</div>
            <div className="material-card__name">{m.name}</div>
            <p className="material-card__description">{m.description}</p>
            {/* <div className="material-card__specs">
              {m.specs.map(s => <span key={s} className="spec-tag">{s}</span>)}
            </div> */}
            <span className="material-card__link">{labels.askAI}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
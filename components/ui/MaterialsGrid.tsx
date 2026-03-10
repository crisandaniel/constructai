'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { MaterialSpec } from '@/types'
import { useAnalytics } from '@/hooks/useAnalytics'

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
  const { track } = useAnalytics(locale)

  const categories = Array.from(new Set(materials.map(m => m.category.trim())))

  const filtered = active
    ? materials.filter(m => m.category.trim() === active.trim())
    : materials

  return (
    <>
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
            onClick={() => { setActive(cat); track('filter_click', { category: cat }) }}
            className={`chip ${active === cat ? 'chip--active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="materials-grid">
        {filtered.map(m => (
          <Link
            key={m.id}
            href={`/${locale}/asistent?q=${encodeURIComponent(m.name)}`}
            className="material-card block"
            onClick={() => track('material_click', { id: m.id, name: m.name })}
          >
            <div className="material-card__category">{m.category}</div>
            <div className="material-card__name">{m.name}</div>
            <p className="material-card__description">{m.description}</p>
            <span className="material-card__link">{labels.askAI}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
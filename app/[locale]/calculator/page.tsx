'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { MATERIALS_KB } from '@/lib/materials-data'

// ─── Types ────────────────────────────────────────────────────────────────────

type WorkType = 'tencuiala' | 'glet' | 'lavabil' | 'faianta' | 'gresie' | 'sapa'

interface WorkItem {
  id:           string
  type:         WorkType
  label:        string
  suprafata:    number
  grosime:      number  // mm, where applicable
  materialId:   string | null
  cantitate:    number  // kg calculated
  saci:         number
  pretSac:      number
  pretManopera: number  // RON/m²
}

// ─── Work type config ─────────────────────────────────────────────────────────

const WORK_TYPES: { type: WorkType; label: string; icon: string; defaultGrosime: number; categories: string[] }[] = [
  { type: 'tencuiala',  label: 'Tencuială',          icon: '🧱', defaultGrosime: 15, categories: ['Tencuieli'] },
  { type: 'glet',       label: 'Glet / Șpaclu',       icon: '🪣', defaultGrosime: 2,  categories: ['Finisaje'] },
  { type: 'lavabil',    label: 'Lavabil / Vopsea',    icon: '🎨', defaultGrosime: 0,  categories: ['Finisaje', 'Amorse Grunduri'] },
  { type: 'faianta',    label: 'Faianță',             icon: '⬜', defaultGrosime: 0,  categories: ['Adezivi'] },
  { type: 'gresie',     label: 'Gresie',              icon: '⬛', defaultGrosime: 0,  categories: ['Adezivi'] },
  { type: 'sapa',       label: 'Șapă autonivelantă',  icon: '〰️', defaultGrosime: 5,  categories: ['Sapa'] },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcCantitate(material: typeof MATERIALS_KB[0] | undefined, suprafata: number, grosime: number): number {
  if (!material?.consumption) return 0
  const c = material.consumption
  if (c.kgPerM2PerMm && grosime > 0) return suprafata * grosime * c.kgPerM2PerMm
  if (c.kgPerM2Standard)             return suprafata * c.kgPerM2Standard
  return 0
}

function calcSaci(cantitate: number, material: typeof MATERIALS_KB[0] | undefined): number {
  if (!material?.consumption?.packageSize) return 0
  return Math.ceil(cantitate / material.consumption.packageSize)
}

function uid() { return Math.random().toString(36).slice(2, 9) }

// ─── Component ────────────────────────────────────────────────────────────────

export default function CalculatorPage() {
  const locale = useLocale()
  const [items, setItems]         = useState<WorkItem[]>([])
  const [exporting, setExporting] = useState(false)
  const [clientName, setClientName] = useState('')
  const [projectName, setProjectName] = useState('')

  function addItem(type: WorkType) {
    const config   = WORK_TYPES.find(w => w.type === type)!
    const relevant = MATERIALS_KB.filter(m => config.categories.includes(m.category))
    const first    = relevant[0] ?? null
    const sup      = 20
    const gros     = config.defaultGrosime
    const cant     = calcCantitate(first ?? undefined, sup, gros)
    const saci     = calcSaci(cant, first ?? undefined)

    setItems(prev => [...prev, {
      id:           uid(),
      type,
      label:        config.label,
      suprafata:    sup,
      grosime:      gros,
      materialId:   first?.id ?? null,
      cantitate:    cant,
      saci,
      pretSac:      0,
      pretManopera: 0,
    }])
  }

  function updateItem(id: string, patch: Partial<WorkItem>) {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item
      const updated = { ...item, ...patch }
      const material = MATERIALS_KB.find(m => m.id === updated.materialId) ?? undefined
      const cant     = calcCantitate(material, updated.suprafata, updated.grosime)
      const saci     = calcSaci(cant, material)
      return { ...updated, cantitate: cant, saci }
    }))
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  // Totals
  const totalMateriale = items.reduce((s, i) => s + i.saci * i.pretSac, 0)
  const totalManopera  = items.reduce((s, i) => s + i.suprafata * i.pretManopera, 0)
  const total          = totalMateriale + totalManopera

  async function exportPDF() {
    setExporting(true)
    try {
      const res = await fetch('/api/deviz/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, clientName, projectName, totalMateriale, totalManopera, total }),
      })
      if (!res.ok) throw new Error('Export failed')
      const html = await res.text()
      // Open in new tab and trigger print dialog
      const win = window.open('', '_blank')
      if (win) {
        win.document.write(html)
        win.document.close()
        setTimeout(() => { win.print() }, 500)
      }
    } catch (e) {
      alert('Eroare la export PDF')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="max-w-app mx-auto px-4 md:px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-syne font-extrabold text-2xl md:text-3xl mb-2">Generator Deviz</h1>
        <p className="text-dust text-sm">Adaugă lucrări, configurează materiale și exportă devizul în PDF.</p>
      </div>

      {/* Client / Project info */}
      <div className="grid md:grid-cols-2 gap-4 mb-8 rounded-xl border border-subtle bg-card p-5">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-dust font-medium uppercase tracking-wider">Client</label>
          <input
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="Nume client..."
            className="calc__input"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-dust font-medium uppercase tracking-wider">Proiect / Adresă</label>
          <input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            placeholder="ex: Apartament 3 camere, Str. Florilor 12"
            className="calc__input"
          />
        </div>
      </div>

      {/* Add work buttons */}
      <div className="mb-6">
        <p className="text-xs text-dust uppercase tracking-widest font-bold mb-3">Adaugă lucrare</p>
        <div className="flex flex-wrap gap-2">
          {WORK_TYPES.map(w => (
            <button
              key={w.type}
              onClick={() => addItem(w.type)}
              className="flex items-center gap-2 bg-card border border-subtle text-sand text-sm px-4 py-2 rounded-xl hover:border-gold hover:text-gold transition"
            >
              <span>{w.icon}</span>
              <span>{w.label}</span>
              <span className="text-gold font-bold">+</span>
            </button>
          ))}
        </div>
      </div>

      {/* Work items */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-subtle p-12 text-center mb-8">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-dust">Nicio lucrare adăugată. Apasă un buton de mai sus.</p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {items.map((item, idx) => {
            const config   = WORK_TYPES.find(w => w.type === item.type)!
            const relevant = MATERIALS_KB.filter(m => config.categories.includes(m.category))
            const material = MATERIALS_KB.find(m => m.id === item.materialId)

            return (
              <div key={item.id} className="rounded-xl border border-subtle bg-card overflow-hidden">
                {/* Item header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-subtle bg-surface">
                  <div className="flex items-center gap-2">
                    <span>{config.icon}</span>
                    <span className="font-syne font-bold text-sm">{item.label}</span>
                    <span className="text-xs text-dust">#{idx + 1}</span>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-dust hover:text-red-400 transition text-sm">× Șterge</button>
                </div>

                <div className="p-5 grid md:grid-cols-2 gap-6">
                  {/* Left: work config */}
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-dust">Material</label>
                      <select
                        value={item.materialId ?? ''}
                        onChange={e => updateItem(item.id, { materialId: e.target.value || null })}
                        className="calc__select"
                      >
                        <option value="">— Selectează material —</option>
                        {relevant.map(m => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-dust">Suprafață (m²)</label>
                        <input
                          type="number"
                          min={0}
                          value={item.suprafata}
                          onChange={e => updateItem(item.id, { suprafata: parseFloat(e.target.value) || 0 })}
                          className="calc__input"
                        />
                      </div>
                      {config.defaultGrosime > 0 && (
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-dust">Grosime (mm)</label>
                          <input
                            type="number"
                            min={0}
                            value={item.grosime}
                            onChange={e => updateItem(item.id, { grosime: parseFloat(e.target.value) || 0 })}
                            className="calc__input"
                          />
                        </div>
                      )}
                    </div>

                    {material?.consumption && (
                      <p className="text-xs text-dust">
                        {material.consumption.kgPerM2Standard && `Consum: ${material.consumption.kgPerM2Standard} kg/m²`}
                        {material.consumption.kgPerM2PerMm && ` · ${material.consumption.kgPerM2PerMm} kg/m²/mm`}
                        {material.consumption.packageDescription && ` · ${material.consumption.packageDescription}`}
                      </p>
                    )}
                  </div>

                  {/* Right: pricing */}
                  <div className="space-y-3">
                    <div className="rounded-lg bg-surface border border-subtle px-4 py-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-dust">Cantitate calculată</span>
                        <span className="font-bold text-sand">{item.cantitate.toFixed(1)} kg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dust">Număr saci</span>
                        <span className="font-bold text-gold">{item.saci} {material?.consumption?.packageDescription || 'saci'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-dust">Preț/sac (RON)</label>
                        <input
                          type="number"
                          min={0}
                          value={item.pretSac || ''}
                          placeholder="0"
                          onChange={e => updateItem(item.id, { pretSac: parseFloat(e.target.value) || 0 })}
                          className="calc__input"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-dust">Manoperă/m² (RON)</label>
                        <input
                          type="number"
                          min={0}
                          value={item.pretManopera || ''}
                          placeholder="0"
                          onChange={e => updateItem(item.id, { pretManopera: parseFloat(e.target.value) || 0 })}
                          className="calc__input"
                        />
                      </div>
                    </div>

                    {(item.pretSac > 0 || item.pretManopera > 0) && (
                      <div className="rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 space-y-1">
                        {item.pretSac > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-dust">Materiale</span>
                            <span className="text-sand">{(item.saci * item.pretSac).toFixed(0)} RON</span>
                          </div>
                        )}
                        {item.pretManopera > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-dust">Manoperă</span>
                            <span className="text-sand">{(item.suprafata * item.pretManopera).toFixed(0)} RON</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-bold border-t border-gold/20 pt-1 mt-1">
                          <span className="text-gold">Total lucrare</span>
                          <span className="text-gold">{(item.saci * item.pretSac + item.suprafata * item.pretManopera).toFixed(0)} RON</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Total + Export */}
      {items.length > 0 && (
        <div className="rounded-xl border border-gold/40 bg-card p-6">
          <h2 className="font-syne font-bold text-sm uppercase tracking-widest text-dust mb-4">Sumar Deviz</h2>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-dust">Total materiale</span>
              <span className="text-sand">{totalMateriale.toFixed(0)} RON</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dust">Total manoperă</span>
              <span className="text-sand">{totalManopera.toFixed(0)} RON</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-subtle pt-3 mt-3">
              <span className="text-gold">TOTAL DEVIZ</span>
              <span className="text-gold">{total.toFixed(0)} RON</span>
            </div>
          </div>

          <button
            onClick={exportPDF}
            disabled={exporting || total === 0}
            className="w-full bg-gold text-concrete font-syne font-bold py-3 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {exporting ? '⏳ Se generează...' : '📄 Exportă Deviz PDF'}
          </button>
          {total === 0 && (
            <p className="text-xs text-dust text-center mt-2">Adaugă prețuri pentru a putea exporta.</p>
          )}
        </div>
      )}
    </div>
  )
}
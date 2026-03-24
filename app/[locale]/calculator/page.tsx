'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { useAnalytics } from '@/hooks/useAnalytics'

// ---------------------------------------------------------------------------
// Tipuri
// ---------------------------------------------------------------------------

type WorkType =
  | 'tencuiala' | 'glet' | 'lavabil' | 'faianta' | 'gresie' | 'sapa'
  | 'hidroizolatie' | 'placa_beton' | 'zidarie' | 'acoperis'
  | 'electric' | 'sanitare' | 'termice' | 'izolatie_ext' | 'rigips' | 'tamplarie' | 'custom'

interface SubMaterial {
  id:         string
  name:       string
  cantitate:  number
  unitate:    string   // 'buc', 'kg', 'saci', 'mp', 'ml', 'l', 'set'
  pretUnitar: number
  custom:     boolean  // true = adăugat manual de meșter
}

interface WorkItem {
  id:           string
  type:         WorkType
  label:        string
  suprafata:    number
  materials:    SubMaterial[]
  pretManopera: number          // RON/m² — un singur câmp total pe lucrare
}

// ---------------------------------------------------------------------------
// Configurare tipuri de lucrare + materiale predefinite
// ---------------------------------------------------------------------------

interface WorkConfig {
  type:             WorkType
  label:            string
  icon:             string
  defaultMaterials: Omit<SubMaterial, 'id'>[]
}

const WORK_CONFIGS: WorkConfig[] = [
  {
    type:  'tencuiala',
    label: 'Tencuială',
    icon:  '🧱',
    defaultMaterials: [
      { name: 'Mortar tencuială',    cantitate: 0, unitate: 'saci',  pretUnitar: 0, custom: false },
      { name: 'Plasă armare',        cantitate: 0, unitate: 'mp',    pretUnitar: 0, custom: false },
      { name: 'Profil colț / drept', cantitate: 0, unitate: 'buc',   pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'glet',
    label: 'Glet / Șpaclu',
    icon:  '🪣',
    defaultMaterials: [
      { name: 'Glet finisaj',        cantitate: 0, unitate: 'saci',  pretUnitar: 0, custom: false },
      { name: 'Amorsă grund',        cantitate: 0, unitate: 'l',     pretUnitar: 0, custom: false },
      { name: 'Hârtie șmirghel',     cantitate: 0, unitate: 'buc',   pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'lavabil',
    label: 'Lavabil / Vopsea',
    icon:  '🎨',
    defaultMaterials: [
      { name: 'Vopsea lavabilă',     cantitate: 0, unitate: 'l',     pretUnitar: 0, custom: false },
      { name: 'Grund / Amorsă',      cantitate: 0, unitate: 'l',     pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'faianta',
    label: 'Faianță',
    icon:  '⬜',
    defaultMaterials: [
      { name: 'Plăci ceramice',      cantitate: 0, unitate: 'mp',    pretUnitar: 0, custom: false },
      { name: 'Adeziv flexibil',     cantitate: 0, unitate: 'saci',  pretUnitar: 0, custom: false },
      { name: 'Distanțiere',        cantitate: 0, unitate: 'set',   pretUnitar: 0, custom: false },
      { name: 'Kit rosturi',         cantitate: 0, unitate: 'kg',    pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'gresie',
    label: 'Gresie',
    icon:  '⬛',
    defaultMaterials: [
      { name: 'Gresie porțelanată',  cantitate: 0, unitate: 'mp',    pretUnitar: 0, custom: false },
      { name: 'Adeziv pentru gresie',cantitate: 0, unitate: 'saci',  pretUnitar: 0, custom: false },
      { name: 'Distanțiere',        cantitate: 0, unitate: 'set',   pretUnitar: 0, custom: false },
      { name: 'Kit rosturi',         cantitate: 0, unitate: 'kg',    pretUnitar: 0, custom: false },
      { name: 'Profile de trecere',  cantitate: 0, unitate: 'ml',    pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'sapa',
    label: 'Șapă autonivelantă',
    icon:  '〰️',
    defaultMaterials: [
      { name: 'Șapă autonivelantă',  cantitate: 0, unitate: 'saci',  pretUnitar: 0, custom: false },
      { name: 'Amorsa șapă',         cantitate: 0, unitate: 'l',     pretUnitar: 0, custom: false },
      { name: 'Bandă perimetrală',   cantitate: 0, unitate: 'ml',    pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'hidroizolatie',
    label: 'Hidroizolație',
    icon:  '💧',
    defaultMaterials: [
      { name: 'Membrană hidroizolantă',   cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
      { name: 'Amorsă bituminoasă',       cantitate: 0, unitate: 'l',    pretUnitar: 0, custom: false },
      { name: 'Bandă de etanșare',        cantitate: 0, unitate: 'ml',   pretUnitar: 0, custom: false },
      { name: 'Mortar de nivelare',       cantitate: 0, unitate: 'saci', pretUnitar: 0, custom: false },
      { name: 'Geotextil',               cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'placa_beton',
    label: 'Turnare placă beton',
    icon:  '🏗️',
    defaultMaterials: [
      { name: 'Beton (mc)',               cantitate: 0, unitate: 'mc',   pretUnitar: 0, custom: false },
      { name: 'Armătură oțel',           cantitate: 0, unitate: 'kg',   pretUnitar: 0, custom: false },
      { name: 'Plasă sudată',            cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
      { name: 'Cofraje',                 cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
      { name: 'Distanțieri armatură',   cantitate: 0, unitate: 'buc',  pretUnitar: 0, custom: false },
      { name: 'Aditiv impermeabilizare', cantitate: 0, unitate: 'l',    pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'zidarie',
    label: 'Zidărie',
    icon:  '🏠',
    defaultMaterials: [
      { name: 'BCA / Cărămidă',          cantitate: 0, unitate: 'mc',   pretUnitar: 0, custom: false },
      { name: 'Mortar zidărie',          cantitate: 0, unitate: 'saci', pretUnitar: 0, custom: false },
      { name: 'Buiandrugi',              cantitate: 0, unitate: 'buc',  pretUnitar: 0, custom: false },
      { name: 'Plasă armare rosturi',    cantitate: 0, unitate: 'ml',   pretUnitar: 0, custom: false },
      { name: 'Adeziv BCA',              cantitate: 0, unitate: 'saci', pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'acoperis',
    label: 'Acoperiș',
    icon:  '🏚️',
    defaultMaterials: [
      { name: 'Țiglă / Tablă',           cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
      { name: 'Șipcă astereală',         cantitate: 0, unitate: 'ml',   pretUnitar: 0, custom: false },
      { name: 'Membrana anticondens',    cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
      { name: 'Vată minerală termoizol.',cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
      { name: 'Coamă / Jgheab',         cantitate: 0, unitate: 'ml',   pretUnitar: 0, custom: false },
      { name: 'Cuie / Șuruburi',        cantitate: 0, unitate: 'kg',   pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'electric',
    label: 'Instalații electrice',
    icon:  '⚡',
    defaultMaterials: [
      { name: 'Cablu electric (NYM/CYY)', cantitate: 0, unitate: 'ml',  pretUnitar: 0, custom: false },
      { name: 'Tuburi protecție (PVC)',   cantitate: 0, unitate: 'ml',  pretUnitar: 0, custom: false },
      { name: 'Doze de derivație',        cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Prize / Întrerupătoare',   cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Tablou electric / sigur.', cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Dibluri / Accesorii fix.', cantitate: 0, unitate: 'set', pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'sanitare',
    label: 'Instalații sanitare',
    icon:  '🚿',
    defaultMaterials: [
      { name: 'Țeavă PPR / multicurent',  cantitate: 0, unitate: 'ml',  pretUnitar: 0, custom: false },
      { name: 'Fitinguri (coturi, muf.)', cantitate: 0, unitate: 'set', pretUnitar: 0, custom: false },
      { name: 'Baterie / Robinet',        cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Vas WC + rezervor',        cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Lavoar / Cadă / Cabină',   cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Sifon / Canalizare PVC',   cantitate: 0, unitate: 'ml',  pretUnitar: 0, custom: false },
      { name: 'Izolație termică țeavă',   cantitate: 0, unitate: 'ml',  pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'termice',
    label: 'Instalații termice',
    icon:  '🔥',
    defaultMaterials: [
      { name: 'Centrală termică',         cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Calorifer / Panou rad.',   cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Țeavă cupru / multicur.',  cantitate: 0, unitate: 'ml',  pretUnitar: 0, custom: false },
      { name: 'Colectoare distribuție',   cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Termostat / Cap term.',    cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Izolație termică țeavă',   cantitate: 0, unitate: 'ml',  pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'izolatie_ext',
    label: 'Izolație exterioară (polistiren)',
    icon:  '🧊',
    defaultMaterials: [
      { name: 'Polistiren expandat / XPS',cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
      { name: 'Adeziv polistiren',        cantitate: 0, unitate: 'saci', pretUnitar: 0, custom: false },
      { name: 'Dibluri fixare',           cantitate: 0, unitate: 'buc',  pretUnitar: 0, custom: false },
      { name: 'Plasă fibră de sticlă',    cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
      { name: 'Tinci / Grunduit exterior',cantitate: 0, unitate: 'saci', pretUnitar: 0, custom: false },
      { name: 'Tencuială decorativă',     cantitate: 0, unitate: 'saci', pretUnitar: 0, custom: false },
      { name: 'Profile colț / soclu',     cantitate: 0, unitate: 'ml',   pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'rigips',
    label: 'Rigips / Placare',
    icon:  '📋',
    defaultMaterials: [
      { name: 'Placă gipscarton',         cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
      { name: 'Profil metalic (C/U)',     cantitate: 0, unitate: 'ml',   pretUnitar: 0, custom: false },
      { name: 'Șuruburi autoperf.',       cantitate: 0, unitate: 'buc',  pretUnitar: 0, custom: false },
      { name: 'Bandă armare rosturi',     cantitate: 0, unitate: 'ml',   pretUnitar: 0, custom: false },
      { name: 'Chit îmbinare rosturi',    cantitate: 0, unitate: 'saci', pretUnitar: 0, custom: false },
      { name: 'Vată minerală (umplut.)',  cantitate: 0, unitate: 'mp',   pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'tamplarie',
    label: 'Tâmplărie / Uși / Ferestre',
    icon:  '🚪',
    defaultMaterials: [
      { name: 'Ferestre PVC / Aluminiu',  cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Ușă interior',             cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Ușă exterior / intrare',   cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Glaf interior / exterior', cantitate: 0, unitate: 'ml',  pretUnitar: 0, custom: false },
      { name: 'Spumă poliuretanică',      cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
      { name: 'Chit / Silicon etanș.',    cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: false },
    ],
  },
  {
    type:  'custom',
    label: 'Lucrare personalizată',
    icon:  '✏️',
    defaultMaterials: [],
  },
]

const UNITATI = ['buc', 'kg', 'saci', 'mp', 'ml', 'l', 'set', 'ml', 'tub', 'pereche']

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function uid() { return Math.random().toString(36).slice(2, 9) }

function makeMaterials(config: WorkConfig): SubMaterial[] {
  return config.defaultMaterials.map(m => ({ ...m, id: uid() }))
}

// ---------------------------------------------------------------------------
// Componentă principală
// ---------------------------------------------------------------------------

export default function CalculatorPage() {
  const locale               = useLocale()
  const { track, sessionId } = useAnalytics(locale)

  const [items, setItems]             = useState<WorkItem[]>([])
  const [clientName, setClientName]   = useState('')
  const [projectName, setProjectName] = useState('')
  const [exporting, setExporting]     = useState(false)
  const [savedId, setSavedId]         = useState<string | null>(null)
  const [trackedOpen, setTrackedOpen] = useState(false)

  if (!trackedOpen && typeof window !== 'undefined') {
    setTrackedOpen(true)
    track('deviz_page_open', { locale })
  }

  // -------------------------------------------------------------------------
  // CRUD lucrări
  // -------------------------------------------------------------------------

  function addItem(type: WorkType) {
    const config = WORK_CONFIGS.find(w => w.type === type)!
    setItems(prev => [...prev, {
      id:           uid(),
      type,
      label:        config.label,
      suprafata:    20,
      materials:    makeMaterials(config),
      pretManopera: 0,
    }])
    setSavedId(null)
    track('deviz_work_added', { workType: type })
  }

  function removeItem(id: string) {
    const item = items.find(i => i.id === id)
    setItems(prev => prev.filter(i => i.id !== id))
    setSavedId(null)
    track('deviz_work_removed', { workType: item?.type ?? 'unknown' })
  }

  function updateItemField(id: string, patch: Partial<Omit<WorkItem, 'materials'>>) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i))
    setSavedId(null)
  }

  // -------------------------------------------------------------------------
  // CRUD sub-materiale
  // -------------------------------------------------------------------------

  function updateMaterial(itemId: string, matId: string, patch: Partial<SubMaterial>) {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item
      return { ...item, materials: item.materials.map(m => m.id === matId ? { ...m, ...patch } : m) }
    }))
    setSavedId(null)
  }

  function removeMaterial(itemId: string, matId: string) {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item
      return { ...item, materials: item.materials.filter(m => m.id !== matId) }
    }))
    setSavedId(null)
  }

  function addCustomMaterial(itemId: string) {
    const newMat: SubMaterial = { id: uid(), name: '', cantitate: 0, unitate: 'buc', pretUnitar: 0, custom: true }
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item
      return { ...item, materials: [...item.materials, newMat] }
    }))
    setSavedId(null)
  }

  // -------------------------------------------------------------------------
  // Totaluri
  // -------------------------------------------------------------------------

  function totalMaterialeItem(item: WorkItem) {
    return item.materials.reduce((s, m) => s + m.cantitate * m.pretUnitar, 0)
  }

  function totalManoperaItem(item: WorkItem) {
    return item.suprafata * item.pretManopera
  }

  function totalItem(item: WorkItem) {
    return totalMaterialeItem(item) + totalManoperaItem(item)
  }

  const totalMateriale = items.reduce((s, i) => s + totalMaterialeItem(i), 0)
  const totalManopera  = items.reduce((s, i) => s + totalManoperaItem(i), 0)
  const total          = totalMateriale + totalManopera

  // -------------------------------------------------------------------------
  // Salvare & Export
  // -------------------------------------------------------------------------

  async function saveDeviz(): Promise<string | null> {
    try {
      const res  = await fetch('/api/deviz/save', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ sessionId, clientName, projectName, locale, items, totalMateriale, totalManopera, total }),
      })
      const data = await res.json()
      if (data.id) {
        setSavedId(data.id)
        track('deviz_saved', { devizId: data.id, total, itemCount: items.length, totalMateriale, totalManopera })
        return data.id
      }
      return null
    } catch { return null }
  }

  async function exportPDF() {
    setExporting(true)
    try {
      await saveDeviz()
      track('deviz_exported', { total, itemCount: items.length, hasClient: !!clientName, hasProject: !!projectName })
      const res  = await fetch('/api/deviz/export', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items, clientName, projectName, totalMateriale, totalManopera, total }),
      })
      if (!res.ok) throw new Error()
      const html = await res.text()
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url
      a.download = `deviz-${new Date().toISOString().slice(0, 10)}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    } catch { alert('Eroare la export') } finally { setExporting(false) }
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="max-w-app mx-auto px-4 md:px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-syne font-extrabold text-2xl md:text-3xl mb-2">Generator Deviz</h1>
        <p className="text-dust text-sm">Adaugă lucrări, configurează materiale și exportă devizul.</p>
      </div>

      {/* Client / Proiect */}
      <div className="grid md:grid-cols-2 gap-4 mb-8 rounded-xl border border-subtle bg-card p-5">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-dust font-medium uppercase tracking-wider">Client</label>
          <input
            value={clientName}
            onChange={e => { setClientName(e.target.value); setSavedId(null) }}
            placeholder="Nume client..."
            className="calc__input"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-dust font-medium uppercase tracking-wider">Proiect / Adresă</label>
          <input
            value={projectName}
            onChange={e => { setProjectName(e.target.value); setSavedId(null) }}
            placeholder="ex: Apartament 3 camere, Str. Florilor 12"
            className="calc__input"
          />
        </div>
      </div>

      {/* Butoane adăugare lucrare */}
      <div className="mb-6">
        <p className="text-xs text-dust uppercase tracking-widest font-bold mb-3">Adaugă lucrare</p>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
          {WORK_CONFIGS.map(w => (
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

      {/* Lista lucrări */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-subtle p-12 text-center mb-8">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-dust">Nicio lucrare adăugată. Apasă un buton de mai sus.</p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {items.map((item, idx) => {
            const config      = WORK_CONFIGS.find(w => w.type === item.type)!
            const totMat      = totalMaterialeItem(item)
            const totMan      = totalManoperaItem(item)
            const totItem     = totMat + totMan

            return (
              <div key={item.id} className="rounded-xl border border-subtle bg-card overflow-hidden">

                {/* Header lucrare */}
                <div className="flex items-center justify-between px-3 py-3 md:px-5 border-b border-subtle bg-surface">
                  <div className="flex items-center gap-2">
                    <span>{config.icon}</span>
                    {item.type === 'custom' ? (
                      <input
                        type="text"
                        value={item.label}
                        onChange={e => updateItemField(item.id, { label: e.target.value })}
                        placeholder="Nume lucrare..."
                        className="calc__input font-syne font-bold text-sm w-36 md:w-48"
                        onClick={e => e.stopPropagation()}
                      />
                    ) : (
                      <span className="font-syne font-bold text-sm">{item.label}</span>
                    )}
                    <span className="text-xs text-dust">#{idx + 1}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {totItem > 0 && (
                      <span className="text-xs text-gold font-mono font-bold">{totItem.toFixed(0)} RON</span>
                    )}
                    <button onClick={() => removeItem(item.id)} className="text-dust hover:text-red-400 transition text-sm">
                      × Șterge
                    </button>
                  </div>
                </div>

                <div className="p-3 md:p-5 space-y-6">

                  {/* Suprafață */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1 w-40">
                      <label className="text-xs text-dust">Suprafață totală (m²)</label>
                      <input
                        type="number"
                        min={0}
                        value={item.suprafata}
                        onChange={e => updateItemField(item.id, { suprafata: parseFloat(e.target.value) || 0 })}
                        className="calc__input"
                      />
                    </div>
                    <p className="hidden md:block text-xs text-dust/60 pt-4">
                      Suprafața se aplică pentru calculul manoperei. Cantitățile de materiale le introduci manual.
                    </p>
                  </div>

                  {/* Materiale */}
                  <div>
                    <p className="text-xs text-dust font-medium uppercase tracking-widest mb-2">Materiale</p>

                    {/* Desktop: tabel */}
                    <div className="hidden md:block rounded-lg border border-subtle overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-surface text-xs text-dust border-b border-subtle">
                            <th className="text-left px-3 py-2 font-medium w-1/3">Material</th>
                            <th className="text-right px-3 py-2 font-medium w-24">Cantitate</th>
                            <th className="text-left px-3 py-2 font-medium w-20">U.M.</th>
                            <th className="text-right px-3 py-2 font-medium w-28">Preț/unitate</th>
                            <th className="text-right px-3 py-2 font-medium w-24">Total</th>
                            <th className="w-8"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.materials.map((mat) => (
                            <tr key={mat.id} className={`border-b border-subtle last:border-0 ${mat.custom ? 'bg-gold/5' : ''}`}>
                              <td className="px-3 py-2">
                                {mat.custom ? (
                                  <input type="text" value={mat.name} onChange={e => updateMaterial(item.id, mat.id, { name: e.target.value })} placeholder="Nume material..." className="calc__input text-xs w-full" />
                                ) : (
                                  <span className="text-sand">{mat.name}</span>
                                )}
                              </td>
                              <td className="px-3 py-2">
                                <input type="number" min={0} step={0.01} value={mat.cantitate || ''} placeholder="0" onChange={e => updateMaterial(item.id, mat.id, { cantitate: parseFloat(e.target.value) || 0 })} className="calc__input text-right text-xs w-full" />
                              </td>
                              <td className="px-3 py-2">
                                <select value={mat.unitate} onChange={e => updateMaterial(item.id, mat.id, { unitate: e.target.value })} className="calc__select text-xs w-full">
                                  {UNITATI.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                              </td>
                              <td className="px-3 py-2">
                                <input type="number" min={0} step={0.01} value={mat.pretUnitar || ''} placeholder="0 RON" onChange={e => updateMaterial(item.id, mat.id, { pretUnitar: parseFloat(e.target.value) || 0 })} className="calc__input text-right text-xs w-full" />
                              </td>
                              <td className="px-3 py-2 text-right">
                                {mat.cantitate > 0 && mat.pretUnitar > 0 ? (
                                  <span className="text-sand font-mono text-xs">{(mat.cantitate * mat.pretUnitar).toFixed(0)} RON</span>
                                ) : (
                                  <span className="text-dust/30 text-xs">—</span>
                                )}
                              </td>
                              <td className="px-2 py-2">
                                <button onClick={() => removeMaterial(item.id, mat.id)} className="text-dust/40 hover:text-red-400 transition text-xs leading-none" title="Șterge material">×</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobil: carduri stacked */}
                    <div className="md:hidden space-y-2">
                      {item.materials.map((mat) => (
                        <div key={mat.id} className={`rounded-lg border border-subtle p-3 space-y-2 ${mat.custom ? 'bg-gold/5' : 'bg-surface'}`}>
                          <div className="flex items-center justify-between gap-2">
                            {mat.custom ? (
                              <input type="text" value={mat.name} onChange={e => updateMaterial(item.id, mat.id, { name: e.target.value })} placeholder="Nume material..." className="calc__input text-xs flex-1" />
                            ) : (
                              <span className="text-sand text-sm font-medium flex-1">{mat.name}</span>
                            )}
                            <button onClick={() => removeMaterial(item.id, mat.id)} className="text-dust/40 hover:text-red-400 transition text-base leading-none px-1" title="Șterge">×</button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col gap-1">
                              <label className="text-xs text-dust">Cantitate</label>
                              <input type="number" min={0} step={0.01} value={mat.cantitate || ''} placeholder="0" onChange={e => updateMaterial(item.id, mat.id, { cantitate: parseFloat(e.target.value) || 0 })} className="calc__input text-xs text-right" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs text-dust">U.M.</label>
                              <select value={mat.unitate} onChange={e => updateMaterial(item.id, mat.id, { unitate: e.target.value })} className="calc__select text-xs">
                                {UNITATI.map(u => <option key={u} value={u}>{u}</option>)}
                              </select>
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-xs text-dust">Preț/u.</label>
                              <input type="number" min={0} step={0.01} value={mat.pretUnitar || ''} placeholder="0" onChange={e => updateMaterial(item.id, mat.id, { pretUnitar: parseFloat(e.target.value) || 0 })} className="calc__input text-xs text-right" />
                            </div>
                          </div>
                          {mat.cantitate > 0 && mat.pretUnitar > 0 && (
                            <div className="flex justify-end">
                              <span className="text-xs font-mono text-gold font-bold">{(mat.cantitate * mat.pretUnitar).toFixed(0)} RON</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Buton adăugare material custom */}
                    <button
                      onClick={() => addCustomMaterial(item.id)}
                      className="mt-2 text-xs text-dust hover:text-gold transition flex items-center gap-1"
                    >
                      <span className="text-gold font-bold text-base leading-none">+</span> Adaugă material
                    </button>
                  </div>

                  {/* Manoperă — câmp total pe lucrare */}
                  <div className="rounded-lg border border-subtle bg-surface p-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
                      <div className="flex flex-col gap-1 w-full md:w-40">
                        <label className="text-xs text-dust font-medium">Manoperă (RON/m²)</label>
                        <input
                          type="number"
                          min={0}
                          step={1}
                          value={item.pretManopera || ''}
                          placeholder="RON/m²"
                          onChange={e => updateItemField(item.id, { pretManopera: parseFloat(e.target.value) || 0 })}
                          onBlur={e => { if (e.target.value) track('deviz_manopera_entered', { workType: item.type, pretManopera: parseFloat(e.target.value) }) }}
                          className="calc__input"
                        />
                        <span className="text-xs text-dust/50">pentru {item.suprafata} m²</span>
                      </div>

                      {/* Sumar item */}
                      {(totMat > 0 || totMan > 0) && (
                        <div className="rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 space-y-1 w-full md:min-w-[180px]">
                          {totMat > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-dust">Materiale</span>
                              <span className="text-sand">{totMat.toFixed(0)} RON</span>
                            </div>
                          )}
                          {totMan > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-dust">Manoperă</span>
                              <span className="text-sand">{totMan.toFixed(0)} RON</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm font-bold border-t border-gold/20 pt-1 mt-1">
                            <span className="text-gold">Total lucrare</span>
                            <span className="text-gold">{totItem.toFixed(0)} RON</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Sumar + Export */}
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
          <div className="flex flex-col gap-3">
            <button
              onClick={exportPDF}
              disabled={exporting || total === 0}
              className="w-full bg-gold text-concrete font-syne font-bold py-3 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {exporting ? '⏳ Se generează...' : '📄 Exportă & Salvează Deviz'}
            </button>
            {total === 0 && <p className="text-xs text-dust text-center">Adaugă cantități și prețuri pentru a putea exporta.</p>}
            {savedId  && <p className="text-xs text-center text-moss">✓ Deviz salvat în baza de date</p>}
          </div>
        </div>
      )}

    </div>
  )
}
'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useCalcStore } from '@/lib/store'
import { calculate } from '@/lib/calculator'
import type { WorkType } from '@/types'

const WORK_ICONS: Record<WorkType, string> = {
  zidarie:       '🧱',
  sapa:          '🪨',
  tencuiala:     '🎨',
  rigips:        '🏠',
  faiance:       '🔷',
  termoizolatie: '🛖',
}

const HIDE_INALTIME: WorkType[] = ['sapa', 'faiance', 'termoizolatie']

interface Props {
  onSendToChat?: (text: string) => void
}

export function CalcSidebar({ onSendToChat }: Props) {
  const t = useTranslations('calculator')
  const { selectedWork, suprafata, grosime, inaltime, adaos, result, setWork, setField, setResult } = useCalcStore()
  const [error, setError] = useState('')

  const workTypes = Object.keys(WORK_ICONS) as WorkType[]

  // Read options from translation file so they're automatically translated
  const grosimeOptions = (t.raw(`grosimeOptions.${selectedWork}`) as { value: string; label: string }[])

  function handleWorkChange(w: WorkType) {
    setWork(w)
    const opts = t.raw(`grosimeOptions.${w}`) as { value: string; label: string }[]
    setField('grosime', opts[1]?.value || opts[0].value)
  }

  function handleCalculate() {
    setError('')
    const sup = parseFloat(suprafata)
    if (!sup || sup <= 0) { setError(t('errorSurface')); return }

    setResult(calculate({
      workType: selectedWork,
      suprafata: sup,
      grosime: parseFloat(grosime),
      inaltime: parseFloat(inaltime),
      adaos: parseFloat(adaos),
    }))
  }

  function handleSendToChat() {
    if (!result || !onSendToChat) return
    const lines = result.materials.map((m) => `${m.material}: **${m.quantity} ${m.unit}**`)
    onSendToChat(`${result.title} (${result.inputs.suprafata} m² +${result.totalAdaos}%):\n${lines.join('\n')}\n\nPoți verifica și da sfaturi suplimentare?`)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Calculator panel */}
      <div className="calc__panel">
        <div className="calc__header">
          <span className="calc__title">⚡ {t('title')}</span>
        </div>
        <div className="calc__body">
          <p className="calc__type-label">{t('selectWork')}</p>

          {/* Work type grid */}
          <div className="calc__type-grid">
            {workTypes.map((w) => (
              <button
                key={w}
                onClick={() => handleWorkChange(w)}
                className={`calc__type-btn ${selectedWork === w ? 'calc__type-btn--active' : ''}`}
              >
                <span className="calc__type-icon">{WORK_ICONS[w]}</span>
                {t(`workTypes.${w}`)}
              </button>
            ))}
          </div>

          {/* Form fields */}
          <div className="calc__fields">
            <div className="calc__field">
              <label>{t('surface')}</label>
              <input
                type="number"
                value={suprafata}
                onChange={(e) => setField('suprafata', e.target.value)}
                placeholder={t('surfacePlaceholder')}
                className="calc__input"
              />
            </div>

            {!HIDE_INALTIME.includes(selectedWork) && (
              <div className="calc__field">
                <label>{t('height')}</label>
                <input
                  type="number"
                  value={inaltime}
                  onChange={(e) => setField('inaltime', e.target.value)}
                  step="0.1"
                  className="calc__input"
                />
              </div>
            )}

            <div className="calc__field">
              <label>{t(`grosimeLabels.${selectedWork}`)}</label>
              <select
                value={grosime}
                onChange={(e) => setField('grosime', e.target.value)}
                className="calc__select"
              >
                {grosimeOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="calc__field">
              <label>{t('waste')}</label>
              <select value={adaos} onChange={(e) => setField('adaos', e.target.value)} className="calc__select">
                <option value="5">{t('waste5')}</option>
                <option value="10">{t('waste10')}</option>
                <option value="15">{t('waste15')}</option>
              </select>
            </div>
          </div>

          {error && <p className="calc__error">{error}</p>}

          <button onClick={handleCalculate} className="calc__submit">{t('calculate')}</button>
        </div>
      </div>

      {/* Results panel */}
      {result && (
        <div className="calc__results">
          <div className="calc__results-header">
            <span className="calc__title">📦 {t('results')}</span>
            <span className="calc__results-meta">
              {t('resultsMeta', { surface: result.inputs.suprafata, adaos: result.totalAdaos })}
            </span>
          </div>
          {result.materials.map((m, i) => (
            <div key={i} className="calc__result-item">
              <div>
                <div className="calc__result-material">{m.material}</div>
                {m.note && <div className="calc__result-note">{m.note}</div>}
              </div>
              <span className="calc__result-qty">
                {m.quantity}<span className="calc__result-unit">{m.unit}</span>
              </span>
            </div>
          ))}
          {onSendToChat && (
            <div className="p-3 border-t border-subtle">
              <button onClick={handleSendToChat} className="calc__send-to-chat">
                {t('sendToChat')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

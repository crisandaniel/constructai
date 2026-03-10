// ─── Chat ─────────────────────────────────────────────────────────────────────
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// ─── Calculator ───────────────────────────────────────────────────────────────
export type WorkType =
  | 'zidarie'
  | 'sapa'
  | 'tencuiala'
  | 'rigips'
  | 'faiance'
  | 'termoizolatie'

export interface CalcInput {
  workType: WorkType
  suprafata: number
  grosime: number
  inaltime?: number
  adaos: number
}

export interface MaterialResult {
  material: string
  quantity: number
  unit: string
  note?: string
}

export interface CalcResult {
  title: string
  inputs: CalcInput
  materials: MaterialResult[]
  totalAdaos: number
  generatedAt: Date
}

// ─── Materials knowledge base ─────────────────────────────────────────────────
export interface MaterialSpec {
  id: string
  category: string
  name: string
  description: string
  specs: string[]
  keyProperties: Record<string, string>
  consumption: any
}

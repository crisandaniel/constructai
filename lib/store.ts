import { create } from 'zustand'
import type { Message, CalcResult, WorkType } from '@/types'

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

// ─── Chat store ───────────────────────────────────────────────────────────────
interface ChatStore {
  messages: Message[]
  isLoading: boolean
  addMessage: (role: Message['role'], content: string) => void
  setLoading: (v: boolean) => void
  clearChat: (welcomeMessage: string) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (role, content) =>
    set((s) => ({
      messages: [...s.messages, { id: genId(), role, content, timestamp: new Date() }],
    })),
  setLoading: (v) => set({ isLoading: v }),
  // Welcome message is passed from the component so it can be translated
  clearChat: (welcomeMessage) =>
    set({
      messages: [{ id: genId(), role: 'assistant', content: welcomeMessage, timestamp: new Date() }],
    }),
}))

// ─── Calculator store ─────────────────────────────────────────────────────────
interface CalcStore {
  selectedWork: WorkType
  suprafata: string
  grosime: string
  inaltime: string
  adaos: string
  result: CalcResult | null
  setWork: (w: WorkType) => void
  setField: (k: string, v: string) => void
  setResult: (r: CalcResult | null) => void
}

export const useCalcStore = create<CalcStore>((set) => ({
  selectedWork: 'zidarie',
  suprafata: '',
  grosime: '12.5',
  inaltime: '2.8',
  adaos: '10',
  result: null,
  setWork: (w) => set({ selectedWork: w, result: null }),
  setField: (k, v) => set({ [k]: v } as any),
  setResult: (r) => set({ result: r }),
}))

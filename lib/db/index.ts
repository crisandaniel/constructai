// lib/db/index.ts
// Server-side only — folosește service_role key, nu expune în browser

import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL)         throw new Error('Missing SUPABASE_URL')
if (!process.env.SUPABASE_SERVICE_KEY) throw new Error('Missing SUPABASE_SERVICE_KEY')

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { persistSession: false } }
)

// ── Tipuri ────────────────────────────────────────────────────────

export interface ConversationRow {
  id:            string
  session_id:    string
  locale:        string
  started_at:    string
  ended_at?:     string
  message_count: number
  metadata:      Record<string, unknown>
}

export interface MessageRow {
  id:              string
  conversation_id: string
  role:            'user' | 'assistant'
  content:         string
  tokens_used?:    number
  latency_ms?:     number
  created_at:      string
}

// ── Conversații ───────────────────────────────────────────────────

export async function upsertConversation(
  sessionId: string,
  locale: string,
  metadata?: Record<string, unknown>
): Promise<string | null> {
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .eq('session_id', sessionId)
    .is('ended_at', null)
    .order('started_at', { ascending: false })
    .limit(1)
    .single()

  if (existing) return existing.id

  const { data, error } = await supabase
    .from('conversations')
    .insert({ session_id: sessionId, locale, metadata: metadata ?? {} })
    .select('id')
    .single()

  if (error) {
    console.error('[db] upsertConversation:', error.message)
    return null
  }

  return data.id
}

export async function saveMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  opts?: { tokensUsed?: number; latencyMs?: number }
): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      role,
      content,
      tokens_used: opts?.tokensUsed ?? null,
      latency_ms:  opts?.latencyMs  ?? null,
    })

  if (error) { console.error('[db] saveMessage:', error.message); return }

  // Incrementează message_count
  const { data } = await supabase
    .from('conversations')
    .select('message_count')
    .eq('id', conversationId)
    .single()

  if (data) {
    await supabase
      .from('conversations')
      .update({ message_count: (data.message_count ?? 0) + 1 })
      .eq('id', conversationId)
  }
}

export async function closeConversation(conversationId: string): Promise<void> {
  await supabase
    .from('conversations')
    .update({ ended_at: new Date().toISOString() })
    .eq('id', conversationId)
}

// ── Events UI ─────────────────────────────────────────────────────

export type EventType =
  | 'filter_click'
  | 'calc_submit'
  | 'suggestion_click'
  | 'material_click'
  | 'locale_change'
  | 'chat_open'

export async function trackEvent(
  sessionId: string,
  eventType: EventType,
  payload: Record<string, unknown> = {},
  locale = 'ro'
): Promise<void> {
  const { error } = await supabase
    .from('events')
    .insert({ session_id: sessionId, event_type: eventType, payload, locale })

  if (error) console.error('[db] trackEvent:', error.message)
}

// ── Erori ─────────────────────────────────────────────────────────

export async function logError(
  errorType: string,
  message: string,
  opts?: { sessionId?: string; stack?: string; context?: Record<string, unknown> }
): Promise<void> {
  const { error } = await supabase
    .from('error_logs')
    .insert({
      session_id: opts?.sessionId ?? null,
      error_type: errorType,
      message,
      stack:      opts?.stack   ?? null,
      context:    opts?.context ?? {},
    })

  if (error) console.error('[db] logError:', error.message)
}
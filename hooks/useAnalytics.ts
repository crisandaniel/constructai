'use client'

// hooks/useAnalytics.ts
// Folosit din componente client pentru a trimite events UI

import { useCallback } from 'react'
import type { EventType } from '@/lib/db'

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr'
  const key = 'constructai_session'
  let id = sessionStorage.getItem(key)
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    sessionStorage.setItem(key, id)
  }
  return id
}

export function useAnalytics(locale = 'ro') {
  const track = useCallback(
    async (eventType: EventType, payload: Record<string, unknown> = {}) => {
      try {
        await fetch('/api/events', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: getSessionId(),
            eventType,
            payload,
            locale,
          }),
        })
      } catch {
        // nu blocăm UI pentru erori de analytics
      }
    },
    [locale]
  )

  return { track, sessionId: getSessionId() }
}
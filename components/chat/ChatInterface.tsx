'use client'

import { useRef, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useChatStore } from '@/lib/store'
import { ChatMessage, TypingIndicator } from './ChatMessage'
import { useAnalytics } from '@/hooks/useAnalytics'
import { MATERIALS_KB } from '@/lib/materials-data'

interface Props {
  initialMessage?: string
  locale?: string
}

export function ChatInterface({ initialMessage, locale = 'ro' }: Props) {
  const t = useTranslations('chat')
  const { messages, isLoading, addMessage, setLoading, clearChat } = useChatStore()
  const [input, setInput] = useState(initialMessage || '')
  const [streamingText, setStreamingText] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { track, sessionId } = useAnalytics(locale)

  useEffect(() => {
    if (!initialized) {
      clearChat(t('welcome'))
      setInitialized(true)
      track('chat_open')
    }
  }, [initialized, clearChat, t])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText, isLoading])

  // Keywords that trigger a local hardcoded response (no API call)
  function getLocalResponse(msg: string): string | null {
    const lower = msg.toLowerCase()
    const isMaterialsQuery =
      lower.includes('ce materiale') ||
      lower.includes('ce produse') ||
      lower.includes('ce stii') ||
      lower.includes('ce știi') ||
      lower.includes('lista materiale') ||
      lower.includes('what materials') ||
      lower.includes('what do you know')

    if (!isMaterialsQuery) return null

    const byCategory = MATERIALS_KB.reduce<Record<string, string[]>>((acc, m) => {
      if (!acc[m.category]) acc[m.category] = []
      acc[m.category].push(m.name)
      return acc
    }, {})

    const lines = Object.entries(byCategory)
      .map(([cat, names]) => `**${cat}**\n${names.map(n => `- ${n}`).join('\n')}`)
      .join('\n\n')

    return `Cunosc următoarele materiale de construcții:

${lines}`
  }

  async function sendMessage(text?: string) {
    const msg = (text || input).trim()
    if (!msg || isLoading) return

    setInput('')
    setShowSuggestions(false)
    addMessage('user', msg)
    setLoading(true)
    setStreamingText('')

    // Check for local response first — no API call needed
    const localResponse = getLocalResponse(msg)
    if (localResponse) {
      setTimeout(() => {
        addMessage('assistant', localResponse)
        setLoading(false)
      }, 300)
      return
    }

    const history = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: msg },
    ]

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, sessionId, locale }),
      })

      if (res.status === 429) {
        addMessage('assistant', t('errorRateLimit'))
        fetch('/api/log-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            errorType: 'rate_limited',
            message: '429 Too Many Requests from Cloudflare',
            sessionId,
            context: { locale },
          }),
        }).catch(() => {})
        return
      }
      if (!res.ok) throw new Error(`API error ${res.status}`)

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.startsWith('data: ')) continue
          const payload = line.slice(6)
          if (payload === '[DONE]') break
          try {
            full += JSON.parse(payload).text
            setStreamingText(full)
          } catch {}
        }
      }

      addMessage('assistant', full)
      setStreamingText('')
    } catch (err: any) {
      addMessage('assistant', t('errorConnect'))
      // Log error to Supabase via API (logError is server-side only)
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          errorType: 'chat_client_error',
          message: err?.message || String(err),
          sessionId,
          context: { locale, msgCount: messages.length },
        }),
      }).catch(() => {}) // fire and forget
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  function handleSuggestion(s: string) {
    track('suggestion_click', { text: s })
    sendMessage(s)
  }

  const suggestions = t.raw('suggestions') as string[]

  return (
    <div className="chat__container">
      <div className="chat__header">
        <div className="chat__avatar">🤖</div>
        <div>
          <h3 className="chat__ai-name">{t('title')}</h3>
          <span className="chat__status">{t('status')}</span>
        </div>
        <div className="chat__actions">
          <button
            onClick={() => { clearChat(t('newChat')); setShowSuggestions(true) }}
            className="btn btn--icon"
            title={t('clearChat')}
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="chat__messages">
        {messages.map((m) => <ChatMessage key={m.id} message={m} />)}
        {isLoading && streamingText && (
          <ChatMessage
            message={{ id: 'streaming', role: 'assistant', content: streamingText, timestamp: new Date() }}
            isStreaming
          />
        )}
        {isLoading && !streamingText && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat__input-area">
        {showSuggestions && (
          <div className="chat__suggestions">
            {suggestions.map((s) => (
              <button key={s} onClick={() => handleSuggestion(s)} className="chat__suggestion-chip">{s}</button>
            ))}
          </div>
        )}
        <div className="chat__input-row">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={t('placeholder')}
            rows={1}
            className="chat__textarea"
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="chat__send-btn"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}
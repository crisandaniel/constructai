'use client'

import { useRef, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useChatStore } from '@/lib/store'
import { ChatMessage, TypingIndicator } from './ChatMessage'
import { useAnalytics } from '@/hooks/useAnalytics'

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

  async function sendMessage(text?: string) {
    const msg = (text || input).trim()
    if (!msg || isLoading) return

    setInput('')
    setShowSuggestions(false)
    addMessage('user', msg)
    setLoading(true)
    setStreamingText('')

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

      if (!res.ok) throw new Error('API error')

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
    } catch {
      addMessage('assistant', t('errorConnect'))
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
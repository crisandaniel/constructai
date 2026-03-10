'use client'

import { cn } from '@/lib/utils'
import type { Message } from '@/types'

// Converts markdown-like syntax to HTML for chat bubbles.
// Styles are defined in styles/base/_typography.scss under .prose-chat
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^### (.*)/gm, '<h3>$1</h3>')
    .replace(/^## (.*)/gm,  '<h2>$1</h2>')
    .replace(/^- (.*)/gm,   '<li>$1</li>')
    .replace(/(<li>.*?<\/li>\n?)+/gs, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
}

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isAI = message.role === 'assistant'

  return (
    <div className={cn('chat__message', isAI ? 'chat__message--ai' : 'chat__message--user')}>
      {/* Avatar row — only for AI */}
      {isAI && (
        <div className="chat__message-header">
          <div className="msg-avatar msg-avatar--ai">🤖</div>
        </div>
      )}

      {/* Bubble — full width below avatar for AI, aligned right for user */}
      <div className="flex items-end gap-2 w-full" style={isAI ? {} : { justifyContent: 'flex-end' }}>
        <div
          className={cn('chat__bubble', 'prose-chat')}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
        />
        {!isAI && (
          <div className="msg-avatar msg-avatar--user flex-shrink-0">👤</div>
        )}
      </div>

      {isStreaming && <span className="text-dust text-xs animate-pulse self-start ml-1">●</span>}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="chat__typing">
      <div className="chat__message-header">
        <div className="msg-avatar msg-avatar--ai">🤖</div>
      </div>
      <div className="chat__typing-dots">
        <span /><span /><span />
      </div>
    </div>
  )
}
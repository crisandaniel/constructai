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
      <div className={cn('msg-avatar', isAI ? 'msg-avatar--ai' : 'msg-avatar--user')}>
        {isAI ? '🤖' : '👤'}
      </div>
      <div
        className={cn('chat__bubble', 'prose-chat')}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
      />
      {isStreaming && <span className="self-end text-dust text-xs mb-1 animate-pulse">●</span>}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="chat__typing">
      <div className="msg-avatar msg-avatar--ai">🤖</div>
      <div className="chat__typing-dots">
        <span /><span /><span />
      </div>
    </div>
  )
}

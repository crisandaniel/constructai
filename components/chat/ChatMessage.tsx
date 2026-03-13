'use client'

import { cn } from '@/lib/utils'
import type { Message } from '@/types'

// Proxiază imaginile externe prin /api/img-proxy pentru a evita CORS/hotlink blocking
function proxyImg(src: string): string {
  if (src.startsWith('/api/img-proxy')) return src
  return `/api/img-proxy?url=${encodeURIComponent(src)}`
}

// Converts markdown to HTML, including tables and images
function renderMarkdown(text: string): string {
  // Collapse blank lines between list items — prevents <p> gaps inside lists
  text = text.replace(/(^[\*\-] .+)\n\n(?=[\*\-] )/gm, '$1\n')

  return text
    // Images: ![alt](url) — proxied thumbnail
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
      const proxied = proxyImg(src)
      return `<img src="${proxied}" alt="${alt}" class="chat-thumb" loading="lazy" onerror="this.style.display='none'" />`
    })

    // Links with images inside — keep them clickable: [![alt](img)](url)
    .replace(
      /\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g,
      (_, alt, imgSrc, href) => {
        const proxied = proxyImg(imgSrc)
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="chat-thumb-link">
          <img src="${proxied}" alt="${alt}" class="chat-thumb" loading="lazy" onerror="this.style.display='none'" />
        </a>`
      }
    )

    // Tables: | col | col |
    .replace(/(\|.+\|\n?)+/g, (tableBlock) => {
      const rows = tableBlock.trim().split('\n').filter(r => r.trim())
      if (rows.length < 2) return tableBlock

      const header = rows[0]
      const body   = rows.slice(2) // skip separator row

      const parseRow = (row: string, tag: 'th' | 'td') =>
        '<tr>' +
        row.split('|')
           .slice(1, -1)
           .map(cell => `<${tag}>${cell.trim()}</${tag}>`)
           .join('') +
        '</tr>'

      return `<div class="chat-table-wrap"><table class="chat-table">
        <thead>${parseRow(header, 'th')}</thead>
        <tbody>${body.map(r => parseRow(r, 'td')).join('')}</tbody>
      </table></div>`
    })

    // Standard formatting
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,     '<em>$1</em>')
    .replace(/`([^`]+)`/g,     '<code>$1</code>')
    .replace(/^### (.*)/gm,    '<h3>$1</h3>')
    .replace(/^## (.*)/gm,     '<h2>$1</h2>')
    // Links: [text](url) — regex handles URLs with query strings and special chars
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]*)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>')
    .replace(/^- (.*)/gm,      '<li>$1</li>')
    .replace(/(<li>.*?<\/li>\n?)+/gs, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g,           '</p><p>')
    .replace(/\n/g,             '<br>')
}

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isAI = message.role === 'assistant'

  return (
    <div className={cn('chat__message', isAI ? 'chat__message--ai' : 'chat__message--user')}>
      {isAI && (
        <div className="chat__message-header">
          <div className="msg-avatar msg-avatar--ai">🤖</div>
        </div>
      )}

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
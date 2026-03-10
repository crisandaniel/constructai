import { getAIProvider } from '@/lib/ai'
import { SYSTEM_PROMPT, MATERIAL_SECTIONS } from '@/lib/materials-data'
import { upsertConversation, saveMessage, logError } from '@/lib/db'

export const runtime = 'nodejs'

// Returns only the material sections relevant to the user's question
// Keeps token usage low — instead of sending all 40 sections every time,
// we send only the ones that match keywords in the question.
function getRelevantSections(messages: { role: string; content: string }[]): string {
  // Collect all user messages to search for keywords
  const userText = messages
    .filter(m => m.role === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ')

  const matched: string[] = []

  for (const [key, section] of Object.entries(MATERIAL_SECTIONS)) {
    // Match if key words from the section name appear in the user's message
    const keyWords = key.replace(/_/g, ' ').split(' ').filter(w => w.length > 3)
    if (keyWords.some(word => userText.includes(word))) {
      matched.push(section)
    }
  }

  // If nothing matched, return top 5 most common sections as fallback
  if (matched.length === 0) {
    return Object.values(MATERIAL_SECTIONS).slice(0, 5).join('\n\n')
  }

  // Cap at 8 sections max to control token usage
  return matched.slice(0, 8).join('\n\n')
}

export async function POST(req: Request) {
  const startTime = Date.now()

  try {
    const { messages, sessionId, locale = 'ro' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages payload' }, { status: 400 })
    }

    // Get or create conversation for this session
    const conversationId = sessionId
      ? await upsertConversation(sessionId, locale, {
          userAgent: req.headers.get('user-agent') ?? undefined,
        })
      : null

    // Save the user message (last in array)
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
    if (conversationId && lastUserMessage) {
      await saveMessage(conversationId, 'user', lastUserMessage.content)
    }

    // Build dynamic system prompt — base instructions + relevant material sections only
    const relevantSections = getRelevantSections(messages)
    const dynamicPrompt = `${SYSTEM_PROMPT}\n\n## DATE TEHNICE RELEVANTE\n\n${relevantSections}`

    const provider = getAIProvider()
    const stream = await provider.stream(messages, dynamicPrompt)

    // Use TransformStream to intercept chunks and collect full response for DB
    let fullResponse = ''
    const { readable, writable } = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk)
        for (const line of text.split('\n')) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const parsed = JSON.parse(line.slice(6))
              if (parsed.text) fullResponse += parsed.text
            } catch {}
          }
        }
        controller.enqueue(chunk)
      },
      flush() {
        if (conversationId && fullResponse) {
          const latencyMs = Date.now() - startTime
          saveMessage(conversationId, 'assistant', fullResponse, { latencyMs })
            .catch(err => console.error('[chat] saveMessage assistant:', err))
        }
      },
    })

    stream.pipeTo(writable).catch(err => console.error('[chat] pipe error:', err))

    return new Response(readable, {
      headers: {
        'Content-Type':  'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':    'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('[chat/route]', error)
    logError('ai_error', error.message, { stack: error.stack }).catch(() => {})
    return Response.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
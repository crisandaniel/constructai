import { getAIProvider } from '@/lib/ai'
import { SYSTEM_PROMPT } from '@/lib/materials-data'
import { upsertConversation, saveMessage, logError } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const startTime = Date.now()

  try {
    const { messages, sessionId, locale = 'ro' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages payload' }, { status: 400 })
    }

    // Obține sau creează conversația pentru această sesiune
    const conversationId = sessionId
      ? await upsertConversation(sessionId, locale, {
          userAgent: req.headers.get('user-agent') ?? undefined,
        })
      : null

    // Salvează mesajul user (ultimul din array)
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
    if (conversationId && lastUserMessage) {
      await saveMessage(conversationId, 'user', lastUserMessage.content)
    }

    const provider = getAIProvider()

    // Colectăm răspunsul complet pentru a-l salva după streaming
    let fullResponse = ''

    const originalStream = await provider.stream(messages, SYSTEM_PROMPT)

    // Wrap stream — interceptăm chunks și salvăm răspunsul complet
    const wrappedStream = new ReadableStream({
      async start(controller) {
        const reader = originalStream.getReader()
        const decoder = new TextDecoder()

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })

            // Extrage textul din SSE chunks (format: "data: text\n\n")
            for (const line of chunk.split('\n')) {
              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                fullResponse += line.slice(6)
              }
            }

            controller.enqueue(value)
          }
        } finally {
          reader.releaseLock()
          controller.close()

          // Salvează răspunsul AI după ce streaming-ul s-a terminat
          if (conversationId && fullResponse) {
            const latencyMs = Date.now() - startTime
            saveMessage(conversationId, 'assistant', fullResponse, { latencyMs })
              .catch(err => console.error('[chat] saveMessage assistant:', err))
          }
        }
      },
    })

    return new Response(wrappedStream, {
      headers: {
        'Content-Type':  'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':    'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('[chat/route]', error)

    logError('ai_error', error.message, {
      stack: error.stack,
    }).catch(() => {})

    return Response.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
import { getAIProvider } from '@/lib/ai'
import { SYSTEM_PROMPT } from '@/lib/materials-data'

export const runtime = 'nodejs'

// This file never changes when switching providers.
// Set AI_PROVIDER in .env to switch: anthropic | openai | gemini | ollama
export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages payload' }, { status: 400 })
    }

    const provider = getAIProvider()
    const stream = await provider.stream(messages, SYSTEM_PROMPT)

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    console.error('[chat/route]', error)
    return Response.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

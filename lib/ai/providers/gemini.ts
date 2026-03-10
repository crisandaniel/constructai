import type { AIProvider, ChatMessage } from '../types'

export class GeminiProvider implements AIProvider {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.GOOGLE_AI_API_KEY || ''
  }

  async stream(messages: ChatMessage[], systemPrompt: string): Promise<ReadableStream> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:streamGenerateContent?key=${this.apiKey}&alt=sse`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: { maxOutputTokens: 1024 },
      }),
    })

    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`)

    const encoder = new TextEncoder()
    const reader = response.body!.getReader()
    const decoder = new TextDecoder()

    return new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            for (const line of decoder.decode(value).split('\n')) {
              if (!line.startsWith('data: ')) continue
              try {
                const json = JSON.parse(line.slice(6))
                const text = json.candidates?.[0]?.content?.parts?.[0]?.text || ''
                if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
              } catch {}
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })
  }
}

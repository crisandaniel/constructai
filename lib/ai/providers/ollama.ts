import type { AIProvider, ChatMessage } from '../types'

// Ollama runs locally — no API key needed
// Setup: https://ollama.ai → ollama serve → ollama pull llama3
export class OllamaProvider implements AIProvider {
  private baseUrl: string
  private model: string

  constructor() {
    this.baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
    this.model   = process.env.OLLAMA_MODEL    || 'llama3'
  }

  async stream(messages: ChatMessage[], systemPrompt: string): Promise<ReadableStream> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        stream: true,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
      }),
    })

    if (!response.ok) throw new Error(`Ollama error: ${response.status}. Run: ollama serve`)

    const encoder = new TextEncoder()
    const reader = response.body!.getReader()
    const decoder = new TextDecoder()

    return new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            for (const line of decoder.decode(value).split('\n').filter(Boolean)) {
              try {
                const json = JSON.parse(line)
                const text = json.message?.content || ''
                if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
                if (json.done) {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                  controller.close()
                  return
                }
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

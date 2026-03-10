import OpenAI from 'openai'
import type { AIProvider, ChatMessage } from '../types'

export class OpenAIProvider implements AIProvider {
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }

  async stream(messages: ChatMessage[], systemPrompt: string): Promise<ReadableStream> {
    const stream = await this.client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ],
    })

    const encoder = new TextEncoder()
    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || ''
            if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
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

// Common contract that all AI providers must implement.
// route.ts only knows about this interface — never about specific providers.

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface AIProvider {
  // Returns a ReadableStream of SSE chunks
  // Each chunk format : data: {"text": "..."}\n\n
  // Final chunk format: data: [DONE]\n\n
  stream(messages: ChatMessage[], systemPrompt: string): Promise<ReadableStream>
}

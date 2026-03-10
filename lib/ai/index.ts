import type { AIProvider } from './types'

export type ProviderName = 'anthropic' | 'openai' | 'gemini' | 'ollama'

// Reads AI_PROVIDER from environment and returns the correct provider instance.
// This is the only file that knows which provider is active.
// To add a new provider: create providers/newprovider.ts and add a case below.
export function getAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || 'anthropic') as ProviderName

  switch (provider) {
    case 'anthropic': {
      const { AnthropicProvider } = require('./providers/anthropic')
      return new AnthropicProvider()
    }
    case 'openai': {
      const { OpenAIProvider } = require('./providers/openai')
      return new OpenAIProvider()
    }
    case 'gemini': {
      const { GeminiProvider } = require('./providers/gemini')
      return new GeminiProvider()
    }
    case 'ollama': {
      const { OllamaProvider } = require('./providers/ollama')
      return new OllamaProvider()
    }
    default:
      throw new Error(
        `Unknown provider: "${provider}". Valid values: anthropic | openai | gemini | ollama`
      )
  }
}

export type { AIProvider } from './types'

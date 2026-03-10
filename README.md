# ConstructAI

AI-powered construction materials assistant. Built with Next.js 14, TypeScript, SCSS, and a multi-provider AI abstraction layer.

## Quick start

```bash
npm install
cp .env.local.example .env.local   # add your API key
npm run dev                         # http://localhost:3000
```

## Switching AI providers

Change one line in `.env.local` — no code changes needed:

```bash
AI_PROVIDER=anthropic   # Claude (default)
AI_PROVIDER=openai      # GPT-4o
AI_PROVIDER=gemini      # Gemini 1.5 Pro
AI_PROVIDER=ollama      # Local model (free)
```

## Adding a new language

1. Create `messages/{locale}.json` (copy `messages/en.json` as template)
2. Add the locale to `i18n.ts`:
   ```ts
   export const locales = ['ro', 'en', 'de'] as const
   ```
3. Add the label to `components/layout/Header.tsx`:
   ```ts
   const LOCALE_LABELS = { ro: 'RO', en: 'EN', de: 'DE' }
   ```

Done — no other changes needed.

## Project structure

```
app/
├── api/chat/route.ts          # Provider-agnostic streaming endpoint
├── api/calculate/route.ts     # Materials calculator endpoint
├── [locale]/                  # All pages under locale prefix (/ro, /en)
│   ├── layout.tsx             # Loads translations, renders Header
│   ├── page.tsx               # Homepage
│   ├── asistent/page.tsx      # Chat + Calculator
│   └── materiale/page.tsx     # Materials catalog

components/
├── chat/                      # ChatInterface, ChatMessage
├── calculator/                # CalcSidebar
└── layout/                    # Header with language selector

lib/
├── ai/
│   ├── types.ts               # AIProvider interface (common contract)
│   ├── index.ts               # Factory: reads AI_PROVIDER, returns provider
│   └── providers/             # anthropic | openai | gemini | ollama
├── calculator.ts              # Calculation logic
├── materials-data.ts          # Knowledge base + system prompt
└── store.ts                   # Zustand state (chat, calculator)

messages/
├── ro.json                    # Romanian translations (default)
└── en.json                    # English translations

styles/
├── main.scss                  # Entry point
├── abstracts/                 # _variables.scss, _mixins.scss
├── base/                      # _reset.scss, _typography.scss
├── components/                # _ui.scss, _chat.scss, _calculator.scss
└── layout/                    # _header.scss, _layouts.scss
```

## Adding a new AI provider

1. Create `lib/ai/providers/myprovider.ts` implementing `AIProvider`
2. Add a `case` in `lib/ai/index.ts`
3. Set `AI_PROVIDER=myprovider` in `.env.local`

## Docker

```
export DOCKER_BUILDKIT=1
docker build -t constructai .
docker compose up
```

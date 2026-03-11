import { logError } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { errorType, message, sessionId, context } = await req.json()
    await logError(errorType, message, { sessionId, context })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false }, { status: 500 })
  }
}
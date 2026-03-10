import { trackEvent, type EventType } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { sessionId, eventType, payload, locale } = await req.json()

    if (!sessionId || !eventType) {
      return Response.json({ error: 'Missing sessionId or eventType' }, { status: 400 })
    }

    await trackEvent(sessionId, eventType as EventType, payload ?? {}, locale ?? 'ro')

    return Response.json({ ok: true })
  } catch (error: any) {
    console.error('[events/route]', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
import { getClient } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { message, email, page, locale } = await req.json()
    if (!message?.trim()) return Response.json({ error: 'Mesajul e gol' }, { status: 400 })

    const db = getClient()
    const { error } = await db.from('feedback').insert({ message: message.trim(), email: email?.trim() || null, page, locale })
    if (error) throw error

    return Response.json({ ok: true })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
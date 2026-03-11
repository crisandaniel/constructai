import { getClient } from '@/lib/db'

export const runtime = 'nodejs'

function checkAuth(req: Request): boolean {
  const auth = req.headers.get('authorization')
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  return auth === `Bearer ${password}`
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = getClient()

  const { data: messages } = await db
    .from('messages')
    .select('*')
    .eq('conversation_id', params.id)
    .order('created_at', { ascending: true })

  return Response.json({ messages })
}
import { getClient } from '@/lib/db'

export const runtime = 'nodejs'

function checkAuth(req: Request): boolean {
  const auth = req.headers.get('authorization')
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  return auth === `Bearer ${password}`
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const page   = parseInt(searchParams.get('page') || '1')
  const limit  = 20
  const offset = (page - 1) * limit

  const db = getClient()

  const { data: conversations, count } = await db
    .from('conversations')
    .select('*', { count: 'exact' })
    .order('started_at', { ascending: false })
    .range(offset, offset + limit - 1)

  return Response.json({ conversations, total: count, page, limit })
}
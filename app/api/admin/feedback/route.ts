import { getClient } from '@/lib/db'

export const runtime = 'nodejs'

function checkAuth(req: Request): boolean {
  const auth = req.headers.get('authorization')
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  return auth === `Bearer ${password}`
}

export async function GET(req: Request) {
  if (!checkAuth(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getClient()
  const { data, count } = await db
    .from('feedback')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50)

  return Response.json({ feedback: data, total: count })
}
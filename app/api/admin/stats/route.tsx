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

  const db = getClient()

  const { data: dailyConvs } = await db
    .from('conversations')
    .select('started_at, message_count')
    .gte('started_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    .order('started_at', { ascending: false })

  const { data: topMessages } = await db
    .from('messages')
    .select('content')
    .eq('role', 'user')
    .order('created_at', { ascending: false })
    .limit(200)

  const { data: errors } = await db
    .from('error_logs')
    .select('error_type, message, created_at, context')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: false })
    .limit(50)

  const { count: totalConvs } = await db
    .from('conversations')
    .select('*', { count: 'exact', head: true })

  const { count: totalMessages } = await db
    .from('messages')
    .select('*', { count: 'exact', head: true })

  return Response.json({ dailyConvs, topMessages, errors, summary: { totalConvs, totalMessages } })
}
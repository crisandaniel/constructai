import { getClient } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const db   = getClient()

    const { data, error } = await db
      .from('devize')
      .insert({
        session_id:     body.sessionId     ?? null,
        client_name:    body.clientName    ?? null,
        project_name:   body.projectName   ?? null,
        locale:         body.locale        ?? 'ro',
        items:          body.items         ?? [],
        total_mat:      body.totalMateriale ?? 0,
        total_manopera: body.totalManopera  ?? 0,
        total:          body.total          ?? 0,
      })
      .select('id')
      .single()

    if (error) throw error
    return Response.json({ id: data.id })
  } catch (err: any) {
    console.error('Save deviz error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
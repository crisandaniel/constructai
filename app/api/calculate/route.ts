import { calculate } from '@/lib/calculator'
import type { CalcInput } from '@/types'

export async function POST(req: Request) {
  try {
    const input: CalcInput = await req.json()

    if (!input.suprafata || input.suprafata <= 0) {
      return Response.json({ error: 'Surface area must be greater than 0' }, { status: 400 })
    }

    return Response.json(calculate(input))
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

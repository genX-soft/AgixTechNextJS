import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const result = await authenticateAdmin(request)
    return NextResponse.json({ authenticated: result })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message, stack: err?.stack }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

const ADMIN_PASSCODE = '9636962228'

export async function GET(request: NextRequest) {
  try {
    const passcode = request.headers.get('x-passcode')
    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const deleted = await storage.getDeletedContentSlugs()
    return NextResponse.json(deleted.map(d => d.slug))
  } catch (error) {
    console.error("Error fetching deleted slugs:", error)
    return NextResponse.json({ error: "Failed to fetch deleted articles" }, { status: 500 })
  }
}

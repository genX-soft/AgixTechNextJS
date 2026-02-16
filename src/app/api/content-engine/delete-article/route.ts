import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

const ADMIN_PASSCODE = '9636962228'

export async function POST(request: NextRequest) {
  try {
    const passcode = request.headers.get('x-passcode')
    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const body = await request.json()
    const { slug } = body
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: "Valid slug is required" }, { status: 400 })
    }
    const result = await storage.addDeletedContentSlug(slug)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("Error deleting content article:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}

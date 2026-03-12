import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@shared/schema'
import { hashPassword, noUsersExist } from '@/lib/auth'
import { z } from 'zod'

const setupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function GET() {
  try {
    const needsSetup = await noUsersExist()
    return NextResponse.json({ needsSetup })
  } catch (err) {
    console.error('Setup check error:', err)
    return NextResponse.json({ error: 'Failed to check setup status' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const needsSetup = await noUsersExist()
    if (!needsSetup) {
      return NextResponse.json(
        { error: 'Admin account already exists' },
        { status: 409 }
      )
    }

    const body = await request.json()
    const result = setupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || 'Invalid input' },
        { status: 400 }
      )
    }

    const { username, password } = result.data
    const password_hash = hashPassword(password)

    await db.insert(users).values({ username, password_hash })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('Setup error:', err)
    return NextResponse.json({ error: 'Failed to create admin account' }, { status: 500 })
  }
}

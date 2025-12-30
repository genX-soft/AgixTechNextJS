import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertLeadSchema } from '@shared/schema'
import { fromError } from 'zod-validation-error'

const ADMIN_PASSCODE = '9636962228'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = insertLeadSchema.safeParse(body)
    
    if (!result.success) {
      const validationError = fromError(result.error)
      return NextResponse.json(
        { error: validationError.toString() },
        { status: 400 }
      )
    }
    
    const lead = await storage.createLead(result.data)
    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const passcode = request.headers.get('x-passcode')
    
    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const leads = await storage.getLeads()
    return NextResponse.json(leads)
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    )
  }
}

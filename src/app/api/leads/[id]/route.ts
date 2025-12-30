import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

const ADMIN_PASSCODE = '9636962228'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const passcode = request.headers.get('x-passcode')
    
    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { id } = await params
    const lead = await storage.getLeadById(id)
    
    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(lead)
  } catch (error) {
    console.error("Error fetching lead:", error)
    return NextResponse.json(
      { error: "Failed to fetch lead" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const passcode = request.headers.get('x-passcode')
    
    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { id } = await params
    const body = await request.json()
    const lead = await storage.updateLead(id, body)
    
    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json(lead)
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const passcode = request.headers.get('x-passcode')
    
    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const { id } = await params
    const success = await storage.deleteLead(id)
    
    if (!success) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting lead:", error)
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    )
  }
}

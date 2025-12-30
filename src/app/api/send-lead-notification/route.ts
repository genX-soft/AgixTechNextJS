import { NextRequest, NextResponse } from 'next/server';

interface LeadNotificationData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  selections: Record<string, string>;
  maturityScore: number;
  recommendedService?: string;
  recommendedIntelligence?: string;
  entryUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadNotificationData = await request.json();
    
    // Format the selections into readable text
    const selectionsText = Object.entries(data.selections)
      .map(([key, value]) => {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim();
        return `${formattedKey}: ${value}`;
      })
      .join('\n');
    
    // Create email content
    const emailSubject = `New AI Discovery Lead: ${data.name} (Score: ${data.maturityScore})`;
    
    const emailBody = `
NEW LEAD FROM AI DISCOVERY ENGINE
================================

CONTACT INFORMATION
-------------------
Name: ${data.name}
Email: ${data.email}
WhatsApp: ${data.phone}
${data.message ? `Message: ${data.message}` : ''}

AI ASSESSMENT RESULTS
---------------------
AI Readiness Score: ${data.maturityScore}/100
${data.recommendedIntelligence ? `Recommended Focus: ${data.recommendedIntelligence}` : ''}
${data.recommendedService ? `Recommended Service: ${data.recommendedService}` : ''}

USER SELECTIONS
---------------
${selectionsText}

METADATA
--------
Entry URL: ${data.entryUrl}
Submitted: ${new Date().toISOString()}

---
This lead was captured via the AGIX AI Discovery Engine.
Follow up within 24 hours for best conversion.
    `.trim();

    // Check if Resend API key is available
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      // Send via Resend
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AGIX Leads <leads@agixtech.com>',
          to: ['santosh@agixtech.com'],
          subject: emailSubject,
          text: emailBody,
          reply_to: data.email,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        console.error('Resend API error:', error);
        // Don't fail the request, just log the error
      }
    } else {
      // Log to console if no email service is configured
      console.log('=== LEAD NOTIFICATION (No email service configured) ===');
      console.log('To: santosh@agixtech.com');
      console.log('Subject:', emailSubject);
      console.log('Body:', emailBody);
      console.log('=== END LEAD NOTIFICATION ===');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending lead notification:', error);
    // Return success anyway - we don't want to block the user experience
    return NextResponse.json({ success: true });
  }
}

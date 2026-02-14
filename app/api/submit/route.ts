import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const submission = {
      businessName: data.businessName,
      email: data.email,
      score: data.score,
      answers: data.answers,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    };
    
    // Send notification (email via SendGrid, webhook, etc.)
    // For now, log to Vercel logs - you can view in Vercel dashboard
    console.log('NEW LEAD:', JSON.stringify(submission, null, 2));
    
    // TODO: Send to your email or WhatsApp via webhook
    // Example: await fetch('YOUR_WEBHOOK_URL', { method: 'POST', body: JSON.stringify(submission) })
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json({ success: false, error: 'Failed to process' }, { status: 500 });
  }
}

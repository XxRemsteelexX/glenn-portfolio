
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import twilio from 'twilio';

const prisma = new PrismaClient();

// Initialize Resend client (lazy initialization)
let resend: Resend | null = null;
function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Initialize Twilio client
let twilioClient: ReturnType<typeof twilio> | null = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body?.name || !body?.email || !body?.subject || !body?.message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, email, subject, and message are required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please provide a valid email address' 
        },
        { status: 400 }
      );
    }
    
    const contact = await prisma.contact.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        subject: body.subject.trim(),
        message: body.message.trim(),
        phone: body?.phone?.trim(),
        company: body?.company?.trim(),
        status: 'new'
      }
    });

    // Send email notification
    const resendClient = getResendClient();
    if (resendClient) {
      try {
        await resendClient.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: 'dalbeyglenn@gmail.com',
          subject: `New Contact: ${body.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${body.name} (${body.email})</p>
            ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ''}
            ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ''}
            <p><strong>Subject:</strong> ${body.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${body.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue even if email fails
      }
    }

    // Send SMS notification
    if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
      try {
        await twilioClient.messages.create({
          body: `New contact from ${body.name}: ${body.subject}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: '+13192334445'
        });
      } catch (smsError) {
        console.error('Failed to send SMS notification:', smsError);
        // Continue even if SMS fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      contact: {
        id: contact.id,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    
    let whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }
    
    const contacts = await prisma.contact.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined
    });

    return NextResponse.json({
      success: true,
      contacts: contacts || [],
      count: contacts?.length || 0
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch contacts',
        contacts: [],
        count: 0
      },
      { status: 500 }
    );
  }
}

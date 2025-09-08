
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

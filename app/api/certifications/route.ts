import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let whereClause = {};
    if (featured === 'true') {
      whereClause = { featured: true };
    }

    const certifications = await prisma.certification.findMany({
      where: whereClause,
      orderBy: [
        { featured: 'desc' },
        { issueDate: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined
    });

    return NextResponse.json({
      success: true,
      certifications: certifications || [],
      count: certifications?.length || 0
    });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch certifications',
        certifications: [],
        count: 0
      },
      { status: 500 }
    );
  }
}
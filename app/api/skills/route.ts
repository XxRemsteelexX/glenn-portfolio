
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    
    let whereClause: any = {};
    if (featured === 'true') {
      whereClause.featured = true;
    }
    if (category) {
      whereClause.category = category;
    }
    
    const skills = await prisma.skill.findMany({
      where: whereClause,
      orderBy: [
        { featured: 'desc' },
        { category: 'asc' },
        { name: 'asc' }
      ]
    });

    // Get unique categories for filtering
    const categories = await prisma.skill.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' }
    });

    return NextResponse.json({
      success: true,
      skills: skills || [],
      categories: categories?.map(c => c.category) || [],
      count: skills?.length || 0
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch skills',
        skills: [],
        categories: [],
        count: 0
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const skill = await prisma.skill.create({
      data: {
        name: body?.name || 'Untitled Skill',
        category: body?.category || 'Other',
        proficiency: body?.proficiency || 'Beginner',
        yearsExp: body?.yearsExp,
        featured: body?.featured || false,
      }
    });

    return NextResponse.json({
      success: true,
      skill
    });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create skill' 
      },
      { status: 500 }
    );
  }
}

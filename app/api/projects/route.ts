
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
    
    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: [
        { featured: 'desc' },
        { stars: 'desc' },
        { updatedAt: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined
    });

    return NextResponse.json({
      success: true,
      projects: projects || [],
      count: projects?.length || 0
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch projects',
        projects: [],
        count: 0
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const project = await prisma.project.create({
      data: {
        name: body?.name || 'Untitled Project',
        description: body?.description || 'No description provided',
        longDescription: body?.longDescription,
        githubUrl: body?.githubUrl,
        liveUrl: body?.liveUrl,
        technologies: body?.technologies || [],
        imageUrl: body?.imageUrl,
        featured: body?.featured || false,
        stars: body?.stars || 0,
        forks: body?.forks || 0,
        language: body?.language,
      }
    });

    return NextResponse.json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create project' 
      },
      { status: 500 }
    );
  }
}

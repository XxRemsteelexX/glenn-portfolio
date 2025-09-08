
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { downloadFile } from '@/lib/s3';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const resume = await prisma.resume.findUnique({
      where: { id }
    });

    if (!resume) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      );
    }

    // Generate signed download URL
    const downloadUrl = await downloadFile(resume.cloudStoragePath);

    return NextResponse.json({
      success: true,
      downloadUrl,
      resume: {
        filename: resume.filename,
        originalName: resume.originalName,
        version: resume.version,
        uploadedAt: resume.uploadedAt
      }
    });
  } catch (error) {
    console.error('Error getting resume download URL:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate download URL' 
      },
      { status: 500 }
    );
  }
}

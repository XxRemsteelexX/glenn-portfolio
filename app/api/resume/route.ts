
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uploadFile } from '@/lib/s3';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: [
        { isActive: 'desc' },
        { uploadedAt: 'desc' }
      ]
    });

    return NextResponse.json({
      success: true,
      resumes: resumes || [],
      count: resumes?.length || 0
    });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch resumes',
        resumes: [],
        count: 0
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Please upload a PDF or Word document.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File too large. Please upload a file smaller than 10MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `resumes/${timestamp}-${file.name}`;
    
    // Upload to S3
    const cloudStoragePath = await uploadFile(buffer, fileName);
    
    // Deactivate current active resume
    await prisma.resume.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    });
    
    // Get current version number
    const lastResume = await prisma.resume.findFirst({
      orderBy: { uploadedAt: 'desc' }
    });
    
    const version = lastResume ? 
      (parseFloat(lastResume.version) + 0.1).toFixed(1) : 
      '1.0';
    
    // Create new resume record
    const resume = await prisma.resume.create({
      data: {
        filename: `${timestamp}-${file.name}`,
        originalName: file.name,
        cloudStoragePath,
        version,
        isActive: true,
        fileSize: file.size
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Resume uploaded successfully',
      resume
    });
  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to upload resume. Please try again.' 
      },
      { status: 500 }
    );
  }
}

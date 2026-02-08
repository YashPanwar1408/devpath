/**
 * POST /api/interview/video/upload
 * Upload recorded video to storage
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const sessionId = formData.get('sessionId') as string;
    const videoBlob = formData.get('video') as File;

    if (!sessionId || !videoBlob) {
      return NextResponse.json(
        { success: false, error: 'Missing sessionId or video' },
        { status: 400 }
      );
    }

    // Verify session belongs to user
    const session = await prisma.interviewSession.findFirst({
      where: {
        id: sessionId,
        userId,
      },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Interview session not found' },
        { status: 404 }
      );
    }

    // TODO: Upload to S3, Cloudinary, or other storage
    // For now, we'll just store a placeholder URL
    const videoUrl = `/videos/${sessionId}.webm`; // Placeholder

    // Update session with video URL
    await prisma.interviewSession.update({
      where: { id: sessionId },
      data: {
        videoUrl,
        videoRecorded: true,
      },
    });

    return NextResponse.json({
      success: true,
      videoUrl,
      message: 'Video uploaded successfully',
    });
  } catch (error) {
    console.error('Upload video error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload video' },
      { status: 500 }
    );
  }
}

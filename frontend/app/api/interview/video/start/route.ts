/**
 * POST /api/interview/video/start
 * Start video recording for interview
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const StartVideoSchema = z.object({
  sessionId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = StartVideoSchema.parse(body);

    // Verify session belongs to user
    const session = await prisma.interviewSession.findFirst({
      where: {
        id: data.sessionId,
        userId,
      },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Interview session not found' },
        { status: 404 }
      );
    }

    // Video recording will be handled client-side using RecordRTC
    // This endpoint just marks that recording is enabled
    await prisma.interviewSession.update({
      where: { id: data.sessionId },
      data: {
        videoRecorded: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Video recording started',
      sessionId: data.sessionId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Start video error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to start video recording' },
      { status: 500 }
    );
  }
}

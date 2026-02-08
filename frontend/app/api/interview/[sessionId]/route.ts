/**
 * GET /api/interview/[sessionId]
 * Gets details of a specific interview session
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sessionId = params.sessionId;
    
    const session = await prisma.interviewSession.findFirst({
      where: {
        id: sessionId,
        userId,
      },
      include: {
        feedback: true,
      },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Interview session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      session,
      feedback: session.feedback || null,
    });
  } catch (error) {
    console.error('Get session error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/interview/history
 * Gets all interview sessions for the authenticated user
 */

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sessions = await prisma.interviewSession.findMany({
      where: { userId },
      include: {
        feedback: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      sessions,
      total: sessions.length,
    });
  } catch (error) {
    console.error('Get history error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch interview history' },
      { status: 500 }
    );
  }
}

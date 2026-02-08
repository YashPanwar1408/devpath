/**
 * POST /api/interview/share
 * Create a shareable link for interview results
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 16);

const ShareRequestSchema = z.object({
  sessionId: z.string().uuid(),
  isPublic: z.boolean().default(true),
  expiresInDays: z.number().min(1).max(365).optional(),
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
    const data = ShareRequestSchema.parse(body);

    // Verify session belongs to user
    const session = await prisma.interviewSession.findFirst({
      where: {
        id: data.sessionId,
        userId,
        status: 'completed',
      },
      include: {
        feedback: true,
      },
    });

    if (!session || !session.feedback) {
      return NextResponse.json(
        { success: false, error: 'Interview session not found or not completed' },
        { status: 404 }
      );
    }

    // Check if share link already exists
    const existing = await prisma.sharedInterviewResult.findUnique({
      where: { sessionId: data.sessionId },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        shareUrl: `/shared/${existing.shareToken}`,
        shareToken: existing.shareToken,
        existing: true,
      });
    }

    // Create share link
    const expiresAt = data.expiresInDays
      ? new Date(Date.now() + data.expiresInDays * 24 * 60 * 60 * 1000)
      : null;

    const shared = await prisma.sharedInterviewResult.create({
      data: {
        sessionId: data.sessionId,
        userId,
        shareToken: nanoid(),
        isPublic: data.isPublic,
        expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      shareUrl: `/shared/${shared.shareToken}`,
      shareToken: shared.shareToken,
      expiresAt: shared.expiresAt,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Share creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create share link' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/interview/share/[token]
 * Get shared interview results by token
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;

    const shared = await prisma.sharedInterviewResult.findUnique({
      where: { shareToken: token },
      include: {
        session: {
          include: {
            feedback: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!shared) {
      return NextResponse.json(
        { success: false, error: 'Share link not found' },
        { status: 404 }
      );
    }

    // Check expiration
    if (shared.expiresAt && new Date() > shared.expiresAt) {
      return NextResponse.json(
        { success: false, error: 'Share link has expired' },
        { status: 410 }
      );
    }

    // Increment view count
    await prisma.sharedInterviewResult.update({
      where: { id: shared.id },
      data: {
        viewCount: { increment: 1 },
        lastViewedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      session: {
        ...shared.session,
        user: shared.session.user,
        // Don't expose sensitive data
        resumeSnapshot: undefined,
        vapiCallId: undefined,
        vapiAssistantId: undefined,
      },
      viewCount: shared.viewCount + 1,
      createdAt: shared.createdAt,
    });
  } catch (error) {
    console.error('Get shared result error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shared result' },
      { status: 500 }
    );
  }
}

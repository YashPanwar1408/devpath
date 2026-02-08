/**
 * POST /api/interview/create
 * Creates a new interview session with Clerk authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import {
  CreateInterviewRequestSchema,
} from '@/lib/schemas/interview.schema';
import { summarizeResume, summarizeJobDescription } from '@/lib/services/gemini.service';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = CreateInterviewRequestSchema.parse(body);

    // Ensure user exists in database
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: '', // Will be updated by webhook
      },
    });

    // Summarize resume for AI context
    const resumeSummary = await summarizeResume(
      typeof data.resumeData === 'string'
        ? data.resumeData
        : JSON.stringify(data.resumeData)
    );

    // Summarize JD if provided
    let jdSummary: string | undefined;
    if (data.jobDescription) {
      jdSummary = await summarizeJobDescription(data.jobDescription);
    }

    // Create session in database
    const session = await prisma.interviewSession.create({
      data: {
        userId,
        role: data.role,
        duration: parseInt(data.duration),
        status: 'setup',
        resumeSnapshot:
          typeof data.resumeData === 'string'
            ? data.resumeData
            : JSON.stringify(data.resumeData),
        jobDescription: data.jobDescription,
        resumeSummary,
        jdSummary,
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      session,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Interview creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create interview session' },
      { status: 500 }
    );
  }
}

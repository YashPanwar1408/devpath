/**
 * POST /api/interview/start
 * Starts the Vapi voice call for an interview
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { StartInterviewRequestSchema } from '@/lib/schemas/interview.schema';
import { createInterviewAssistant, startWebCall } from '@/lib/services/vapi.service';
import { generateInterviewSystemPrompt } from '@/lib/services/gemini.service';
import { prisma } from '@/lib/db';
import type { InterviewRole } from '@/lib/schemas/interview.schema';

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
    const data = StartInterviewRequestSchema.parse(body);

    // Get session from database
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

    if (session.status !== 'setup') {
      return NextResponse.json(
        { success: false, error: `Interview already ${session.status}` },
        { status: 400 }
      );
    }

    // Generate system prompt for Vapi
    const systemPrompt = generateInterviewSystemPrompt({
      role: session.role as InterviewRole,
      duration: String(session.duration),
      resumeSummary: session.resumeSummary || '',
      jdSummary: session.jdSummary || undefined,
    });

    // Create Vapi assistant
    const assistantId = await createInterviewAssistant(systemPrompt, session.role);

    // Start web call
    const { callId, webCallUrl } = await startWebCall(assistantId, session.id);

    // Update session in database
    await prisma.interviewSession.update({
      where: { id: session.id },
      data: {
        status: 'in-progress',
        vapiCallId: callId,
        vapiAssistantId: assistantId,
        startedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      callId,
      webCallUrl,
      assistantId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Interview start error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to start interview' },
      { status: 500 }
    );
  }
}

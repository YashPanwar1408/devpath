/**
 * POST /api/interview/end
 * Ends the interview and generates AI feedback
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { EndInterviewRequestSchema } from '@/lib/schemas/interview.schema';
import { endCall, getCallTranscript } from '@/lib/services/vapi.service';
import { generateInterviewFeedback } from '@/lib/services/gemini.service';
import { prisma } from '@/lib/db';
import type { InterviewRole } from '@/lib/schemas/interview.schema';

// Type definitions for JSON fields
type SkillRating = { skill: string; rating: number; comment?: string };
type RoleStats = Record<string, { count: number; totalScore: number; avgScore: number }>;
type MonthlyScore = { month: string; count: number; totalScore: number; avgScore: number };

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
    const data = EndInterviewRequestSchema.parse(body);

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

    if (session.status !== 'in-progress') {
      return NextResponse.json(
        { success: false, error: 'Interview is not in progress' },
        { status: 400 }
      );
    }

    if (!session.vapiCallId) {
      return NextResponse.json(
        { success: false, error: 'No active call found' },
        { status: 400 }
      );
    }

    // End the Vapi call
    await endCall(session.vapiCallId);

    // Get transcript
    const { messages, fullTranscript } = await getCallTranscript(session.vapiCallId);

    // Generate AI feedback
    const feedbackData = await generateInterviewFeedback({
      role: session.role as InterviewRole,
      transcript: fullTranscript,
      resumeSummary: session.resumeSummary || '',
      jdSummary: session.jdSummary || undefined,
      duration: String(session.duration),
    });

    // Create feedback in database
    const feedback = await prisma.interviewFeedback.create({
      data: {
        sessionId: session.id,
        overallScore: feedbackData.overallScore,
        communicationClarity: feedbackData.communicationClarity,
        technicalDepth: feedbackData.technicalDepth,
        confidence: feedbackData.confidence,
        roleAlignment: feedbackData.roleAlignment,
        skillRatings: feedbackData.skillRatings as SkillRating[],
        strengths: feedbackData.strengths,
        weaknesses: feedbackData.weaknesses,
        improvements: feedbackData.improvements,
        suggestedTopics: feedbackData.suggestedTopics,
        learningRoadmap: feedbackData.learningRoadmap,
        aiSummary: feedbackData.aiSummary,
      },
    });

    // Update session
    await prisma.interviewSession.update({
      where: { id: session.id },
      data: {
        status: 'completed',
        endedAt: new Date(),
        transcript: {
          messages: messages.map((msg) => ({
            role: msg.role === 'assistant' ? 'ai' : 'user',
            message: msg.message,
            timestamp: msg.timestamp,
          })),
          fullTranscript,
        },
      },
    });

    // Update analytics
    await updateUserAnalytics(userId, session, feedback);

    return NextResponse.json({
      success: true,
      feedback,
      transcript: {
        messages,
        fullTranscript,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Interview end error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to end interview' },
      { status: 500 }
    );
  }
}

// Update user analytics after interview
async function updateUserAnalytics(
  userId: string,
  session: { id: string; role: string; [key: string]: unknown },
  feedback: { overallScore: number; communicationClarity: number; technicalDepth: number; confidence: number; strengths: string[]; weaknesses: string[] }
) {
  const analytics = await prisma.interviewAnalytics.findUnique({
    where: { userId },
  });

  const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM

  if (analytics) {
    // Update existing analytics
    const roleStats = (analytics.roleStats as unknown as RoleStats) || {};
    const currentRoleStats = roleStats[session.role] || {
      count: 0,
      avgScore: 0,
      totalScore: 0,
    };

    currentRoleStats.count += 1;
    currentRoleStats.totalScore += feedback.overallScore;
    currentRoleStats.avgScore =
      currentRoleStats.totalScore / currentRoleStats.count;
    roleStats[session.role] = currentRoleStats;

    // Update monthly scores
    const monthlyScores = (analytics.monthlyScores as unknown as MonthlyScore[]) || [];
    const existingMonth = monthlyScores.find((m) => m.month === currentMonth);
    if (existingMonth) {
      existingMonth.count += 1;
      existingMonth.totalScore += feedback.overallScore;
      existingMonth.avgScore = existingMonth.totalScore / existingMonth.count;
    } else {
      monthlyScores.push({
        month: currentMonth,
        count: 1,
        totalScore: feedback.overallScore,
        avgScore: feedback.overallScore,
      });
    }

    // Update top strengths/weaknesses
    const allStrengths = [...analytics.topStrengths, ...feedback.strengths];
    const allWeaknesses = [...analytics.topWeaknesses, ...feedback.weaknesses];

    await prisma.interviewAnalytics.update({
      where: { userId },
      data: {
        totalInterviews: analytics.totalInterviews + 1,
        averageScore:
          ((analytics.averageScore * analytics.totalInterviews) +
            feedback.overallScore) /
          (analytics.totalInterviews + 1),
        averageCommunication:
          ((analytics.averageCommunication * analytics.totalInterviews) +
            feedback.communicationClarity) /
          (analytics.totalInterviews + 1),
        averageTechnical:
          ((analytics.averageTechnical * analytics.totalInterviews) +
            feedback.technicalDepth) /
          (analytics.totalInterviews + 1),
        averageConfidence:
          ((analytics.averageConfidence * analytics.totalInterviews) +
            feedback.confidence) /
          (analytics.totalInterviews + 1),
        roleStats,
        monthlyScores,
        topStrengths: [...new Set(allStrengths)].slice(0, 10),
        topWeaknesses: [...new Set(allWeaknesses)].slice(0, 10),
      },
    });
  } else {
    // Create new analytics
    await prisma.interviewAnalytics.create({
      data: {
        userId,
        totalInterviews: 1,
        averageScore: feedback.overallScore,
        averageCommunication: feedback.communicationClarity,
        averageTechnical: feedback.technicalDepth,
        averageConfidence: feedback.confidence,
        roleStats: {
          [session.role]: {
            count: 1,
            totalScore: feedback.overallScore,
            avgScore: feedback.overallScore,
          },
        },
        monthlyScores: [
          {
            month: currentMonth,
            count: 1,
            totalScore: feedback.overallScore,
            avgScore: feedback.overallScore,
          },
        ],
        topStrengths: feedback.strengths,
        topWeaknesses: feedback.weaknesses,
      },
    });
  }
}

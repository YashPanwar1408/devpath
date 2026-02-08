/**
 * GET /api/interview/analytics
 * Gets user interview analytics and performance trends
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

    // Get analytics
    const analytics = await prisma.interviewAnalytics.findUnique({
      where: { userId },
    });

    if (!analytics) {
      // Return empty analytics if none exist
      return NextResponse.json({
        success:true,
        analytics: {
          totalInterviews: 0,
          averageScore: 0,
          averageCommunication: 0,
          averageTechnical: 0,
          averageConfidence: 0,
          roleStats: {},
          monthlyScores: [],
          topStrengths: [],
          topWeaknesses: [],
        },
      });
    }

    // Get recent sessions for additional insights
    const recentSessions = await prisma.interviewSession.findMany({
      where: {
        userId,
        status: 'completed',
      },
      include: {
        feedback: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Calculate improvement trend (last 5 vs previous 5)
    let improvementTrend = 0;
    if (recentSessions.length >= 10) {
      const recent5 = recentSessions.slice(0, 5);
      const previous5 = recentSessions.slice(5, 10);

      const sumScores = (sessions: typeof recentSessions) =>
        sessions.reduce((sum, s) => sum + (s.feedback?.overallScore ?? 0), 0);

      const recentAvg = sumScores(recent5) / recent5.length;
      const previousAvg = sumScores(previous5) / previous5.length;

      improvementTrend = recentAvg - previousAvg;
    }

    return NextResponse.json({
      success: true,
      analytics: {
        ...analytics,
        recentSessions: recentSessions.slice(0, 5),
        improvementTrend,
      },
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

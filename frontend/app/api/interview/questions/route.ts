/**
 * GET /api/interview/questions
 * Get interview questions from question bank
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role');
    const difficulty = searchParams.get('difficulty');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where: Record<string, unknown> = {
      active: true,
    };

    if (role) where.role = role;
    if (difficulty) where.difficulty = difficulty;
    if (category) where.category = category;

    const questions = await prisma.questionBank.findMany({
      where,
      take: limit,
      orderBy: [{ usageCount: 'asc' }, { createdAt: 'desc' }],
    });

    // Update usage count for returned questions
    if (questions.length > 0) {
      await prisma.questionBank.updateMany({
        where: {
          id: { in: questions.map((q: { id: string }) => q.id) },
        },
        data: {
          usageCount: { increment: 1 },
        },
      });
    }

    return NextResponse.json({
      success: true,
      questions,
      total: questions.length,
    });
  } catch (error) {
    console.error('Get questions error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

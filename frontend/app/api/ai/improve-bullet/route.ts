/**
 * AI Bullet Point Improvement API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { bullet, context } = await request.json();

    if (!bullet || !context) {
      return NextResponse.json(
        { error: 'Bullet and context are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert resume writer. Improve this bullet point to be more impactful and ATS-friendly.

Original Bullet: "${bullet}"
Role: ${context.role}
Company: ${context.company}
${context.includeMetrics ? 'Include quantifiable metrics if possible.' : ''}

Guidelines:
1. Start with a strong action verb
2. Add quantifiable metrics (numbers, percentages, timeframes)
3. Follow CAR (Context-Action-Result) framework
4. Keep it concise (1-2 lines)
5. Use ATS-friendly keywords

Return ONLY valid JSON (no markdown):
{
  "improvedBullet": "string",
  "improvements": ["list of specific improvements made"],
  "metricsAdded": boolean,
  "impact": "high" | "medium" | "low"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const data = JSON.parse(jsonText);

    return NextResponse.json({
      originalBullet: bullet,
      ...data,
    });

  } catch (error: unknown) {
    console.error('Bullet Improvement Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to improve bullet',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

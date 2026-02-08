/**
 * AI Professional Summary Generation API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { resume, targetRole } = await request.json();

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const yearsOfExperience = calculateYears(resume.experience || []);
    const topSkills = extractSkills(resume);
    const recentRole = resume.experience?.[0]?.role || 'Professional';
    const recentCompany = resume.experience?.[0]?.company || '';

    const prompt = `Generate a compelling professional summary for this resume.

Role: ${targetRole || recentRole}
Years of Experience: ${yearsOfExperience}
Key Skills: ${topSkills.slice(0, 8).join(', ')}
Recent Position: ${recentRole}${recentCompany ? ` at ${recentCompany}` : ''}

Requirements:
1. 50-150 words
2. Highlight years of experience and key achievements
3. Mention top skills naturally
4. Show value proposition
5. Use professional tone (third-person or first-person without "I")
6. ATS-optimized with relevant keywords

Return ONLY the summary text (no JSON, no quotes, no formatting).`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text().trim();

    return NextResponse.json({
      summary,
    });

  } catch (error: unknown) {
    console.error('Summary Generation Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate summary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function calculateYears(experience: Array<{ startDate: string; endDate?: string; current: boolean }>): number {
  if (!experience || experience.length === 0) return 0;
  
  let totalMonths = 0;
  experience.forEach((exp) => {
    const start = new Date(exp.startDate);
    const end = exp.current ? new Date() : new Date(exp.endDate || exp.startDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    totalMonths += Math.max(0, months);
  });
  
  return Math.round(totalMonths / 12);
}

function extractSkills(resume: { skills?: { categories?: Array<{ skills: string[] }>; flatSkills?: string[] } }): string[] {
  const allSkills: string[] = [];
  
  if (resume.skills?.categories && resume.skills.categories.length > 0) {
    resume.skills.categories.forEach((cat) => {
      allSkills.push(...cat.skills);
    });
  } else if (resume.skills?.flatSkills) {
    allSkills.push(...resume.skills.flatSkills);
  }
  
  return allSkills;
}

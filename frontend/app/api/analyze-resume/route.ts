/**
 * ATS Resume Analysis API Route
 * Analyzes resume against job description using Gemini AI
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ATS_SCORE_WEIGHTS } from '@/lib/schemas/ats.schema';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const hasJobDescription = !!jobDescription && jobDescription.trim().length > 0;

    const prompt = `You are an expert ATS (Applicant Tracking System) analyzer. Analyze this resume${hasJobDescription ? ' against the job description' : ''} and provide detailed scoring.

Resume:
${resumeText}

${hasJobDescription ? `Job Description:\n${jobDescription}\n` : ''}

Analyze the resume and return ONLY valid JSON (no markdown, no code blocks) with this structure:
{
  "overallScore": number (0-100),
  "breakdown": {
    "keywords": number (0-100, keyword match score),
    "skills": number (0-100, skill coverage score),
    "experience": number (0-100, experience alignment),
    "format": number (0-100, formatting quality),
    "aiAnalysis": number (0-100, AI quality score)
  },
  "strengths": ["array of 3-5 key strengths"],
  "weaknesses": ["array of 3-5 areas for improvement"],
  "missingKeywords": [
    {"keyword": "Python", "category": "technical", "importance": "high"},
    {"keyword": "Leadership", "category": "soft", "importance": "medium"}
  ],
  "matchedKeywords": [
    {"keyword": "JavaScript", "frequency": 5, "context": "experience"},
    {"keyword": "React", "frequency": 3, "context": "skills"}
  ],
  "suggestions": [
    "Add more quantifiable metrics to achievements",
    "Include specific project outcomes",
    "Strengthen the professional summary"
  ],
  "criticalIssues": [
    {"issue": "Missing contact information", "severity": "high"},
    {"issue": "No quantifiable achievements", "severity": "medium"}
  ]
}

Scoring Guidelines:
- Keywords (${ATS_SCORE_WEIGHTS.keywordMatch * 100}%): Match with job description keywords
- Skills (${ATS_SCORE_WEIGHTS.skillCoverage * 100}%): Technical and soft skills coverage
- Experience (${ATS_SCORE_WEIGHTS.experienceAlignment * 100}%): Relevance and progression
- Format (${ATS_SCORE_WEIGHTS.formatting * 100}%): ATS-friendly structure
- AI Quality (${ATS_SCORE_WEIGHTS.aiQuality * 100}%): Content quality and impact

${hasJobDescription ? 'Focus on job-specific keyword matching and requirement alignment.' : 'Focus on general ATS best practices and resume quality.'}

Return ONLY the JSON object.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean response
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const parsedData = JSON.parse(jsonText);

    // Transform to full schema format
    const analysis = {
      overallScore: parsedData.overallScore || 0,
      scoreFormula: {
        keywordMatch: { 
          score: parsedData.breakdown?.keywords || 0, 
          weight: ATS_SCORE_WEIGHTS.keywordMatch 
        },
        skillCoverage: { 
          score: parsedData.breakdown?.skills || 0, 
          weight: ATS_SCORE_WEIGHTS.skillCoverage 
        },
        experienceAlignment: { 
          score: parsedData.breakdown?.experience || 0, 
          weight: ATS_SCORE_WEIGHTS.experienceAlignment 
        },
        formatting: { 
          score: parsedData.breakdown?.format || 0, 
          weight: ATS_SCORE_WEIGHTS.formatting 
        },
        aiQuality: { 
          score: parsedData.breakdown?.aiAnalysis || 0, 
          weight: ATS_SCORE_WEIGHTS.aiQuality 
        },
      },
      strengths: parsedData.strengths || [],
      weaknesses: parsedData.weaknesses || [],
      recommendations: (parsedData.suggestions || []).map((s: string, i: number) => ({
        priority: 'medium' as const,
        category: 'general',
        title: `Recommendation ${i + 1}`,
        description: s,
        expectedImpact: '+2-5 points',
        actionSteps: [s],
      })),
      criticalIssues: (parsedData.criticalIssues || []).map((issue: { issue: string; severity: string }) => ({
        issue: issue.issue,
        impact: issue.severity === 'high' ? 'high' : issue.severity === 'low' ? 'low' : 'medium',
        fix: `Address: ${issue.issue}`,
      })),
      jobMatch: {
        hasJobDescription,
        matchLevel: getMatchLevel(parsedData.overallScore || 0),
        matchPercentage: hasJobDescription ? parsedData.overallScore : undefined,
        topMissingKeywords: (parsedData.missingKeywords || []).slice(0, 10).map((k: { keyword: string }) => k.keyword),
        competitiveAdvantage: (parsedData.matchedKeywords || []).slice(0, 5).map((k: { keyword: string }) => k.keyword),
      },
      analyzedAt: new Date(),
      analysisVersion: '2.0.0',
    };

    return NextResponse.json({
      success: true,
      analysis,
    });

  } catch (error: unknown) {
    console.error('ATS Analysis Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze resume',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}

function getMatchLevel(score: number): 'excellent' | 'strong' | 'moderate' | 'weak' | 'poor' {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'strong';
  if (score >= 60) return 'moderate';
  if (score >= 40) return 'weak';
  return 'poor';
}

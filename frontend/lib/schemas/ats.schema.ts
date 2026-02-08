/**
 * ATS Analysis Schemas - Transparent & Explainable Scoring
 * Every score breakdown shows WHY and HOW it was calculated
 */

import { z } from 'zod';

// ============================================================================
// JOB DESCRIPTION ANALYSIS
// ============================================================================

export const JobDescriptionSchema = z.object({
  rawText: z.string().min(50, 'Job description too short'),
  
  // Extracted data
  requiredSkills: z.array(z.string()),
  preferredSkills: z.array(z.string()),
  tools: z.array(z.string()),
  roleLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']).optional(),
  industryKeywords: z.array(z.string()),
  
  // Analysis metadata
  analyzedAt: z.date(),
});

// ============================================================================
// KEYWORD MATCHING SCORE
// ============================================================================

export const KeywordMatchSchema = z.object({
  // Overall keyword match percentage
  score: z.number().min(0).max(100),
  
  // Breakdown by category
  breakdown: z.object({
    requiredSkills: z.object({
      score: z.number().min(0).max(100),
      matched: z.number(),
      total: z.number(),
      matchedKeywords: z.array(z.string()),
      missingKeywords: z.array(z.string()),
      weight: z.number(), // How much this affects overall score
    }),
    preferredSkills: z.object({
      score: z.number().min(0).max(100),
      matched: z.number(),
      total: z.number(),
      matchedKeywords: z.array(z.string()),
      missingKeywords: z.array(z.string()),
      weight: z.number(),
    }),
    tools: z.object({
      score: z.number().min(0).max(100),
      matched: z.number(),
      total: z.number(),
      matchedKeywords: z.array(z.string()),
      missingKeywords: z.array(z.string()),
      weight: z.number(),
    }),
    industryTerms: z.object({
      score: z.number().min(0).max(100),
      matched: z.number(),
      total: z.number(),
      matchedKeywords: z.array(z.string()),
      weight: z.number(),
    }),
  }),
  
  // Keyword density analysis
  overusedKeywords: z.array(z.object({
    keyword: z.string(),
    count: z.number(),
    recommendation: z.string(),
  })),
  
  // Placement recommendations
  suggestions: z.array(z.object({
    keyword: z.string(),
    currentSection: z.string().optional(),
    suggestedSection: z.string(),
    reason: z.string(),
  })),
});

// ============================================================================
// SKILL COVERAGE SCORE
// ============================================================================

export const SkillCoverageSchema = z.object({
  score: z.number().min(0).max(100),
  
  // Technical skills analysis
  technical: z.object({
    score: z.number().min(0).max(100),
    present: z.array(z.string()),
    missing: z.array(z.string()),
    depth: z.enum(['novice', 'intermediate', 'advanced', 'expert']),
    evidence: z.array(z.string()), // Where skills are demonstrated
  }),
  
  // Soft skills analysis
  soft: z.object({
    score: z.number().min(0).max(100),
    present: z.array(z.string()),
    missing: z.array(z.string()),
    evidence: z.array(z.string()),
  }),
  
  // Years of experience alignment
  experienceAlignment: z.object({
    score: z.number().min(0).max(100),
    resumeYears: z.number(),
    requiredYears: z.number().optional(),
    match: z.enum(['under', 'optimal', 'over']),
    message: z.string(),
  }),
});

// ============================================================================
// EXPERIENCE ALIGNMENT SCORE
// ============================================================================

export const ExperienceAlignmentSchema = z.object({
  score: z.number().min(0).max(100),
  
  // Role relevance
  roleRelevance: z.object({
    score: z.number().min(0).max(100),
    relevantRoles: z.number(),
    totalRoles: z.number(),
    explanation: z.string(),
  }),
  
  // Career progression
  careerProgression: z.object({
    score: z.number().min(0).max(100),
    trend: z.enum(['ascending', 'stable', 'descending', 'unclear']),
    gaps: z.array(z.object({
      between: z.string(),
      duration: z.string(),
      severity: z.enum(['minor', 'moderate', 'major']),
    })),
    explanation: z.string(),
  }),
  
  // Industry alignment
  industryAlignment: z.object({
    score: z.number().min(0).max(100),
    targetIndustry: z.string().optional(),
    relevantExperience: z.array(z.string()),
    explanation: z.string(),
  }),
});

// ============================================================================
// FORMATTING SCORE (ATS-Safe)
// ============================================================================

export const FormattingScoreSchema = z.object({
  score: z.number().min(0).max(100),
  
  checks: z.object({
    // ATS parsability
    parsability: z.object({
      score: z.number().min(0).max(100),
      issues: z.array(z.string()),
      passed: z.boolean(),
    }),
    
    // Structure
    structure: z.object({
      score: z.number().min(0).max(100),
      hasClearSections: z.boolean(),
      sectionOrder: z.enum(['optimal', 'acceptable', 'poor']),
      issues: z.array(z.string()),
    }),
    
    // Content quality
    content: z.object({
      score: z.number().min(0).max(100),
      wordCount: z.number(),
      optimalRange: z.object({ min: z.number(), max: z.number() }),
      bulletPoints: z.number(),
      actionVerbs: z.number(),
      metrics: z.number(),
      issues: z.array(z.string()),
    }),
    
    // Consistency
    consistency: z.object({
      score: z.number().min(0).max(100),
      dateFormat: z.boolean(),
      bulletStyle: z.boolean(),
      verbTense: z.boolean(),
      issues: z.array(z.string()),
    }),
  }),
  
  atsSafetyLevel: z.enum(['excellent', 'good', 'fair', 'poor']),
});

// ============================================================================
// AI QUALITY SCORE
// ============================================================================

export const AIQualityScoreSchema = z.object({
  score: z.number().min(0).max(100),
  
  // Impact analysis
  impactAnalysis: z.object({
    score: z.number().min(0).max(100),
    quantifiedAchievements: z.number(),
    actionVerbUsage: z.enum(['excellent', 'good', 'fair', 'poor']),
    suggestions: z.array(z.string()),
  }),
  
  // Professional tone
  professionalTone: z.object({
    score: z.number().min(0).max(100),
    issues: z.array(z.string()),
    strengths: z.array(z.string()),
  }),
  
  // Clarity & conciseness
  clarity: z.object({
    score: z.number().min(0).max(100),
    readabilityLevel: z.string(),
    verbosity: z.enum(['concise', 'optimal', 'verbose']),
    suggestions: z.array(z.string()),
  }),
  
  // Keyword stuffing detection
  authenticity: z.object({
    score: z.number().min(0).max(100),
    suspiciousPatterns: z.array(z.string()),
    natural: z.boolean(),
  }),
});

// ============================================================================
// COMPREHENSIVE ATS ANALYSIS
// ============================================================================

export const ATSAnalysisSchema = z.object({
  // Overall ATS compatibility score (0-100)
  overallScore: z.number().min(0).max(100),
  
  // Score formula (transparent calculation)
  scoreFormula: z.object({
    keywordMatch: z.object({ score: z.number(), weight: z.number() }),
    skillCoverage: z.object({ score: z.number(), weight: z.number() }),
    experienceAlignment: z.object({ score: z.number(), weight: z.number() }),
    formatting: z.object({ score: z.number(), weight: z.number() }),
    aiQuality: z.object({ score: z.number(), weight: z.number() }),
  }),
  
  // Detailed breakdowns
  keywordMatch: KeywordMatchSchema,
  skillCoverage: SkillCoverageSchema,
  experienceAlignment: ExperienceAlignmentSchema,
  formatting: FormattingScoreSchema,
  aiQuality: AIQualityScoreSchema,
  
  // Quick insights
  strengths: z.array(z.string()).max(10),
  weaknesses: z.array(z.string()).max(10),
  criticalIssues: z.array(z.object({
    issue: z.string(),
    impact: z.enum(['high', 'medium', 'low']),
    fix: z.string(),
  })),
  
  // Actionable recommendations (prioritized)
  recommendations: z.array(z.object({
    priority: z.enum(['critical', 'high', 'medium', 'low']),
    category: z.string(),
    title: z.string(),
    description: z.string(),
    expectedImpact: z.string(), // e.g., "+5-8 points"
    actionSteps: z.array(z.string()),
  })),
  
  // Completeness score
  completeness: z.object({
    score: z.number().min(0).max(100),
    requiredSections: z.array(z.object({
      section: z.string(),
      present: z.boolean(),
      quality: z.enum(['excellent', 'good', 'needs-improvement', 'missing']),
    })),
  }),
  
  // Job match summary (if JD provided)
  jobMatch: z.object({
    hasJobDescription: z.boolean(),
    matchLevel: z.enum(['excellent', 'strong', 'moderate', 'weak', 'poor']).optional(),
    matchPercentage: z.number().min(0).max(100).optional(),
    topMissingKeywords: z.array(z.string()).optional(),
    competitiveAdvantage: z.array(z.string()).optional(),
  }),
  
  // Analysis metadata
  analyzedAt: z.string(), // Zod handles dates as strings in JSON
  analysisVersion: z.string(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type JobDescription = z.infer<typeof JobDescriptionSchema>;
export type KeywordMatch = z.infer<typeof KeywordMatchSchema>;
export type SkillCoverage = z.infer<typeof SkillCoverageSchema>;
export type ExperienceAlignment = z.infer<typeof ExperienceAlignmentSchema>;
export type FormattingScore = z.infer<typeof FormattingScoreSchema>;
export type AIQualityScore = z.infer<typeof AIQualityScoreSchema>;
export type ATSAnalysis = z.infer<typeof ATSAnalysisSchema>;

// ============================================================================
// SCORE WEIGHTS (Configurable)
// ============================================================================

export const ATS_SCORE_WEIGHTS = {
  keywordMatch: 0.30,      // 30% - Most critical for ATS
  skillCoverage: 0.25,     // 25% - Skills are key
  experienceAlignment: 0.20, // 20% - Relevant experience
  formatting: 0.15,        // 15% - ATS parsability
  aiQuality: 0.10,         // 10% - Content quality
} as const;

// Validate weights sum to 1.0
const totalWeight = Object.values(ATS_SCORE_WEIGHTS).reduce((a, b) => a + b, 0);
if (Math.abs(totalWeight - 1.0) > 0.001) {
  throw new Error('ATS score weights must sum to 1.0');
}
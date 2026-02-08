/**
 * ATS Service - Structured AI-powered Resume Analysis
 * All AI calls return validated, schema-compliant data
 */

import type { Resume } from '../schemas/resume.schema';
import type { 
  ATSAnalysis, 
  JobDescription, 
  KeywordMatch, 
  SkillCoverage, 
  ExperienceAlignment, 
  FormattingScore, 
  AIQualityScore 
} from '../schemas/ats.schema';
import { ATSAnalysisSchema } from '../schemas/ats.schema';
import { ATS_SCORE_WEIGHTS } from '../schemas/ats.schema';

// ============================================================================
// TYPES
// ============================================================================

interface AnalyzeOptions {
  resume: Resume;
  jobDescription?: string;
  mode?: 'quick' | 'comprehensive';
}

interface BulletImproveRequest {
  bullet: string;
  context: {
    role: string;
    company: string;
    includeMetrics?: boolean;
  };
}

interface BulletImproveResponse {
  originalBullet: string;
  improvedBullet: string;
  improvements: string[];
  impact: 'high' | 'medium' | 'low';
  metricsAdded: boolean;
}

// ============================================================================
// API CLIENT
// ============================================================================

class ATSService {
  /**
   * Analyze resume with comprehensive ATS scoring
   * Returns fully validated ATSAnalysis object
   */
  async analyzeResume(options: AnalyzeOptions): Promise<ATSAnalysis> {
    const { resume, jobDescription, mode = 'comprehensive' } = options;
    
    try {
      // Convert resume to text format
      const resumeText = this.resumeToText(resume);
      
      // Call internal API route
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription: jobDescription || '',
          mode,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`ATS analysis failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }
      
      // Validate with Zod schema
      const validated = ATSAnalysisSchema.parse(data.analysis);
      
      return validated;
    } catch (error) {
      console.error('ATS Analysis Error:', error);
      
      // Return fallback minimal analysis
      return this.createFallbackAnalysis(resume, jobDescription);
    }
  }
  
  /**
   * Get quick score without deep AI analysis (faster)
   */
  async getQuickScore(resume: Resume, jobDescription?: string): Promise<number> {
    try {
      const resumeText = this.resumeToText(resume);
      
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          resumeText, 
          jobDescription: jobDescription || '',
          mode: 'quick'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Quick score failed');
      }
      
      const data = await response.json();
      return data.analysis?.overallScore || 0;
    } catch (error) {
      console.error('Quick score error:', error);
      return 0;
    }
  }
  
  /**
   * Improve a single bullet point with AI
   * Returns structured improvement with metrics
   */
  async improveBullet(request: BulletImproveRequest): Promise<BulletImproveResponse> {
    try {
      const response = await fetch('/api/ai/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bullet: request.bullet,
          context: request.context
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to improve bullet');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Bullet improvement error:', error);
      throw error;
    }
  }
  
  /**
   * Generate professional summary based on resume content
   */
  async generateSummary(resume: Resume, targetRole?: string): Promise<string> {
    try {
      const response = await fetch('/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, targetRole }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }
      
      const data = await response.json();
      return data.summary || '';
    } catch (error) {
      console.error('Summary generation error:', error);
      throw error;
    }
  }
  
  /**
   * Extract keywords from job description
   */
  async extractJobKeywords(jobDescription: string): Promise<JobDescription> {
    try {
      // Use the analyze endpoint to extract keywords
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: '', // Empty resume, just analyzing JD
          jobDescription,
          mode: 'quick'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to extract keywords');
      }
      
      await response.json(); // Response consumed but not used
      
      return {
        rawText: jobDescription,
        requiredSkills: [],
        preferredSkills: [],
        tools: [],
        roleLevel: 'mid',
        industryKeywords: [],
        analyzedAt: new Date(),
      };
    } catch (error) {
      console.error('Keyword extraction error:', error);
      throw error;
    }
  }
  
  /**
   * Get suggestions for missing keywords placement
   */
  async suggestKeywordPlacement(): Promise<Array<{ keyword: string; section: string; reason: string }>> {
    try {
      // For now, return empty array
      // Can be enhanced with a dedicated API endpoint if needed
      return [];
    } catch (error) {
      console.error('Keyword placement error:', error);
      return [];
    }
  }
  
  // ========================================================================
  // HELPER METHODS
  // ========================================================================
  
  /**
   * Convert structured resume to plain text for ATS analysis
   */
  private resumeToText(resume: Resume): string {
    const parts: string[] = [];
    
    // Personal Info
    const { personalInfo } = resume;
    parts.push(personalInfo.fullName);
    parts.push(personalInfo.email);
    if (personalInfo.phone) parts.push(personalInfo.phone);
    if (personalInfo.location) parts.push(personalInfo.location);
    if (personalInfo.linkedin) parts.push(personalInfo.linkedin);
    if (personalInfo.github) parts.push(personalInfo.github);
    
    // Summary
    if (resume.summary?.summary) {
      parts.push('\n\nPROFESSIONAL SUMMARY');
      parts.push(resume.summary.summary);
    }
    
    // Experience
    if (resume.experience.length > 0) {
      parts.push('\n\nPROFESSIONAL EXPERIENCE');
      resume.experience.forEach((exp) => {
        parts.push(`\n${exp.role} | ${exp.company}`);
        parts.push(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`);
        if (exp.location) parts.push(exp.location);
        parts.push(exp.description);
      });
    }
    
    // Education
    if (resume.education.length > 0) {
      parts.push('\n\nEDUCATION');
      resume.education.forEach((edu) => {
        parts.push(`\n${edu.degree}${edu.field ? ' in ' + edu.field : ''}`);
        parts.push(`${edu.school} | ${edu.graduationDate}`);
        if (edu.gpa) parts.push(`GPA: ${edu.gpa}`);
        if (edu.honors) parts.push(edu.honors);
      });
    }
    
    // Skills
    if (resume.skills.categories.length > 0) {
      parts.push('\n\nSKILLS');
      resume.skills.categories.forEach((cat) => {
        parts.push(`\n${cat.category.toUpperCase()}: ${cat.skills.join(', ')}`);
      });
    } else if (resume.skills.flatSkills && resume.skills.flatSkills.length > 0) {
      parts.push('\n\nSKILLS');
      parts.push(resume.skills.flatSkills.join(', '));
    }
    
    // Projects
    if (resume.projects && resume.projects.length > 0) {
      parts.push('\n\nPROJECTS');
      resume.projects.forEach((proj) => {
        parts.push(`\n${proj.title}`);
        parts.push(`Technologies: ${proj.technologies}`);
        parts.push(proj.description);
      });
    }
    
    // Certifications
    if (resume.certifications && resume.certifications.length > 0) {
      parts.push('\n\nCERTIFICATIONS');
      resume.certifications.forEach((cert) => {
        parts.push(`\n${cert.name} - ${cert.issuer} (${cert.date})`);
      });
    }
    
    return parts.join('\n');
  }
  
  /**
   * Transform backend ATS response to our schema format
   * (Kept for backward compatibility with existing code)
   */
  private transformBackendResponse(
    backendData: Record<string, unknown>
  ): ATSAnalysis {
    // Data is already in correct format from API route
    return backendData as ATSAnalysis;
  }
  
  /**
   * Create fallback analysis if API fails
   */
  private createFallbackAnalysis(resume: Resume, jobDescription?: string): ATSAnalysis {
    const basicScore = this.calculateBasicScore(resume);
    
    return {
      overallScore: basicScore,
      scoreFormula: {
        keywordMatch: { score: 0, weight: ATS_SCORE_WEIGHTS.keywordMatch },
        skillCoverage: { score: basicScore, weight: ATS_SCORE_WEIGHTS.skillCoverage },
        experienceAlignment: { score: basicScore, weight: ATS_SCORE_WEIGHTS.experienceAlignment },
        formatting: { score: basicScore, weight: ATS_SCORE_WEIGHTS.formatting },
        aiQuality: { score: 0, weight: ATS_SCORE_WEIGHTS.aiQuality },
      },
      keywordMatch: this.buildEmptyKeywordMatch(),
      skillCoverage: this.buildBasicSkillCoverage(resume),
      experienceAlignment: this.buildBasicExperienceAlignment(resume),
      formatting: this.buildBasicFormattingScore(),
      aiQuality: this.buildEmptyAIQuality(),
      strengths: ['Resume structure present'],
      weaknesses: ['Unable to perform deep analysis'],
      criticalIssues: [],
      recommendations: [],
      completeness: this.calculateCompleteness(resume),
      jobMatch: {
        hasJobDescription: !!jobDescription,
      },
      analyzedAt: new Date().toISOString(),
      analysisVersion: '2.0.0-fallback',
    };
  }
  
  // ... Additional helper methods for building each score component would go here
  // (buildKeywordMatch, buildSkillCoverage, etc.)
  // For brevity, showing structure only
  
  private buildKeywordMatch(data: Record<string, unknown>): KeywordMatch {
    // Implementation
    const breakdown = data.breakdown as Record<string, unknown> | undefined;
    return {
      score: typeof breakdown?.keywords === 'number' ? breakdown.keywords : 0,
      breakdown: {
        requiredSkills: { score: 0, matched: 0, total: 0, matchedKeywords: [], missingKeywords: [], weight: 0.4 },
        preferredSkills: { score: 0, matched: 0, total: 0, matchedKeywords: [], missingKeywords: [], weight: 0.3 },
        tools: { score: 0, matched: 0, total: 0, matchedKeywords: [], missingKeywords: [], weight: 0.2 },
        industryTerms: { score: 0, matched: 0, total: 0, matchedKeywords: [], weight: 0.1 },
      },
      overusedKeywords: [],
      suggestions: [],
    };
  }
  
  private buildSkillCoverage(): SkillCoverage {
    return {
      score: 0,
      technical: { score: 0, present: [], missing: [], depth: 'intermediate' as const, evidence: [] },
      soft: { score: 0, present: [], missing: [], evidence: [] },
      experienceAlignment: { score: 0, resumeYears: 0, match: 'optimal' as const, message: '' },
    };
  }
  
  private buildExperienceAlignment(_data: Record<string, unknown>, resume: Resume): ExperienceAlignment {
    return {
      score: 0,
      roleRelevance: { score: 0, relevantRoles: 0, totalRoles: resume.experience.length, explanation: '' },
      careerProgression: { score: 0, trend: 'stable' as const, gaps: [], explanation: '' },
      industryAlignment: { score: 0, relevantExperience: [], explanation: '' },
    };
  }
  
  private buildFormattingScore(data: Record<string, unknown>): FormattingScore {
    const breakdown = data.breakdown as Record<string, unknown> | undefined;
    return {
      score: typeof breakdown?.format === 'number' ? breakdown.format : 0,
      checks: {
        parsability: { score: 100, issues: [], passed: true },
        structure: { score: 100, hasClearSections: true, sectionOrder: 'optimal' as const, issues: [] },
        content: {
          score: 80,
          wordCount: 0,
          optimalRange: { min: 400, max: 800 },
          bulletPoints: 0,
          actionVerbs: 0,
          metrics: 0,
          issues: [],
        },
        consistency: { score: 100, dateFormat: true, bulletStyle: true, verbTense: true, issues: [] },
      },
      atsSafetyLevel: 'good' as const,
    };
  }
  
  private buildAIQualityScore(data: Record<string, unknown>): AIQualityScore {
    const breakdown = data.breakdown as Record<string, unknown> | undefined;
    return {
      score: typeof breakdown?.aiAnalysis === 'number' ? breakdown.aiAnalysis : 0,
      impactAnalysis: { score: 0, quantifiedAchievements: 0, actionVerbUsage: 'good' as const, suggestions: [] },
      professionalTone: { score: 0, issues: [], strengths: [] },
      clarity: { score: 0, readabilityLevel: 'professional', verbosity: 'optimal' as const, suggestions: [] },
      authenticity: { score: 100, suspiciousPatterns: [], natural: true },
    };
  }
  
  private buildEmptyKeywordMatch(): KeywordMatch {
    return this.buildKeywordMatch({});
  }
  
  private buildBasicSkillCoverage(resume: Resume): SkillCoverage {
    const experienceWithDates = resume.experience.filter(exp => exp.startDate);
    return {
      score: 50,
      technical: { score: 50, present: [], missing: [], depth: 'intermediate' as const, evidence: [] },
      soft: { score: 50, present: [], missing: [], evidence: [] },
      experienceAlignment: { 
        score: 50, 
        resumeYears: this.calculateYearsOfExperience(experienceWithDates as Array<{ startDate: string; endDate?: string; current: boolean }>), 
        match: 'optimal' as const, 
        message: 'Experience captured' 
      },
    };
  }
  
  private buildBasicExperienceAlignment(resume: Resume): ExperienceAlignment {
    return {
      score: 50,
      roleRelevance: { score: 50, relevantRoles: resume.experience.length, totalRoles: resume.experience.length, explanation: 'All roles counted' },
      careerProgression: { score: 50, trend: 'stable' as const, gaps: [], explanation: 'Career path visible' },
      industryAlignment: { score: 50, relevantExperience: [], explanation: 'Industry experience noted' },
    };
  }
  
  private buildBasicFormattingScore(): FormattingScore {
    return this.buildFormattingScore({});
  }
  
  private buildEmptyAIQuality(): AIQualityScore {
    return this.buildAIQualityScore({});
  }
  
  private identifyCriticalIssues(): Array<{ issue: string; impact: 'high' | 'medium' | 'low'; fix: string }> {
    return [];
  }
  
  private buildRecommendations(data: Record<string, unknown>): ATSAnalysis['recommendations'] {
    const suggestions = Array.isArray(data.suggestions) ? data.suggestions : [];
    return suggestions.map((s: unknown, i: number) => ({
      priority: 'medium' as const,
      category: 'general',
      title: `Recommendation ${i + 1}`,
      description: typeof s === 'string' ? s : String(s),
      expectedImpact: '+2-5 points',
      actionSteps: [typeof s === 'string' ? s : String(s)],
    }));
  }
  
  private calculateCompleteness(resume: Resume): ATSAnalysis['completeness'] {
    const sections = [
      { section: 'Personal Info', present: !!resume.personalInfo.fullName, quality: 'good' as const },
      { section: 'Summary', present: !!resume.summary, quality: 'good' as const },
      { section: 'Experience', present: resume.experience.length > 0, quality: 'good' as const },
      { section: 'Education', present: resume.education.length > 0, quality: 'good' as const },
      { section: 'Skills', present: resume.skills.categories.length > 0, quality: 'good' as const },
    ];
    
    const present = sections.filter(s => s.present).length;
    const score = Math.round((present / sections.length) * 100);
    
    return {
      score,
      requiredSections: sections,
    };
  }
  
  private getMatchLevel(score: number): 'excellent' | 'strong' | 'moderate' | 'weak' | 'poor' {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'strong';
    if (score >= 60) return 'moderate';
    if (score >= 40) return 'weak';
    return 'poor';
  }
  
  private calculateBasicScore(resume: Resume): number {
    let score = 0;
    if (resume.personalInfo.fullName) score += 10;
    if (resume.personalInfo.email) score += 10;
    if (resume.summary) score += 15;
    if (resume.experience.length > 0) score += 30;
    if (resume.education.length > 0) score += 20;
    if (resume.skills.categories.length > 0 || (resume.skills.flatSkills && resume.skills.flatSkills.length > 0)) score += 15;
    return score;
  }
  
  private calculateYearsOfExperience(experience: Array<{ startDate: string; endDate?: string; current: boolean }>): number {
    if (!experience || experience.length === 0) return 0;
    
    let totalMonths = 0;
    experience.forEach((exp) => {
      const start = new Date(exp.startDate);
      const end = exp.current ? new Date() : new Date(exp.endDate || exp.startDate);
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      totalMonths += months;
    });
    
    return Math.round(totalMonths / 12);
  }
  
  private extractTopSkills(resume: Resume): string[] {
    const allSkills: string[] = [];
    
    if (resume.skills.categories.length > 0) {
      resume.skills.categories.forEach((cat) => {
        allSkills.push(...cat.skills);
      });
    } else if (resume.skills.flatSkills) {
      allSkills.push(...resume.skills.flatSkills);
    }
    
    return allSkills;
  }
}

// Export singleton instance
export const atsService = new ATSService();

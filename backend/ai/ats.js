const { GoogleGenerativeAI } = require('@google/generative-ai');

class ATSScorer {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Common ATS keywords by category
    this.keywordCategories = {
      technical: [
        'javascript', 'python', 'java', 'c++', 'typescript', 'react', 'angular', 'vue',
        'node.js', 'express', 'django', 'flask', 'spring', 'sql', 'mongodb', 'postgresql',
        'mysql', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'jenkins',
        'git', 'agile', 'scrum', 'rest', 'api', 'microservices', 'terraform', 'linux'
      ],
      soft: [
        'leadership', 'communication', 'teamwork', 'problem-solving', 'analytical',
        'critical thinking', 'time management', 'adaptability', 'collaboration',
        'presentation', 'mentoring', 'project management', 'stakeholder management'
      ],
      action: [
        'developed', 'created', 'implemented', 'designed', 'built', 'managed', 'led',
        'improved', 'optimized', 'reduced', 'increased', 'achieved', 'delivered',
        'coordinated', 'established', 'launched', 'maintained', 'resolved', 'analyzed'
      ],
      education: [
        'bachelor', 'master', 'phd', 'degree', 'university', 'college', 'certification',
        'certified', 'graduate', 'diploma', 'computer science', 'engineering', 'mba'
      ],
      experience: [
        'years of experience', 'senior', 'junior', 'mid-level', 'lead', 'architect',
        'engineer', 'developer', 'manager', 'director', 'specialist', 'analyst'
      ]
    };
  }

  /**
   * Analyze resume against job description
   * @param {string} resumeText - The resume content
   * @param {string} jobDescription - The job posting text
   * @returns {Promise<Object>} ATS score and analysis
   */
  async analyzeResume(resumeText, jobDescription = '') {
    try {
      // Step 1: Keyword Matching Score
      const keywordScore = this.calculateKeywordScore(resumeText, jobDescription);
      
      // Step 2: Format and Structure Analysis
      const formatScore = this.analyzeFormat(resumeText);
      
      // Step 3: AI-powered deep analysis
      const aiAnalysis = await this.performAIAnalysis(resumeText, jobDescription);
      
      // Step 4: Calculate overall score
      const overallScore = this.calculateOverallScore(keywordScore, formatScore, aiAnalysis);
      
      // Step 5: Generate suggestions
      const suggestions = this.generateSuggestions(keywordScore, formatScore, aiAnalysis);
      
      return {
        score: overallScore,
        breakdown: {
          keywords: keywordScore.score,
          format: formatScore.score,
          aiAnalysis: aiAnalysis.score
        },
        strengths: this.identifyStrengths(keywordScore, formatScore, aiAnalysis),
        weaknesses: this.identifyWeaknesses(keywordScore, formatScore, aiAnalysis),
        suggestions: suggestions,
        missingKeywords: keywordScore.missing,
        matchedKeywords: keywordScore.matched,
        detailedAnalysis: aiAnalysis.analysis
      };
    } catch (error) {
      console.error('ATS Analysis Error:', error);
      throw new Error('Failed to analyze resume');
    }
  }

  /**
   * Calculate keyword matching score
   */
  calculateKeywordScore(resumeText, jobDescription) {
    const resumeLower = resumeText.toLowerCase();
    const jobLower = jobDescription.toLowerCase();
    
    let totalMatches = 0;
    let totalKeywords = 0;
    let matched = [];
    let missing = [];
    
    // Extract keywords from job description if provided
    let jobKeywords = [];
    if (jobDescription) {
      jobKeywords = this.extractJobKeywords(jobLower);
    }
    
    // Check each category
    const categoryScores = {};
    
    for (const [category, keywords] of Object.entries(this.keywordCategories)) {
      let categoryMatches = 0;
      let categoryTotal = keywords.length;
      
      keywords.forEach(keyword => {
        const isInResume = resumeLower.includes(keyword.toLowerCase());
        const isInJob = jobDescription ? jobLower.includes(keyword.toLowerCase()) : true;
        
        if (isInResume && isInJob) {
          categoryMatches++;
          matched.push({ keyword, category });
        } else if (isInJob && !isInResume) {
          missing.push({ keyword, category });
        }
        
        if (isInJob) {
          totalKeywords++;
        }
      });
      
      categoryScores[category] = {
        score: categoryTotal > 0 ? (categoryMatches / categoryTotal) * 100 : 0,
        matches: categoryMatches,
        total: categoryTotal
      };
      
      totalMatches += categoryMatches;
    }
    
    // Check job-specific keywords
    if (jobKeywords.length > 0) {
      jobKeywords.forEach(keyword => {
        if (!resumeLower.includes(keyword)) {
          missing.push({ keyword, category: 'job-specific' });
        }
      });
    }
    
    const score = totalKeywords > 0 ? (totalMatches / totalKeywords) * 100 : 50;
    
    return {
      score: Math.round(score),
      categoryScores,
      matched: matched.slice(0, 20), // Top 20 matches
      missing: missing.slice(0, 15), // Top 15 missing
      totalMatches,
      totalKeywords
    };
  }

  /**
   * Extract important keywords from job description
   */
  extractJobKeywords(jobDescription) {
    // Simple extraction - can be enhanced with NLP
    const words = jobDescription.match(/\b[a-z]{3,}\b/gi) || [];
    const frequency = {};
    
    words.forEach(word => {
      const lower = word.toLowerCase();
      if (!this.isCommonWord(lower)) {
        frequency[lower] = (frequency[lower] || 0) + 1;
      }
    });
    
    // Return words that appear multiple times
    return Object.keys(frequency)
      .filter(word => frequency[word] >= 2)
      .slice(0, 20);
  }

  /**
   * Check if word is too common
   */
  isCommonWord(word) {
    const commonWords = ['the', 'and', 'for', 'with', 'you', 'will', 'our', 'are', 
                         'this', 'that', 'from', 'have', 'has', 'been', 'were', 
                         'was', 'but', 'not', 'can', 'all', 'your', 'more'];
    return commonWords.includes(word);
  }

  /**
   * Analyze resume format and structure
   */
  analyzeFormat(resumeText) {
    let score = 0;
    const issues = [];
    const positives = [];
    
    // Check length (ideal: 400-1000 words)
    const wordCount = resumeText.split(/\s+/).length;
    if (wordCount >= 400 && wordCount <= 1000) {
      score += 20;
      positives.push('Appropriate resume length');
    } else if (wordCount < 400) {
      issues.push('Resume is too short. Add more details about your experience.');
    } else {
      issues.push('Resume is too long. Consider condensing to 1-2 pages.');
    }
    
    // Check for contact information
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
    const hasPhone = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
    
    if (hasEmail && hasPhone) {
      score += 15;
      positives.push('Contact information is present');
    } else {
      issues.push('Missing contact information (email/phone)');
    }
    
    // Check for section headers
    const hasSections = /experience|education|skills|projects/i.test(resumeText);
    if (hasSections) {
      score += 15;
      positives.push('Clear section organization');
    } else {
      issues.push('Missing clear section headers');
    }
    
    // Check for quantifiable achievements
    const hasNumbers = /\d+[%$]|increased|reduced|improved|saved|\d+ years/.test(resumeText);
    if (hasNumbers) {
      score += 20;
      positives.push('Contains quantifiable achievements');
    } else {
      issues.push('Add quantifiable achievements (e.g., "Increased performance by 40%")');
    }
    
    // Check for action verbs
    const actionVerbCount = this.keywordCategories.action.filter(verb => 
      resumeText.toLowerCase().includes(verb)
    ).length;
    
    if (actionVerbCount >= 5) {
      score += 15;
      positives.push('Uses strong action verbs');
    } else {
      issues.push('Use more action verbs (developed, implemented, led, etc.)');
    }
    
    // Check for special characters that might confuse ATS
    const hasSpecialChars = /[<>{}[\]|\\#@*&^~`]/.test(resumeText);
    if (!hasSpecialChars) {
      score += 15;
      positives.push('ATS-friendly formatting (no special characters)');
    } else {
      issues.push('Avoid special characters that might confuse ATS systems');
    }
    
    return {
      score: Math.min(score, 100),
      issues,
      positives,
      wordCount
    };
  }

  /**
   * Perform AI-powered analysis using Gemini
   */
  async performAIAnalysis(resumeText, jobDescription) {
    try {
      const prompt = jobDescription 
        ? `You are an expert ATS (Applicant Tracking System) analyzer and career coach. Analyze the following resume against the job description.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

Provide a detailed analysis in JSON format with the following structure:
{
  "score": <number 0-100>,
  "matchStrength": "<strong/moderate/weak>",
  "keyStrengths": [<array of 3-5 key strengths>],
  "keyWeaknesses": [<array of 3-5 key weaknesses>],
  "skillsGap": [<array of missing skills for the job>],
  "recommendations": [<array of 5-7 specific improvement suggestions>],
  "roleAlignment": "<explanation of how well candidate fits the role>",
  "experienceLevel": "<junior/mid/senior> and explanation"
}

Be specific, actionable, and honest in your assessment.`
        : `You are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume for overall quality and ATS compatibility.

RESUME:
${resumeText}

Provide a detailed analysis in JSON format with the following structure:
{
  "score": <number 0-100>,
  "keyStrengths": [<array of 3-5 key strengths>],
  "keyWeaknesses": [<array of 3-5 key weaknesses>],
  "recommendations": [<array of 5-7 specific improvement suggestions>],
  "careerLevel": "<assessment of career level and experience>",
  "industryFocus": "<primary industry or domain focus>"
}

Be specific, actionable, and honest in your assessment.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]);
        return {
          score: analysis.score || 50,
          analysis
        };
      }
      
      // Fallback if JSON parsing fails
      return {
        score: 50,
        analysis: {
          keyStrengths: ['Unable to parse AI analysis'],
          keyWeaknesses: [],
          recommendations: ['Please try again']
        }
      };
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return {
        score: 50,
        analysis: {
          keyStrengths: ['Analysis pending'],
          keyWeaknesses: [],
          recommendations: ['AI analysis temporarily unavailable']
        }
      };
    }
  }

  /**
   * Calculate overall ATS score
   */
  calculateOverallScore(keywordScore, formatScore, aiAnalysis) {
    // Weighted average: Keywords 40%, Format 30%, AI Analysis 30%
    const overall = (
      keywordScore.score * 0.4 +
      formatScore.score * 0.3 +
      aiAnalysis.score * 0.3
    );
    
    return Math.round(overall);
  }

  /**
   * Identify strengths
   */
  identifyStrengths(keywordScore, formatScore, aiAnalysis) {
    const strengths = [];
    
    if (keywordScore.score >= 70) {
      strengths.push('Strong keyword optimization');
    }
    
    if (formatScore.score >= 70) {
      strengths.push('ATS-friendly formatting');
    }
    
    if (formatScore.positives) {
      strengths.push(...formatScore.positives);
    }
    
    if (aiAnalysis.analysis.keyStrengths) {
      strengths.push(...aiAnalysis.analysis.keyStrengths);
    }
    
    return strengths.slice(0, 8); // Top 8 strengths
  }

  /**
   * Identify weaknesses
   */
  identifyWeaknesses(keywordScore, formatScore, aiAnalysis) {
    const weaknesses = [];
    
    if (keywordScore.score < 50) {
      weaknesses.push('Low keyword match - add relevant technical skills');
    }
    
    if (formatScore.score < 50) {
      weaknesses.push('Format needs improvement for ATS compatibility');
    }
    
    if (formatScore.issues) {
      weaknesses.push(...formatScore.issues);
    }
    
    if (aiAnalysis.analysis.keyWeaknesses) {
      weaknesses.push(...aiAnalysis.analysis.keyWeaknesses);
    }
    
    return weaknesses.slice(0, 8); // Top 8 weaknesses
  }

  /**
   * Generate actionable suggestions
   */
  generateSuggestions(keywordScore, formatScore, aiAnalysis) {
    const suggestions = [];
    
    // Keyword suggestions
    if (keywordScore.missing.length > 0) {
      const topMissing = keywordScore.missing.slice(0, 5).map(m => m.keyword).join(', ');
      suggestions.push({
        category: 'Keywords',
        priority: 'high',
        suggestion: `Add these important keywords: ${topMissing}`
      });
    }
    
    // Format suggestions
    if (formatScore.issues.length > 0) {
      formatScore.issues.forEach(issue => {
        suggestions.push({
          category: 'Format',
          priority: 'medium',
          suggestion: issue
        });
      });
    }
    
    // AI recommendations
    if (aiAnalysis.analysis.recommendations) {
      aiAnalysis.analysis.recommendations.forEach(rec => {
        suggestions.push({
          category: 'AI Insight',
          priority: 'high',
          suggestion: rec
        });
      });
    }
    
    // Skills gap
    if (aiAnalysis.analysis.skillsGap && aiAnalysis.analysis.skillsGap.length > 0) {
      suggestions.push({
        category: 'Skills Gap',
        priority: 'high',
        suggestion: `Consider adding these skills: ${aiAnalysis.analysis.skillsGap.join(', ')}`
      });
    }
    
    return suggestions;
  }

  /**
   * Quick score (without AI analysis for faster results)
   */
  quickScore(resumeText, jobDescription = '') {
    const keywordScore = this.calculateKeywordScore(resumeText, jobDescription);
    const formatScore = this.analyzeFormat(resumeText);
    
    const overall = Math.round((keywordScore.score * 0.6 + formatScore.score * 0.4));
    
    return {
      score: overall,
      breakdown: {
        keywords: keywordScore.score,
        format: formatScore.score
      },
      missingKeywords: keywordScore.missing.slice(0, 10),
      formatIssues: formatScore.issues
    };
  }

  /**
   * Compare resume against multiple job descriptions
   */
  async batchAnalyze(resumeText, jobDescriptions) {
    const results = [];
    
    for (const job of jobDescriptions) {
      const analysis = await this.analyzeResume(resumeText, job.description);
      results.push({
        jobTitle: job.title,
        company: job.company,
        score: analysis.score,
        matchStrength: analysis.score >= 75 ? 'strong' : analysis.score >= 50 ? 'moderate' : 'weak',
        topSuggestions: analysis.suggestions.slice(0, 3)
      });
    }
    
    return results.sort((a, b) => b.score - a.score);
  }
}

module.exports = ATSScorer;

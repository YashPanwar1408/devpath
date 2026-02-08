export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    website?: string;
    location?: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    role: string;
    location?: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string; // Bullet points
  }>;
  projects?: Array<{
    id: string;
    title: string;
    link?: string;
    technologies: string;
    startDate?: string;
    endDate?: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    location?: string;
    gpa?: string;
    graduationDate: string;
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
  achievements?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  skills: string[];
  languages?: string[];
}

export interface ATSAnalysis {
  score: number;
  breakdown: {
    keywords: number;
    format: number;
    aiAnalysis: number;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingKeywords: Array<{ keyword: string; category: string }>;
  matchedKeywords: Array<{ keyword: string; category: string }>;
  detailedAnalysis: {
    score: number;
    matchStrength?: string;
    keyStrengths?: string[];
    keyWeaknesses?: string[];
    skillsGap?: string[];
    recommendations?: string[];
    roleAlignment?: string;
    experienceLevel?: string;
    careerLevel?: string;
    industryFocus?: string;
  };
}

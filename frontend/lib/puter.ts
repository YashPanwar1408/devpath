import { ResumeData, ATSAnalysis } from '@/app/types/resume';

/**
 * AI Integration for Resume Analysis
 * Uses ATSScorer backend with Google Gemini AI
 */

/**
 * Convert structured resume data to plain text for ATS analysis
 */
function resumeToText(resume: ResumeData): string {
  const parts: string[] = [];

  // Personal Info
  const { personalInfo, experience, education, skills } = resume;
  if (personalInfo.fullName) parts.push(personalInfo.fullName);
  if (personalInfo.email) parts.push(personalInfo.email);
  if (personalInfo.phone) parts.push(personalInfo.phone);
  if (personalInfo.linkedin) parts.push(personalInfo.linkedin);
  if (personalInfo.website) parts.push(personalInfo.website);
  if (personalInfo.summary) parts.push(`\nSUMMARY\n${personalInfo.summary}`);

  // Experience
  if (experience && experience.length > 0) {
    parts.push('\n\nEXPERIENCE');
    experience.forEach(exp => {
      parts.push(`\n${exp.role} at ${exp.company}`);
      parts.push(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`);
      if (exp.description) parts.push(exp.description);
    });
  }

  // Education
  if (education && education.length > 0) {
    parts.push('\n\nEDUCATION');
    education.forEach(edu => {
      parts.push(`\n${edu.degree}`);
      parts.push(`${edu.school} - ${edu.graduationDate}`);
    });
  }

  // Skills
  if (skills && skills.length > 0) {
    parts.push(`\n\nSKILLS\n${skills.join(', ')}`);
  }

  return parts.join('\n');
}

/**
 * Analyze resume using ATSScorer engine
 * @param resumeData - The structured resume data
 * @param jobDescription - Optional job description to compare against
 * @returns ATS analysis results with detailed breakdown
 */
export async function analyzeResume(
  resumeData: ResumeData,
  jobDescription?: string
): Promise<ATSAnalysis> {
  try {
    // Convert structured resume to text
    const resumeText = resumeToText(resumeData);

    // Call the ATSScorer API
    const response = await fetch('/api/ats/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText,
        jobDescription: jobDescription || ''
      }),
    });

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.analysis as ATSAnalysis;
  } catch (error) {
    console.error('Error analyzing resume with ATSScorer:', error);
    throw new Error('Failed to analyze resume. Please try again.');
  }
}

/**
 * Parse resume text using Puter.ai
 * @param text - Raw text extracted from PDF
 * @returns Structured resume data
 */
export async function parseResumeWithAI(text: string): Promise<ResumeData> {
  try {
    const systemPrompt = `You are an expert resume parser. Extract structured information from resume text and return ONLY valid JSON (no markdown, no code blocks) in this exact format:
{
  "personalInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "linkedin": "linkedin.com/in/johndoe",
    "website": "johndoe.com",
    "summary": "Professional summary text"
  },
  "experience": [
    {
      "id": "exp1",
      "company": "Company Name",
      "role": "Job Title",
      "startDate": "2020-01",
      "endDate": "2023-12",
      "current": false,
      "description": "• Achievement 1\\n• Achievement 2\\n• Achievement 3"
    }
  ],
  "education": [
    {
      "id": "edu1",
      "school": "University Name",
      "degree": "Bachelor of Science in Computer Science",
      "graduationDate": "2020-05"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js", "Python"]
}

Extract all information accurately. Use bullet points (•) for experience descriptions. Generate unique IDs for each entry.`;

    const userPrompt = `Parse this resume:\n\n${text}`;

    const response = await fetch('/api/parse-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        systemPrompt,
        userPrompt
      }),
    });

    if (!response.ok) {
      throw new Error(`Parsing failed: ${response.statusText}`);
    }

    const parsedResume: ResumeData = await response.json();
    return parsedResume;
  } catch (error) {
    console.error('Error parsing resume with AI:', error);
    throw new Error('Failed to parse resume. Please try again.');
  }
}

/**
 * Generate resume improvement suggestions
 * @param resumeData - The current resume data
 * @returns Specific improvement suggestions
 */
export async function getImprovementSuggestions(
  resumeData: ResumeData
): Promise<string[]> {
  try {
    const response = await analyzeResume(resumeData);
    return response.suggestions || [];
  } catch (error) {
    console.error('Error getting improvement suggestions:', error);
    return [];
  }
}

const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

/**
 * Extract text from uploaded PDF
 * POST /api/extract-pdf-text
 */
router.post('/extract-pdf-text', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse PDF
    const data = await pdfParse(req.file.buffer);
    const text = data.text;

    res.json({ text });
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    res.status(500).json({ error: 'Failed to extract text from PDF' });
  }
});

/**
 * Parse resume text using AI
 * POST /api/parse-resume
 */
router.post('/parse-resume', async (req, res) => {
  try {
    const { text, systemPrompt, userPrompt } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    // Use provided prompts or defaults
    const finalSystemPrompt = systemPrompt || `You are an expert resume parser. Extract structured information from the provided resume text and return ONLY valid JSON matching this exact structure:
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "linkedin": "string (optional)",
    "website": "string (optional)",
    "summary": "string"
  },
  "experience": [
    {
      "id": "unique_id",
      "company": "string",
      "role": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or empty if current",
      "current": boolean,
      "description": "bullet points separated by newlines"
    }
  ],
  "education": [
    {
      "id": "unique_id",
      "school": "string",
      "degree": "string",
      "graduationDate": "YYYY-MM"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"]
}

Extract all information accurately. Do not wrap the response in markdown code blocks.`;

    const finalUserPrompt = userPrompt || `Parse this resume:\n\n${text}`;

    try {
      const aiResponse = await callAIService(finalSystemPrompt, finalUserPrompt);
      
      // Clean and parse the response
      let cleanResponse = aiResponse.trim();
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/```\n?/g, '');
      }
      
      const parsedResume = JSON.parse(cleanResponse);
      res.json(parsedResume);
    } catch (aiError) {
      console.error('AI parsing error:', aiError);
      
      // Return empty structure if AI fails
      res.json({
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          summary: ''
        },
        experience: [],
        education: [],
        skills: []
      });
    }
  } catch (error) {
    console.error('Error parsing resume:', error);
    res.status(500).json({ error: 'Failed to parse resume' });
  }
});

/**
 * Analyze resume for ATS compatibility
 * POST /api/analyze-resume
 */
router.post('/analyze-resume', async (req, res) => {
  try {
    const { resume, jobDescription, systemPrompt, userPrompt } = req.body;

    if (!resume) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    // Use provided prompts or construct default ones
    const finalSystemPrompt = systemPrompt || `You are an expert ATS (Applicant Tracking System) analyzer. Analyze the provided resume JSON and calculate:
1. A score from 0-100 based on completeness, impact language, and formatting
2. List exactly 3-5 critical missing keywords ${jobDescription ? 'relevant to the job description' : 'for a generic tech role'}
3. Provide 3-5 specific actionable improvements
4. Give an overall summary of strengths and weaknesses

Return ONLY valid JSON matching this structure:
{
  "score": number (0-100),
  "missingKeywords": ["keyword1", "keyword2", "keyword3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "summaryFeedback": "string with overall assessment"
}

Do not wrap the response in markdown code blocks.`;

    const finalUserPrompt = userPrompt || `Analyze this resume:\n\n${JSON.stringify(resume, null, 2)}\n\n${
      jobDescription ? `Job Description:\n${jobDescription}` : 'Use generic software engineering role as reference.'
    }`;

    // Call AI service (Groq, OpenAI, or other provider)
    let analysis;
    
    try {
      const aiResponse = await callAIService(finalSystemPrompt, finalUserPrompt);
      
      // Try to parse the AI response
      // Remove markdown code blocks if present
      let cleanResponse = aiResponse.trim();
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/```\n?/g, '');
      }
      
      analysis = JSON.parse(cleanResponse);
      
      // Validate the response structure
      if (typeof analysis.score !== 'number' || 
          !Array.isArray(analysis.missingKeywords) || 
          !Array.isArray(analysis.improvements)) {
        throw new Error('Invalid AI response structure');
      }
    } catch (aiError) {
      console.error('AI service error:', aiError);
      
      // Fallback to rule-based analysis
      analysis = performRuleBasedAnalysis(resume, jobDescription);
    }

    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

/**
 * Helper function to call AI service (using Google Gemini or fallback)
 */
async function callAIService(systemPrompt, userPrompt) {
  try {
    // Check if Gemini API key is available
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not found, using rule-based analysis');
      throw new Error('AI API key not configured');
    }

    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Combine system and user prompts
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('AI service error:', error);
    throw error;
  }
}

/**
 * Rule-based analysis fallback when AI is unavailable
 */
function performRuleBasedAnalysis(resume, jobDescription) {
  let score = 0;
  const missingKeywords = [];
  const improvements = [];

  // Check contact information (10 points)
  if (resume.personalInfo?.fullName) score += 3;
  if (resume.personalInfo?.email) score += 3;
  if (resume.personalInfo?.phone) score += 2;
  if (resume.personalInfo?.linkedin || resume.personalInfo?.website) score += 2;

  // Check professional summary (15 points)
  const summaryLength = resume.personalInfo?.summary?.length || 0;
  if (summaryLength > 200) score += 15;
  else if (summaryLength > 100) score += 10;
  else if (summaryLength > 50) score += 5;
  else if (summaryLength === 0) {
    improvements.push('Add a professional summary highlighting your key achievements and skills');
  }

  // Check experience (30 points)
  const experienceCount = resume.experience?.length || 0;
  if (experienceCount >= 3) score += 15;
  else if (experienceCount >= 2) score += 10;
  else if (experienceCount >= 1) score += 5;
  
  if (experienceCount === 0) {
    improvements.push('Add work experience with quantifiable achievements');
  } else {
    let hasMetrics = false;
    resume.experience?.forEach(exp => {
      if (/\d+%|\d+x|\$\d+|increased|improved|reduced|grew/i.test(exp.description)) {
        hasMetrics = true;
        score += 10;
      }
    });
    if (!hasMetrics) {
      improvements.push('Add quantifiable metrics to your experience (e.g., "Improved performance by 40%")');
    }
    score += 5; // Base points for having descriptions
  }

  // Check skills (20 points)
  const skillsCount = resume.skills?.length || 0;
  if (skillsCount >= 10) score += 20;
  else if (skillsCount >= 6) score += 15;
  else if (skillsCount >= 3) score += 10;
  else if (skillsCount >= 1) score += 5;
  else {
    improvements.push('Add a comprehensive skills section with relevant technical and soft skills');
  }

  // Check education (15 points)
  const educationCount = resume.education?.length || 0;
  if (educationCount >= 1) score += 15;
  else {
    improvements.push('Add your education background');
  }

  // Formatting (10 points) - Always give base points
  score += 10;

  // Common missing keywords for tech roles
  const commonKeywords = ['agile', 'ci/cd', 'cloud', 'aws', 'docker', 'kubernetes', 'git', 'api', 'microservices'];
  const resumeText = JSON.stringify(resume).toLowerCase();
  
  commonKeywords.forEach(keyword => {
    if (!resumeText.includes(keyword.toLowerCase())) {
      if (missingKeywords.length < 5) {
        missingKeywords.push(keyword);
      }
    }
  });

  // If no improvements were found, add generic ones
  if (improvements.length === 0) {
    improvements.push('Use stronger action verbs to start your bullet points');
    improvements.push('Tailor your resume to match the specific job requirements');
    improvements.push('Keep formatting consistent throughout the document');
  }

  // Ensure we have at least 3 improvements
  if (improvements.length < 3) {
    const genericImprovements = [
      'Use the STAR method (Situation, Task, Action, Result) for experience descriptions',
      'Include relevant certifications or professional development',
      'Optimize your resume with industry-specific keywords'
    ];
    genericImprovements.forEach(imp => {
      if (improvements.length < 3) {
        improvements.push(imp);
      }
    });
  }

  let summaryFeedback = '';
  if (score >= 80) {
    summaryFeedback = 'Excellent resume! It demonstrates strong experience with quantifiable achievements. Minor enhancements could further improve ATS compatibility.';
  } else if (score >= 60) {
    summaryFeedback = 'Good foundation with solid experience. Adding more quantifiable metrics and relevant keywords will significantly improve ATS performance.';
  } else if (score >= 40) {
    summaryFeedback = 'Your resume shows potential but needs more detail. Focus on adding measurable achievements, relevant skills, and a compelling professional summary.';
  } else {
    summaryFeedback = 'This resume needs significant improvement. Add comprehensive work experience with quantifiable results, relevant skills, and ensure all contact information is complete.';
  }

  return {
    score: Math.min(score, 100),
    missingKeywords: missingKeywords.slice(0, 5),
    improvements: improvements.slice(0, 5),
    summaryFeedback
  };
}

module.exports = router;

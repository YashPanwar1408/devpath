const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIInterviewer {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not found in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateQuestion(topic, difficulty, previousQuestions = []) {
    try {
      const prompt = `You are a technical interviewer. Generate a ${difficulty} level interview question about ${topic}.
      
Previous questions asked: ${previousQuestions.join(', ') || 'None'}

Generate a NEW question (different from previous ones) that includes:
1. The question itself
2. What skills it tests
3. Expected key points in the answer

Format your response as JSON:
{
  "question": "the interview question",
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "skillsTested": ["skill1", "skill2"],
  "keyPoints": ["point1", "point2", "point3"]
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback if JSON parsing fails
      return {
        question: text,
        topic,
        difficulty,
        skillsTested: [topic],
        keyPoints: []
      };

    } catch (error) {
      console.error('Error generating question:', error);
      throw new Error('Failed to generate interview question');
    }
  }

  async evaluateAnswer(question, answer, expectedKeyPoints = []) {
    try {
      const prompt = `You are an expert technical interviewer evaluating a candidate's answer.

Interview Question: ${question}

Expected Key Points: ${expectedKeyPoints.join(', ')}

Candidate's Answer: ${answer}

Evaluate this answer and provide:
1. A score out of 10
2. Detailed feedback on what was good
3. What was missing or could be improved
4. Suggestions for improvement
5. Overall assessment

Format your response as JSON:
{
  "score": 8,
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "detailedFeedback": "detailed analysis of the answer",
  "overallAssessment": "Brief summary"
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback response
      return {
        score: 5,
        strengths: ['Provided an answer'],
        weaknesses: ['Could provide more details'],
        suggestions: ['Expand on key concepts'],
        detailedFeedback: text,
        overallAssessment: 'Needs improvement'
      };

    } catch (error) {
      console.error('Error evaluating answer:', error);
      throw new Error('Failed to evaluate answer');
    }
  }

  async conductInterview(topic, difficulty, numberOfQuestions = 5) {
    try {
      const questions = [];
      const previousQuestions = [];

      for (let i = 0; i < numberOfQuestions; i++) {
        const question = await this.generateQuestion(
          topic,
          difficulty,
          previousQuestions
        );
        questions.push(question);
        previousQuestions.push(question.question);
      }

      return {
        success: true,
        interviewId: Date.now().toString(),
        topic,
        difficulty,
        questions,
        totalQuestions: numberOfQuestions
      };

    } catch (error) {
      console.error('Error conducting interview:', error);
      throw new Error('Failed to conduct interview');
    }
  }

  async provideFeedbackOnCode(code, language, problemDescription) {
    try {
      const prompt = `You are a senior software engineer reviewing code.

Problem: ${problemDescription}

Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Provide comprehensive feedback including:
1. Code quality assessment (1-10)
2. Time complexity
3. Space complexity
4. Strengths of the solution
5. Areas for improvement
6. Best practices suggestions
7. Alternative approaches

Format as JSON:
{
  "qualityScore": 8,
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "bestPractices": ["practice1", "practice2"],
  "alternativeApproaches": ["approach1"],
  "overallFeedback": "detailed feedback"
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return {
        qualityScore: 7,
        timeComplexity: 'Not analyzed',
        spaceComplexity: 'Not analyzed',
        strengths: [],
        improvements: [],
        bestPractices: [],
        alternativeApproaches: [],
        overallFeedback: text
      };

    } catch (error) {
      console.error('Error providing code feedback:', error);
      throw new Error('Failed to provide code feedback');
    }
  }

  async generateFollowUpQuestion(originalQuestion, previousAnswer) {
    try {
      const prompt = `Based on this interview question and answer, generate a relevant follow-up question to dive deeper.

Original Question: ${originalQuestion}

Candidate's Answer: ${previousAnswer}

Generate a follow-up question that:
1. Builds on their answer
2. Tests deeper understanding
3. Is relevant to their response

Format as JSON:
{
  "followUpQuestion": "the question",
  "reasoning": "why this follow-up is relevant",
  "expectedDepth": "what this tests"
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return {
        followUpQuestion: text,
        reasoning: 'To test deeper understanding',
        expectedDepth: 'Advanced concepts'
      };

    } catch (error) {
      console.error('Error generating follow-up:', error);
      throw new Error('Failed to generate follow-up question');
    }
  }

  async generateInterviewReport(interviewSession) {
    try {
      const { questions, answers, evaluations } = interviewSession;

      const prompt = `Generate a comprehensive interview report.

Questions and Answers:
${questions.map((q, i) => `
Q${i + 1}: ${q.question}
A${i + 1}: ${answers[i] || 'No answer'}
Score: ${evaluations[i]?.score || 0}/10
`).join('\n')}

Create a professional report including:
1. Overall performance score
2. Strengths demonstrated
3. Areas needing improvement
4. Skill assessment by category
5. Recommendation (Strong Hire / Hire / Maybe / No Hire)
6. Next steps for improvement

Format as JSON:
{
  "overallScore": 75,
  "recommendation": "Hire",
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "skillAssessment": {
    "technical": 8,
    "problemSolving": 7,
    "communication": 9
  },
  "detailedReport": "comprehensive analysis",
  "nextSteps": ["step1", "step2"]
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return {
        overallScore: 70,
        recommendation: 'Maybe',
        strengths: [],
        improvements: [],
        skillAssessment: {},
        detailedReport: text,
        nextSteps: []
      };

    } catch (error) {
      console.error('Error generating report:', error);
      throw new Error('Failed to generate interview report');
    }
  }
}

module.exports = new AIInterviewer();

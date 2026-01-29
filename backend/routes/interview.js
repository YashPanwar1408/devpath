const express = require('express');
const router = express.Router();
const aiInterviewer = require('../ai/interviewer');

// Store active interview sessions (in production, use a database)
const interviewSessions = new Map();

// Start a new interview session
router.post('/start', async (req, res) => {
  try {
    const { topic, difficulty, numberOfQuestions } = req.body;

    if (!topic || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Topic and difficulty are required'
      });
    }

    const interview = await aiInterviewer.conductInterview(
      topic,
      difficulty,
      numberOfQuestions || 5
    );

    // Store session
    interviewSessions.set(interview.interviewId, {
      ...interview,
      answers: [],
      evaluations: [],
      startedAt: new Date(),
      currentQuestionIndex: 0
    });

    res.json({
      success: true,
      interviewId: interview.interviewId,
      topic: interview.topic,
      difficulty: interview.difficulty,
      totalQuestions: interview.totalQuestions,
      firstQuestion: interview.questions[0]
    });

  } catch (error) {
    console.error('Start interview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start interview',
      error: error.message
    });
  }
});

// Submit answer and get next question
router.post('/answer', async (req, res) => {
  try {
    const { interviewId, answer } = req.body;

    if (!interviewId || !answer) {
      return res.status(400).json({
        success: false,
        message: 'Interview ID and answer are required'
      });
    }

    const session = interviewSessions.get(interviewId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Interview session not found'
      });
    }

    const currentQuestion = session.questions[session.currentQuestionIndex];

    // Evaluate the answer
    const evaluation = await aiInterviewer.evaluateAnswer(
      currentQuestion.question,
      answer,
      currentQuestion.keyPoints
    );

    // Store answer and evaluation
    session.answers.push(answer);
    session.evaluations.push(evaluation);
    session.currentQuestionIndex++;

    // Check if interview is complete
    const isComplete = session.currentQuestionIndex >= session.questions.length;

    if (isComplete) {
      // Generate final report
      const report = await aiInterviewer.generateInterviewReport({
        questions: session.questions,
        answers: session.answers,
        evaluations: session.evaluations
      });

      return res.json({
        success: true,
        complete: true,
        evaluation,
        report
      });
    }

    // Return next question
    const nextQuestion = session.questions[session.currentQuestionIndex];

    res.json({
      success: true,
      complete: false,
      evaluation,
      nextQuestion,
      progress: {
        current: session.currentQuestionIndex + 1,
        total: session.questions.length
      }
    });

  } catch (error) {
    console.error('Answer submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process answer',
      error: error.message
    });
  }
});

// Generate a single question
router.post('/question/generate', async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    if (!topic || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Topic and difficulty are required'
      });
    }

    const question = await aiInterviewer.generateQuestion(topic, difficulty);

    res.json({
      success: true,
      question
    });

  } catch (error) {
    console.error('Question generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate question',
      error: error.message
    });
  }
});

// Evaluate a single answer
router.post('/evaluate', async (req, res) => {
  try {
    const { question, answer, keyPoints } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: 'Question and answer are required'
      });
    }

    const evaluation = await aiInterviewer.evaluateAnswer(
      question,
      answer,
      keyPoints || []
    );

    res.json({
      success: true,
      evaluation
    });

  } catch (error) {
    console.error('Evaluation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to evaluate answer',
      error: error.message
    });
  }
});

// Get code feedback
router.post('/code/feedback', async (req, res) => {
  try {
    const { code, language, problemDescription } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Code and language are required'
      });
    }

    const feedback = await aiInterviewer.provideFeedbackOnCode(
      code,
      language,
      problemDescription || 'Code review'
    );

    res.json({
      success: true,
      feedback
    });

  } catch (error) {
    console.error('Code feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to provide code feedback',
      error: error.message
    });
  }
});

// Generate follow-up question
router.post('/question/followup', async (req, res) => {
  try {
    const { originalQuestion, previousAnswer } = req.body;

    if (!originalQuestion || !previousAnswer) {
      return res.status(400).json({
        success: false,
        message: 'Original question and previous answer are required'
      });
    }

    const followUp = await aiInterviewer.generateFollowUpQuestion(
      originalQuestion,
      previousAnswer
    );

    res.json({
      success: true,
      followUp
    });

  } catch (error) {
    console.error('Follow-up generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate follow-up question',
      error: error.message
    });
  }
});

// Get interview session status
router.get('/session/:interviewId', (req, res) => {
  try {
    const { interviewId } = req.params;
    const session = interviewSessions.get(interviewId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Interview session not found'
      });
    }

    res.json({
      success: true,
      session: {
        interviewId: session.interviewId,
        topic: session.topic,
        difficulty: session.difficulty,
        progress: {
          current: session.currentQuestionIndex,
          total: session.questions.length
        },
        startedAt: session.startedAt,
        averageScore: session.evaluations.length > 0
          ? session.evaluations.reduce((sum, e) => sum + e.score, 0) / session.evaluations.length
          : 0
      }
    });

  } catch (error) {
    console.error('Session retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve session',
      error: error.message
    });
  }
});

module.exports = router;

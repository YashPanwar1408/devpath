const express = require('express');
const router = express.Router();
const ATSScorer = require('../ai/ats');

const atsScorer = new ATSScorer();

/**
 * POST /api/ats/analyze
 * Analyze resume with full AI-powered analysis
 */
router.post('/analyze', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }
    
    const analysis = await atsScorer.analyzeResume(resumeText, jobDescription || '');
    
    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('ATS Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze resume',
      message: error.message 
    });
  }
});

/**
 * POST /api/ats/quick-score
 * Get quick score without AI analysis (faster)
 */
router.post('/quick-score', (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }
    
    const score = atsScorer.quickScore(resumeText, jobDescription || '');
    
    res.json({
      success: true,
      ...score
    });
  } catch (error) {
    console.error('Quick Score Error:', error);
    res.status(500).json({ 
      error: 'Failed to calculate score',
      message: error.message 
    });
  }
});

/**
 * POST /api/ats/batch-analyze
 * Analyze resume against multiple job descriptions
 */
router.post('/batch-analyze', async (req, res) => {
  try {
    const { resumeText, jobs } = req.body;
    
    if (!resumeText || !jobs || !Array.isArray(jobs)) {
      return res.status(400).json({ 
        error: 'Resume text and jobs array are required' 
      });
    }
    
    const results = await atsScorer.batchAnalyze(resumeText, jobs);
    
    res.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Batch Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to perform batch analysis',
      message: error.message 
    });
  }
});

/**
 * GET /api/ats/keywords
 * Get list of common ATS keywords by category
 */
router.get('/keywords', (req, res) => {
  try {
    res.json({
      success: true,
      categories: atsScorer.keywordCategories
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve keywords' 
    });
  }
});

module.exports = router;

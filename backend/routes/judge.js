const express = require('express');
const router = express.Router();
const codeExecutor = require('../services/judge');

// Execute code
router.post('/execute', async (req, res) => {
  try {
    const { code, language, input } = req.body;

    // Validate input
    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Code and language are required'
      });
    }

    // Execute code
    const result = await codeExecutor.executeCode(code, language, input || '');

    res.json({
      success: result.success,
      output: result.output,
      error: result.error,
      executionTime: result.executionTime
    });

  } catch (error) {
    console.error('Execute error:', error);
    res.status(500).json({
      success: false,
      message: 'Code execution failed',
      error: error.message
    });
  }
});

// Submit solution with test cases
router.post('/submit', async (req, res) => {
  try {
    const { code, language, testCases } = req.body;

    // Validate input
    if (!code || !language || !testCases || !Array.isArray(testCases)) {
      return res.status(400).json({
        success: false,
        message: 'Code, language, and testCases array are required'
      });
    }

    // Run test cases
    const results = await codeExecutor.runTestCases(code, language, testCases);

    const passedCount = results.filter(r => r.passed).length;
    const allPassed = passedCount === testCases.length;

    res.json({
      success: true,
      allPassed,
      passedCount,
      totalCount: testCases.length,
      results
    });

  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({
      success: false,
      message: 'Code submission failed',
      error: error.message
    });
  }
});

// Get supported languages
router.get('/languages', (req, res) => {
  res.json({
    languages: [
      { id: 'javascript', name: 'JavaScript', version: 'Node 18' },
      { id: 'python', name: 'Python', version: '3.11' },
      { id: 'java', name: 'Java', version: '17' },
      { id: 'cpp', name: 'C++', version: 'GCC 11' }
    ]
  });
});

module.exports = router;

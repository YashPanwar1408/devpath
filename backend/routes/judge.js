const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

// ============================================
// BIGINT-SAFE JSON STRINGIFIER
// ============================================
const BIGINT_REPLACER = `
function bigIntReplacer(key, value) {
  return typeof value === 'bigint' ? value.toString() : value;
}
`;

const BIGINT_STRINGIFY = `JSON.stringify(result, bigIntReplacer)`;

// ============================================
// DRIVER CODE TEMPLATES
// ============================================

const PYTHON_DRIVER_TEMPLATE = (functionName, userCode, inputCount, inputPath = '/workspace/input.json') => `
import sys
import json
import traceback
import os

# User's solution
${userCode}

# BigInt-safe JSON encoder
class BigIntEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, int) and (obj > 2**53 - 1 or obj < -(2**53 - 1)):
            return str(obj)
        return super().default(obj)

def main():
    try:
        # Determine input file path
        input_file = '${inputPath}' if '${inputPath}' != '/workspace/input.json' else os.path.join(os.path.dirname(__file__), 'input.json')
        
        # Read all inputs from input.json
        with open(input_file, 'r') as f:
            lines = f.read().strip().split('\\n')
        
        # Parse arguments
        args = []
        for line in lines[:${inputCount}]:
            args.append(json.loads(line))
        
        # Call user function
        solution = Solution()
        result = solution.${functionName}(*args)
        
        # Print result with BigInt support
        print(json.dumps(result, cls=BigIntEncoder, separators=(',', ':')))
        
    except SyntaxError as e:
        print(f"SYNTAX_ERROR: {e.msg} at line {e.lineno}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        # Extract line number from traceback
        tb = traceback.extract_tb(sys.exc_info()[2])
        user_frame = None
        for frame in tb:
            if 'solution.py' in frame.filename or '/workspace/' in frame.filename:
                user_frame = frame
                break
        
        error_msg = f"{type(e).__name__}: {str(e)}"
        if user_frame:
            error_msg += f" | Line {user_frame.lineno}"
        
        print(error_msg, file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
`;

const JAVASCRIPT_DRIVER_TEMPLATE = (functionName, userCode, inputCount, inputPath = '/workspace/input.json') => `
const fs = require('fs');
const path = require('path');

// User's solution
${userCode}

${BIGINT_REPLACER}

async function main() {
    try {
        // Determine input file path
        const inputFile = '${inputPath}' !== '/workspace/input.json' 
            ? '${inputPath}' 
            : path.join(__dirname, 'input.json');
        
        // Read all inputs from input.json
        const content = fs.readFileSync(inputFile, 'utf8');
        const lines = content.trim().split('\\n');
        
        // Parse arguments
        const args = [];
        for (let i = 0; i < ${inputCount}; i++) {
            args.push(JSON.parse(lines[i]));
        }
        
        // Call user function
        const solution = new Solution();
        const result = await solution.${functionName}(...args);
        
        // Print result with BigInt support
        console.log(${BIGINT_STRINGIFY});
        
    } catch (error) {
        // Extract line number from error stack
        const stack = error.stack || '';
        const match = stack.match(/solution\\.js:(\\d+)/);
        const lineNum = match ? match[1] : 'unknown';
        
        const errorMsg = \`\${error.name}: \${error.message} | Line \${lineNum}\`;
        console.error(errorMsg);
        process.exit(1);
    }
}

main();
`;

// ============================================
// DOCKER EXECUTION
// ============================================

async function executeInDocker(language, code, testCases) {
  const sessionId = uuidv4();
  const tempDir = path.join(__dirname, '../temp', sessionId);
  
  try {
    await fs.mkdir(tempDir, { recursive: true });
    
    const results = [];
    
    for (let idx = 0; idx < testCases.length; idx++) {
      const testCase = testCases[idx];
      
      // Write input.json with newline-separated inputs
      await fs.writeFile(
        path.join(tempDir, 'input.json'),
        testCase.input,
        'utf8'
      );
      
      // Write solution file
      const ext = language === 'python' ? 'py' : 'js';
      const filename = `solution.${ext}`;
      await fs.writeFile(
        path.join(tempDir, filename),
        code,
        'utf8'
      );
      
      // Execute in Docker container
      const startTime = Date.now();
      const { stdout, stderr, timedOut, exitCode } = await runContainer(
        language,
        tempDir,
        filename
      );
      const executionTime = Date.now() - startTime;
      
      // Parse test case inputs for display
      const inputLines = testCase.input.trim().split('\n');
      const parsedInputs = inputLines.map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return line;
        }
      });
      
      // Parse expected output
      let expectedOutput;
      try {
        expectedOutput = JSON.parse(testCase.output);
      } catch {
        expectedOutput = testCase.output;
      }
      
      // Handle different result cases
      if (timedOut) {
        results.push({
          testCase: idx + 1,
          input: parsedInputs,
          expectedOutput,
          actualOutput: null,
          passed: false,
          status: 'Time Limit Exceeded',
          error: 'Execution exceeded 5 seconds',
          executionTime: 5000,
          memoryUsed: 'N/A'
        });
      } else if (exitCode !== 0 || stderr) {
        // Runtime error
        const errorMsg = stderr || 'Unknown error';
        const lineMatch = errorMsg.match(/Line (\d+)/i);
        const lineNumber = lineMatch ? lineMatch[1] : null;
        
        results.push({
          testCase: idx + 1,
          input: parsedInputs,
          expectedOutput,
          actualOutput: null,
          passed: false,
          status: 'Runtime Error',
          error: errorMsg.split('|')[0].trim(),
          lineNumber,
          executionTime,
          memoryUsed: 'N/A'
        });
      } else {
        // Successful execution - compare outputs
        let actualOutput;
        try {
          actualOutput = JSON.parse(stdout.trim());
        } catch {
          actualOutput = stdout.trim();
        }
        
        // Deep equality check
        const passed = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
        
        results.push({
          testCase: idx + 1,
          input: parsedInputs,
          expectedOutput,
          actualOutput,
          passed,
          status: passed ? 'Accepted' : 'Wrong Answer',
          error: null,
          executionTime,
          memoryUsed: 'N/A'
        });
      }
    }
    
    return results;
    
  } catch (error) {
    throw new Error(`Execution failed: ${error.message}`);
  } finally {
    // Cleanup temp directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.error('Cleanup failed:', cleanupError);
    }
  }
}

// ============================================
// DOCKER CONTAINER RUNNER
// ============================================

function runContainer(language, tempDir, filename) {
  return new Promise((resolve) => {
    // Check if Docker is available, fallback to local execution
    const useDocker = process.env.USE_DOCKER !== 'false';
    
    if (!useDocker) {
      // Fallback: Direct execution (development mode only)
      return runLocalExecution(language, tempDir, filename, resolve);
    }
    
    const image = language === 'python' ? 'python:3.11-alpine' : 'node:18-alpine';
    const cmd = language === 'python' 
      ? ['python', `/workspace/${filename}`]
      : ['node', `/workspace/${filename}`];
    
    const dockerArgs = [
      'run',
      '--rm',
      '--network=none',           // No internet access
      '--memory=128m',            // Memory limit
      '--cpus=0.5',              // CPU throttling
      '--memory-swap=128m',      // Disable swap
      '-v', `${tempDir}:/workspace`,
      image,
      ...cmd
    ];
    
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    
    const process = spawn('docker', dockerArgs);
    
    // Set 5-second timeout
    const timeout = setTimeout(() => {
      timedOut = true;
      process.kill('SIGKILL');
    }, 5000);
    
    process.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    process.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    process.on('close', (exitCode) => {
      clearTimeout(timeout);
      resolve({ stdout, stderr, timedOut, exitCode });
    });
    
    process.on('error', (error) => {
      clearTimeout(timeout);
      // If Docker command fails, try local execution as fallback
      console.log('Docker not available, falling back to local execution');
      runLocalExecution(language, tempDir, filename, resolve);
    });
  });
}

// Fallback local execution (WARNING: No sandboxing!)
function runLocalExecution(language, tempDir, filename, resolve) {
  const cmd = language === 'python' ? 'python' : 'node';
  const filePath = path.join(tempDir, filename);
  
  let stdout = '';
  let stderr = '';
  let timedOut = false;
  
  const process = spawn(cmd, [filePath], {
    cwd: tempDir,
    env: { ...process.env }
  });
  
  const timeout = setTimeout(() => {
    timedOut = true;
    process.kill('SIGKILL');
  }, 5000);
  
  process.stdout.on('data', (data) => {
    stdout += data.toString();
  });
  
  process.stderr.on('data', (data) => {
    stderr += data.toString();
  });
  
  process.on('close', (exitCode) => {
    clearTimeout(timeout);
    resolve({ stdout, stderr, timedOut, exitCode });
  });
  
  process.on('error', (error) => {
    clearTimeout(timeout);
    resolve({ 
      stdout: '', 
      stderr: `Execution error: ${error.message}`, 
      timedOut: false, 
      exitCode: 1 
    });
  });
}

// ============================================
// ROUTE: RUN CODE (Public Test Cases Only)
// ============================================

router.post('/run', async (req, res) => {
  try {
    const { problemSlug, code, language } = req.body;
    
    if (!problemSlug || !code || !language) {
      return res.status(400).json({ 
        error: 'Missing required fields: problemSlug, code, language' 
      });
    }
    
    // Fetch problem with public test cases only
    const problem = await prisma.problem.findUnique({
      where: { slug: problemSlug },
      select: {
        id: true,
        title: true,
        functionName: true,
        testCases: true
      }
    });
    
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    // Filter public test cases only
    const publicTestCases = problem.testCases.filter(tc => !tc.isHidden);
    
    if (publicTestCases.length === 0) {
      return res.status(400).json({ error: 'No public test cases available' });
    }
    
    // Count input parameters from first test case
    const inputCount = publicTestCases[0].input.split('\n').length;
    
    // Generate driver code
    const driverCode = language === 'python'
      ? PYTHON_DRIVER_TEMPLATE(problem.functionName, code, inputCount)
      : JAVASCRIPT_DRIVER_TEMPLATE(problem.functionName, code, inputCount);
    
    // Execute in Docker
    const results = await executeInDocker(language, driverCode, publicTestCases);
    
    // Calculate summary
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    const allPassed = passedCount === totalCount;
    
    return res.json({
      status: allPassed ? 'Accepted' : 'Failed',
      passed: passedCount,
      total: totalCount,
      results
    });
    
  } catch (error) {
    console.error('Run error:', error);
    return res.status(500).json({ 
      error: 'Execution failed', 
      message: error.message 
    });
  }
});

// ============================================
// ROUTE: SUBMIT CODE (All Test Cases)
// ============================================

router.post('/submit', async (req, res) => {
  try {
    const { problemSlug, code, language, userId } = req.body;
    
    if (!problemSlug || !code || !language) {
      return res.status(400).json({ 
        error: 'Missing required fields: problemSlug, code, language' 
      });
    }
    
    // Fetch problem with ALL test cases
    const problem = await prisma.problem.findUnique({
      where: { slug: problemSlug },
      select: {
        id: true,
        title: true,
        functionName: true,
        testCases: true
      }
    });
    
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    if (problem.testCases.length === 0) {
      return res.status(400).json({ error: 'No test cases available' });
    }
    
    // Count input parameters from first test case
    const inputCount = problem.testCases[0].input.split('\n').length;
    
    // Generate driver code
    const driverCode = language === 'python'
      ? PYTHON_DRIVER_TEMPLATE(problem.functionName, code, inputCount)
      : JAVASCRIPT_DRIVER_TEMPLATE(problem.functionName, code, inputCount);
    
    // Execute all test cases
    const results = await executeInDocker(language, driverCode, problem.testCases);
    
    // Calculate summary
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    const allPassed = passedCount === totalCount;
    
    // Find first failed test case
    const firstFailure = results.find(r => !r.passed);
    
    // Update user progress if all passed
    if (allPassed && userId) {
      try {
        await prisma.progress.upsert({
          where: {
            userId_problemId: {
              userId,
              problemId: problem.id
            }
          },
          update: {
            solved: true,
            lastAttemptAt: new Date()
          },
          create: {
            userId,
            problemId: problem.id,
            solved: true,
            lastAttemptAt: new Date()
          }
        });
      } catch (progressError) {
        console.error('Failed to update progress:', progressError);
      }
    }
    
    return res.json({
      status: allPassed ? 'Accepted' : firstFailure?.status || 'Failed',
      passed: passedCount,
      total: totalCount,
      message: allPassed 
        ? `🎉 Accepted! All ${totalCount} test cases passed.`
        : `Failed on test case ${firstFailure.testCase}/${totalCount}`,
      firstFailure: firstFailure || null,
      results: results.map(r => ({
        testCase: r.testCase,
        passed: r.passed,
        status: r.status,
        isHidden: problem.testCases[r.testCase - 1]?.isHidden || false,
        // Only show details for public test cases or first failure
        ...((!problem.testCases[r.testCase - 1]?.isHidden || r.testCase === firstFailure?.testCase) && {
          input: r.input,
          expectedOutput: r.expectedOutput,
          actualOutput: r.actualOutput,
          error: r.error,
          lineNumber: r.lineNumber,
          executionTime: r.executionTime
        })
      }))
    });
    
  } catch (error) {
    console.error('Submit error:', error);
    return res.status(500).json({ 
      error: 'Submission failed', 
      message: error.message 
    });
  }
});

// ============================================
// ROUTE: GET TEST CASES (Public Only)
// ============================================

router.get('/testcases/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const problem = await prisma.problem.findUnique({
      where: { slug },
      select: {
        testCases: true
      }
    });
    
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    
    // Return only public test cases
    const publicTestCases = problem.testCases
      .filter(tc => !tc.isHidden)
      .map(tc => {
        const inputs = tc.input.split('\n').map(line => {
          try {
            return JSON.parse(line);
          } catch {
            return line;
          }
        });
        
        let output;
        try {
          output = JSON.parse(tc.output);
        } catch {
          output = tc.output;
        }
        
        return { inputs, output };
      });
    
    return res.json({ testCases: publicTestCases });
    
  } catch (error) {
    console.error('Get test cases error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch test cases', 
      message: error.message 
    });
  }
});

// ============================================
// ROUTE: HEALTH CHECK
// ============================================

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'judge',
    features: [
      'Docker isolation',
      'BigInt support',
      'Line number reporting',
      'Memory & CPU limits',
      'TLE detection'
    ]
  });
});

module.exports = router;

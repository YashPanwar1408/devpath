
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

const EXECUTION_TIMEOUT = 5000;

const LANGUAGES = {
  javascript: {
    extension: '.js',
    dockerImage: 'node:18-alpine',
    executeCommand: (filename) => `node ${filename}`,
    memoryLimit: '128m',
    cpuLimit: '0.5',
    commentPrefix: '//'
  },
  python: {
    extension: '.py',
    dockerImage: 'python:3.11-alpine',
    executeCommand: (filename) => `python ${filename}`,
    memoryLimit: '128m',
    cpuLimit: '0.5',
    commentPrefix: '#'
  },
  java: {
    extension: '.java',
    dockerImage: 'openjdk:17-alpine',
    compileCommand: (filename) => `javac ${filename}`,
    executeCommand: (className) => `java ${className}`,
    memoryLimit: '256m',
    cpuLimit: '0.5',
    commentPrefix: '//'
  },
  cpp: {
    extension: '.cpp',
    dockerImage: 'gcc:latest',
    compileCommand: (filename) => `g++ -o program ${filename}`,
    executeCommand: () => `./program`,
    memoryLimit: '128m',
    cpuLimit: '0.5',
    commentPrefix: '//'
  }
};

class CodeExecutor {
  constructor() {
    this.tempDir = path.join(__dirname, '../temp');
    this.ensureTempDir();
  }

  async ensureTempDir() {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true });
    }
  }

  extractFunctionName(code, language) {
    if (language === 'javascript') {
      const match = code.match(/(?:var|const|let|function)\s+(\w+)/);
      return match ? match[1] : 'solution';
    } else if (language === 'python') {
      const match = code.match(/def\s+(\w+)\s*\(/);
      return match ? match[1] : 'solution';
    }
    return 'solution';
  }

  generateDriverCode(language, userCode, functionName) {
    if (language === 'javascript') {
      return `
// --- Helper Classes (ListNode, TreeNode) ---
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// --- Helper Functions to Deserialize Inputs ---
function jsonToListNode(arr) {
  if (!arr || arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

function listNodeToArray(head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  return arr;
}

function jsonToTreeNode(arr) {
  if (!arr || arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (i < arr.length) {
    let current = queue.shift();
    if (arr[i] !== null) {
      current.left = new TreeNode(arr[i]);
      queue.push(current.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]);
      queue.push(current.right);
    }
    i++;
  }
  return root;
}

// Helper: Serialize results including BigInt (for math problems)
const safeStringify = (obj) =>
  JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );

// --- User Code ---
${userCode}

// --- Execution Logic ---
const fs = require('fs');

try {
  const inputData = fs.readFileSync('input.json', 'utf8');
  const trimmed = inputData.trim();
  const lines = trimmed ? trimmed.split('\\n') : [];
  const args = lines.map((line) => JSON.parse(line));

  const result = ${functionName}(...args);

  console.log(safeStringify(result));
} catch (error) {
  console.error(error.message || String(error));
  process.exit(1);
}
`;
    } else if (language === 'python') {
      return `
import sys, json

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

${userCode}

if __name__ == '__main__':
    try:
        with open('input.json', 'r') as f:
            content = f.read().strip()
            args = [json.loads(line) for line in content.split('\\n') if line]

        if 'Solution' in globals():
            sol = Solution()
            method_name = '${functionName}'
            if hasattr(sol, method_name):
                method = getattr(sol, method_name)
                result = method(*args)
            else:
                methods = [m for m in dir(Solution) if not m.startswith('__')]
                if methods:
                    method = getattr(sol, methods[0])
                    result = method(*args)
                else:
                    raise Exception("No method found in Solution class")
        else:
            result = ${functionName}(*args)

        print(json.dumps(result))
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
`;
    }
    return userCode;
  }

  async runTestCases(code, language, testCases, userId, problemId, mode = 'run') {
    const langConfig = LANGUAGES[language.toLowerCase()];
    if (!langConfig) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const functionName = this.extractFunctionName(code, language.toLowerCase());

    if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
      return [];
    }

    const casesToRun =
      mode === 'submit'
        ? testCases
        : testCases.filter((tc) => !tc.isHidden);

    const results = [];
    let allPassed = true;

    for (const testCase of casesToRun) {
      let parsedInputs;
      try {
        parsedInputs = testCase.input
          .split('\n')
          .map((line) => JSON.parse(line));
      } catch (e) {
        parsedInputs = testCase.input.split('\n');
      }

      const runResult = await this.executeWithDriver(
        code,
        language,
        parsedInputs,
        functionName
      );

      let passed = false;
      let actualOutput = (runResult.output || '').trim();

      if (runResult.success) {
        try {
          const expected = JSON.parse(testCase.output);
          const actual = JSON.parse(actualOutput);
          passed = JSON.stringify(expected) === JSON.stringify(actual);
        } catch (e) {
          passed = actualOutput === (testCase.output || '').trim();
        }
      }

      results.push({
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: actualOutput,
        passed,
        error: runResult.error,
        executionTime: runResult.executionTime,
        isHidden: testCase.isHidden
      });

      if (!passed) {
        allPassed = false;
        if (mode === 'submit') {
          break;
        }
      }
    }

    if (mode === 'submit' && allPassed) {
      const totalTime = results.reduce(
        (acc, r) => acc + (r.executionTime || 0),
        0
      );
      const avgTime =
        results.length > 0 ? Math.round(totalTime / results.length) : 0;

      await prisma.submission.create({
        data: {
          userId,
          problemId,
          code,
          language,
          status: 'Accepted',
          runtime: avgTime,
          memory: 0
        }
      });
    }

    return results;
  }

  async executeWithDriver(code, language, inputArgs, functionName) {
    const langConfig = LANGUAGES[language.toLowerCase()];
    if (!langConfig) throw new Error('Language not supported');

    const driverCode = this.generateDriverCode(
      language.toLowerCase(),
      code,
      functionName
    );

    const executionId = uuidv4();
    const workDir = path.join(this.tempDir, executionId);

    try {
      await fs.mkdir(workDir, { recursive: true });
      const filename = `solution${langConfig.extension}`;
      await fs.writeFile(path.join(workDir, filename), driverCode);
      const inputContent = inputArgs
        .map((arg) => JSON.stringify(arg))
        .join('\n');
      await fs.writeFile(path.join(workDir, 'input.json'), inputContent);

      const runCommand = langConfig.executeCommand(filename);

      const result = await this.runInDocker(
        workDir,
        langConfig.dockerImage,
        runCommand,
        langConfig.memoryLimit,
        langConfig.cpuLimit
      );

      return {
        success: result.success,
        output: result.output,
        error: result.error,
        executionTime: 0
      };
    } catch (e) {
      return { success: false, error: e.message, output: '' };
    } finally {
      await this.cleanup(workDir);
    }
  }

  async runInDocker(workDir, image, command, memoryLimit, cpuLimit) {
    return new Promise((resolve) => {
      const dockerCmd = `docker run --rm --memory=${memoryLimit} --cpus=${cpuLimit} --network=none -v "${workDir}:/app" -w /app ${image} sh -c "${command}"`;

      exec(
        dockerCmd,
        { timeout: EXECUTION_TIMEOUT },
        (error, stdout, stderr) => {
          if (error) {
            if (error.killed) {
              resolve({
                success: false,
                error: 'Time Limit Exceeded',
                output: ''
              });
            } else {
              resolve({
                success: false,
                error: stderr || error.message,
                output: stdout
              });
            }
          } else {
            resolve({ success: true, output: stdout, error: stderr });
          }
        }
      );
    });
  }

  async cleanup(dir) {
    try {
      await fs.rm(dir, { recursive: true, force: true });
    } catch (e) {
      console.error(`Failed to cleanup ${dir}:`, e);
    }
  }
}

const codeExecutor = new CodeExecutor();

router.post('/run', async (req, res) => {
  try {
    const { userId, problemId, code, language } = req.body;

    if (!userId || !problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, problemId, code, language'
      });
    }

    const problem = await prisma.problem.findUnique({
      where: { id: problemId }
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    const results = await codeExecutor.runTestCases(
      code,
      language,
      problem.testCases,
      userId,
      problemId,
      'run'
    );

    res.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Run error:', error);
    res.status(500).json({
      success: false,
      message: 'Code execution failed',
      error: error.message
    });
  }
});

router.post('/submit', async (req, res) => {
  try {
    const { userId, problemId, code, language } = req.body;

    if (!userId || !problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, problemId, code, language'
      });
    }

    const problem = await prisma.problem.findUnique({
      where: { id: problemId }
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    const results = await codeExecutor.runTestCases(
      code,
      language,
      problem.testCases,
      userId,
      problemId,
      'submit'
    );

    const passedCount = results.filter((r) => r.passed).length;
    const totalCount = results.length;
    const allPassed = passedCount === totalCount;

    res.json({
      success: true,
      status: allPassed ? 'Accepted' : 'Rejected',
      allPassed,
      passedCount,
      totalCount,
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

router.get('/languages', (req, res) => {
  res.json({
    languages: [
      { id: 'javascript', name: 'JavaScript', version: 'Node 18' },
      { id: 'python', name: 'Python', version: '3.11' }
    ]
  });
});

module.exports = router;

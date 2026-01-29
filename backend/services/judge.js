const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Language configurations
const LANGUAGES = {
  javascript: {
    extension: '.js',
    dockerImage: 'node:18-alpine',
    executeCommand: (filename) => `node ${filename}`,
    memoryLimit: '128m',
    cpuLimit: '0.5'
  },
  python: {
    extension: '.py',
    dockerImage: 'python:3.11-alpine',
    executeCommand: (filename) => `python ${filename}`,
    memoryLimit: '128m',
    cpuLimit: '0.5'
  },
  java: {
    extension: '.java',
    dockerImage: 'openjdk:17-alpine',
    compileCommand: (filename) => `javac ${filename}`,
    executeCommand: (className) => `java ${className}`,
    memoryLimit: '256m',
    cpuLimit: '0.5'
  },
  cpp: {
    extension: '.cpp',
    dockerImage: 'gcc:latest',
    compileCommand: (filename) => `g++ -o program ${filename}`,
    executeCommand: () => `./program`,
    memoryLimit: '128m',
    cpuLimit: '0.5'
  }
};

// Timeout in milliseconds
const EXECUTION_TIMEOUT = 5000;

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

  async executeCode(code, language, input = '') {
    const languageConfig = LANGUAGES[language.toLowerCase()];
    
    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
        output: '',
        executionTime: 0
      };
    }

    const executionId = uuidv4();
    const workDir = path.join(this.tempDir, executionId);
    
    try {
      // Create working directory
      await fs.mkdir(workDir, { recursive: true });

      // Write code to file
      const filename = this.getFilename(language, languageConfig.extension);
      const filepath = path.join(workDir, filename);
      await fs.writeFile(filepath, code);

      // Write input to file if provided
      if (input) {
        const inputPath = path.join(workDir, 'input.txt');
        await fs.writeFile(inputPath, input);
      }

      const startTime = Date.now();
      let result;

      // Compile if needed (C++, Java)
      if (languageConfig.compileCommand) {
        const compileResult = await this.runInDocker(
          workDir,
          languageConfig.dockerImage,
          languageConfig.compileCommand(filename),
          languageConfig.memoryLimit,
          languageConfig.cpuLimit
        );

        if (!compileResult.success) {
          return {
            success: false,
            error: 'Compilation Error',
            output: compileResult.output,
            executionTime: Date.now() - startTime
          };
        }
      }

      // Execute code
      const executeCommand = language.toLowerCase() === 'java'
        ? languageConfig.executeCommand(this.getJavaClassName(code))
        : languageConfig.executeCommand(filename);

      result = await this.runInDocker(
        workDir,
        languageConfig.dockerImage,
        executeCommand,
        languageConfig.memoryLimit,
        languageConfig.cpuLimit,
        input
      );

      const executionTime = Date.now() - startTime;

      return {
        success: result.success,
        output: result.output,
        error: result.error || '',
        executionTime
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        output: '',
        executionTime: 0
      };
    } finally {
      // Cleanup
      await this.cleanup(workDir);
    }
  }

  async runInDocker(workDir, image, command, memoryLimit, cpuLimit, input = '') {
    return new Promise((resolve) => {
      const dockerCommand = [
        'docker run',
        '--rm',
        `--memory=${memoryLimit}`,
        `--cpus=${cpuLimit}`,
        '--network=none', // No network access for security
        `--volume=${workDir}:/workspace`,
        '--workdir=/workspace',
        image,
        'sh -c',
        `"${input ? 'cat input.txt | ' : ''}${command}"`
      ].join(' ');

      const timeout = setTimeout(() => {
        child.kill();
        resolve({
          success: false,
          output: '',
          error: 'Time Limit Exceeded'
        });
      }, EXECUTION_TIMEOUT);

      const child = exec(dockerCommand, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
        clearTimeout(timeout);

        if (error) {
          // Check if it's a timeout
          if (error.killed) {
            resolve({
              success: false,
              output: '',
              error: 'Time Limit Exceeded'
            });
            return;
          }

          // Runtime error
          resolve({
            success: false,
            output: stdout,
            error: stderr || error.message
          });
          return;
        }

        resolve({
          success: true,
          output: stdout,
          error: stderr
        });
      });
    });
  }

  getFilename(language, extension) {
    switch (language.toLowerCase()) {
      case 'java':
        return 'Solution.java';
      case 'cpp':
        return 'solution.cpp';
      case 'python':
        return 'solution.py';
      case 'javascript':
        return 'solution.js';
      default:
        return `solution${extension}`;
    }
  }

  getJavaClassName(code) {
    const match = code.match(/public\s+class\s+(\w+)/);
    return match ? match[1] : 'Solution';
  }

  async cleanup(directory) {
    try {
      await fs.rm(directory, { recursive: true, force: true });
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }

  async runTestCases(code, language, testCases) {
    const results = [];

    for (const testCase of testCases) {
      const result = await this.executeCode(code, language, testCase.input);
      
      const passed = result.success && 
                     result.output.trim() === testCase.expectedOutput.trim();

      results.push({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: result.output.trim(),
        passed,
        error: result.error,
        executionTime: result.executionTime
      });
    }

    return results;
  }
}

module.exports = new CodeExecutor();

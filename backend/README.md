# Interview Platform Backend

## Code Execution Service

This service uses Docker to safely execute code in multiple languages.

### Supported Languages
- JavaScript (Node.js 18)
- Python (3.11)
- Java (17)
- C++ (GCC)

### API Endpoints

#### Execute Code
```bash
POST /api/judge/execute
Content-Type: application/json

{
  "code": "console.log('Hello World');",
  "language": "javascript",
  "input": ""
}
```

#### Submit with Test Cases
```bash
POST /api/judge/submit
Content-Type: application/json

{
  "code": "function solution(input) { return input * 2; }",
  "language": "javascript",
  "testCases": [
    {
      "input": "5",
      "expectedOutput": "10"
    }
  ]
}
```

#### Get Supported Languages
```bash
GET /api/judge/languages
```

### Docker Setup

1. Make sure Docker is installed and running
2. Pull required images:
```bash
docker pull node:18-alpine
docker pull python:3.11-alpine
docker pull openjdk:17-alpine
docker pull gcc:latest
```

3. Run with Docker Compose:
```bash
docker-compose up -d
```

### Security Features
- Isolated execution in Docker containers
- No network access during code execution
- Memory and CPU limits
- 5-second execution timeout
- Automatic cleanup of temporary files

### Environment Variables
```
PORT=5000
JWT_SECRET=your-secret-key
```

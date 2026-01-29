# Multi-stage build for code execution environment
FROM node:18-alpine as base

# Install required compilers and runtimes
RUN apk add --no-cache \
    python3 \
    py3-pip \
    openjdk17 \
    g++ \
    gcc \
    make

# Create non-root user for code execution
RUN addgroup -S coderunner && adduser -S coderunner -G coderunner

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create temp directory for code execution
RUN mkdir -p temp && chown -R coderunner:coderunner temp

# Switch to non-root user
USER coderunner

# Expose port
EXPOSE 5000

# Start application
CMD ["node", "index.js"]

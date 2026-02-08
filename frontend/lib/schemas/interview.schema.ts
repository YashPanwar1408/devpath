/**
 * Interview Schema & Types
 * Type-safe definitions for AI Mock Interview system
 */

import { z } from 'zod';

// ============================================================================
// INTERVIEW SESSION SCHEMA
// ============================================================================

export const InterviewRoleEnum = z.enum([
  'frontend',
  'backend',
  'fullstack',
  'data-science',
  'ml-engineer',
  'devops',
  'mobile',
  'qa',
  'system-design'
]);

export const InterviewStatusEnum = z.enum([
  'setup',
  'ready',
  'in-progress',
  'completed',
  'cancelled'
]);

export const InterviewDurationEnum = z.enum(['10', '15', '20']);

export const InterviewSessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().optional(),
  role: InterviewRoleEnum,
  duration: InterviewDurationEnum, // minutes
  status: InterviewStatusEnum,
  
  // Context
  resumeSnapshot: z.string(), // JSON stringified resume
  jobDescription: z.string().optional(),
  resumeSummary: z.string().optional(), // Gemini-generated
  jdSummary: z.string().optional(), // Gemini-generated
  
  // Vapi Integration
  vapiCallId: z.string().optional(),
  vapiAssistantId: z.string().optional(),
  
  // Transcript
  transcript: z.object({
    messages: z.array(z.object({
      role: z.enum(['ai', 'user']),
      message: z.string(),
      timestamp: z.string(),
    })),
    fullTranscript: z.string(),
  }).optional(),
  
  // Timestamps
  createdAt: z.string(), // ISO string
  startedAt: z.string().optional(),
  endedAt: z.string().optional(),
});

// ============================================================================
// INTERVIEW TRANSCRIPT SCHEMA
// ============================================================================

export const TranscriptMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['ai', 'user']),
  content: z.string(),
  timestamp: z.string(), // ISO string
  duration: z.number().optional(), // milliseconds
});

export const InterviewTranscriptSchema = z.object({
  sessionId: z.string().uuid(),
  messages: z.array(TranscriptMessageSchema),
  fullTranscript: z.string(), // Combined text for analysis
});

// ============================================================================
// INTERVIEW FEEDBACK SCHEMA
// ============================================================================

export const SkillRatingSchema = z.object({
  skill: z.string(),
  rating: z.number().min(0).max(10),
  comment: z.string().optional(),
});

export const InterviewFeedbackSchema = z.object({
  sessionId: z.string().uuid(),
  
  // Overall Score
  overallScore: z.number().min(0).max(100),
  
  // Skill Ratings
  skillRatings: z.array(SkillRatingSchema),
  
  // Detailed Feedback
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  improvements: z.array(z.string()),
  
  // Communication Analysis
  communicationClarity: z.number().min(0).max(10),
  technicalDepth: z.number().min(0).max(10),
  confidence: z.number().min(0).max(10),
  roleAlignment: z.number().min(0).max(10),
  
  // Learning Path
  suggestedTopics: z.array(z.string()),
  learningRoadmap: z.string(), // Markdown formatted
  
  // AI Analysis
  aiSummary: z.string(),
  
  createdAt: z.string(), // ISO string
});

// ============================================================================
// API REQUEST/RESPONSE SCHEMAS
// ============================================================================

export const CreateInterviewRequestSchema = z.object({
  role: InterviewRoleEnum,
  duration: InterviewDurationEnum,
  resumeData: z.string(), // JSON stringified
  jobDescription: z.string().optional(),
});

export const StartInterviewRequestSchema = z.object({
  sessionId: z.string().uuid(),
});

export const EndInterviewRequestSchema = z.object({
  sessionId: z.string().uuid(),
  transcript: z.string(), // From Vapi
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type InterviewRole = z.infer<typeof InterviewRoleEnum>;
export type InterviewStatus = z.infer<typeof InterviewStatusEnum>;
export type InterviewDuration = z.infer<typeof InterviewDurationEnum>;
export type InterviewSession = z.infer<typeof InterviewSessionSchema>;
export type TranscriptMessage = z.infer<typeof TranscriptMessageSchema>;
export type InterviewTranscript = z.infer<typeof InterviewTranscriptSchema>;
export type SkillRating = z.infer<typeof SkillRatingSchema>;
export type InterviewFeedback = z.infer<typeof InterviewFeedbackSchema>;
export type CreateInterviewRequest = z.infer<typeof CreateInterviewRequestSchema>;
export type StartInterviewRequest = z.infer<typeof StartInterviewRequestSchema>;
export type EndInterviewRequest = z.infer<typeof EndInterviewRequestSchema>;

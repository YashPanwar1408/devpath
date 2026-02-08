/**
 * Vapi Voice AI Service
 * Handles real-time voice interview integration
 */

interface VapiCall {
  id: string;
  status: 'queued' | 'ringing' | 'in-progress' | 'forwarding' | 'ended';
  startedAt?: string;
  endedAt?: string;
  transcript?: {
    role: 'user' | 'assistant';
    message: string;
    timestamp: string;
  }[];
}

interface VapiWebCallResponse {
  callId: string;
  webCallUrl: string;
}

const VAPI_API_KEY = process.env.VAPI_API_KEY || '';
const VAPI_BASE_URL = 'https://api.vapi.ai';

// ============================================================================
// CREATE ASSISTANT FOR INTERVIEW
// ============================================================================

export async function createInterviewAssistant(
  systemPrompt: string,
  interviewRole: string
): Promise<string> {
  const response = await fetch(`${VAPI_BASE_URL}/assistant`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `Interview Assistant - ${interviewRole}`,
      model: {
        provider: 'openai',
        model: 'gpt-4',
        systemPrompt,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
        ],
      },
      voice: {
        provider: '11labs',
        voiceId: 'rachel', // Professional female voice
      },
      firstMessage: "Hello! I'm excited to interview you today. Let's begin - can you start by telling me a bit about yourself and your technical background?",
      silenceTimeoutSeconds: 30,
      maxDurationSeconds: 1200, // 20 minutes max
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create Vapi assistant: ${error}`);
  }

  const data = await response.json();
  return data.id;
}

// ============================================================================
// START WEB CALL
// ============================================================================

export async function startWebCall(
  assistantId: string,
  sessionId: string
): Promise<VapiWebCallResponse> {
  const response = await fetch(`${VAPI_BASE_URL}/call/web`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      assistantId,
      metadata: {
        sessionId,
        source: 'prep-wise-interview',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to start Vapi call: ${error}`);
  }

  const data = await response.json();
  return {
    callId: data.id,
    webCallUrl: data.webCallUrl,
  };
}

// ============================================================================
// GET CALL DETAILS
// ============================================================================

export async function getCallDetails(callId: string): Promise<VapiCall> {
  const response = await fetch(`${VAPI_BASE_URL}/call/${callId}`, {
    headers: {
      'Authorization': `Bearer ${VAPI_API_KEY}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get call details: ${error}`);
  }

  return response.json();
}

// ============================================================================
// GET CALL TRANSCRIPT
// ============================================================================

export async function getCallTranscript(callId: string): Promise<{
  messages: Array<{ role: 'user' | 'assistant'; message: string; timestamp: string }>;
  fullTranscript: string;
}> {
  const callDetails = await getCallDetails(callId);
  
  const messages = callDetails.transcript || [];
  const fullTranscript = messages
    .map((msg) => `[${msg.role.toUpperCase()}]: ${msg.message}`)
    .join('\n\n');

  return {
    messages,
    fullTranscript,
  };
}

// ============================================================================
// END CALL
// ============================================================================

export async function endCall(callId: string): Promise<void> {
  const response = await fetch(`${VAPI_BASE_URL}/call/${callId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${VAPI_API_KEY}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to end call: ${error}`);
  }
}

// ============================================================================
// VAPI CLIENT-SIDE SDK (for browser)
// ============================================================================

export const VAPI_SDK_URL = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/index.js';

export interface VapiClientConfig {
  apiKey: string;
  onMessage?: (message: unknown) => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onError?: (error: unknown) => void;
}

// Client-side initialization helper (to be used in React components)
export function getVapiClientConfig(): Pick<VapiClientConfig, 'apiKey'> {
  // NOTE: In production, use a proxy API route to avoid exposing API key
  return {
    apiKey: VAPI_API_KEY,
  };
}

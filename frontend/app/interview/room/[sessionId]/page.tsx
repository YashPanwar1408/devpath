'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { InterviewSession } from '@/lib/schemas/interview.schema';

export default function InterviewRoomPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [session, setSession] = useState<InterviewSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState<Array<{ role: 'user' | 'ai'; message: string }>>([]);
  
  const vapiRef = useRef<{ stop: () => void } | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load session details
  const loadSession = useCallback(async () => {
    try {
      const res = await fetch(`/api/interview/${sessionId}`);
      if (!res.ok) throw new Error('Session not found');
      const data = await res.json();
      setSession(data.session);
      setLoading(false);
    } catch (err) {
      console.error('Load session error:', err);
      router.push('/interview/setup');
    }
  }, [sessionId, router]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // Initialize Vapi SDK
  useEffect(() => {
    if (!session) return;

    // Load Vapi SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/index.js';
    script.async = true;
    script.onload = () => {
      console.log('Vapi SDK loaded');
    };
    document.body.appendChild(script);

    return () => {
      if (vapiRef.current) {
        try {
          vapiRef.current.stop();
        } catch (e) {
          console.error('Vapi cleanup error:', e);
        }
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [session]);

  async function startInterview() {
    if (!session) return;
    
    setConnecting(true);

    try {
      // Start interview (creates Vapi assistant and call)
      const res = await fetch('/api/interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id }),
      });

      if (!res.ok) throw new Error('Failed to start interview');
      
      const data = await res.json();

      // Initialize Vapi client
      // @ts-expect-error - Vapi is loaded from CDN
      const Vapi = window.Vapi;
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || '');
      vapiRef.current = vapi;

      // Set up event listeners
      vapi.on('call-start', () => {
        console.log('Call started');
        setConnected(true);
        setConnecting(false);
        startTimeRef.current = Date.now();
        
        // Start timer
        timerRef.current = setInterval(() => {
          if (startTimeRef.current) {
            setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
          }
        }, 1000);
      });

      vapi.on('call-end', () => {
        console.log('Call ended');
        setConnected(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      });

      vapi.on('speech-start', () => {
        console.log('AI started speaking');
        setAiSpeaking(true);
      });

      vapi.on('speech-end', () => {
        console.log('AI stopped speaking');
        setAiSpeaking(false);
      });

      vapi.on('message', (message: unknown) => {
        console.log('Message:', message);
        
        if (typeof message === 'object' && message !== null && 'type' in message) {
          const msg = message as { type: string; role?: string; transcript?: string };
          if (msg.type === 'transcript') {
            setTranscript((prev) => [
              ...prev,
              {
                role: msg.role === 'assistant' ? 'ai' : 'user',
                message: msg.transcript || '',
              },
            ]);
          }
        }
      });

      vapi.on('error', (error: unknown) => {
        console.error('Vapi error:', error);
        setConnecting(false);
        setConnected(false);
      });

      // Start the call using existing assistant
      await vapi.start(data.assistantId);

    } catch (err) {
      console.error('Start interview error:', err);
      setConnecting(false);
      alert('Failed to start interview. Please try again.');
    }
  }

  async function endInterview() {
    if (!session || !connected) return;

    try {
      // Stop Vapi call
      if (vapiRef.current) {
        vapiRef.current.stop();
      }

      setConnected(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // End interview and generate feedback
      const res = await fetch('/api/interview/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id }),
      });

      if (!res.ok) throw new Error('Failed to end interview');

      // Navigate to results
      router.push(`/interview/result/${session.id}`);
    } catch (err) {
      console.error('End interview error:', err);
      alert('Failed to end interview properly. Redirecting to results...');
      router.push(`/interview/result/${session.id}`);
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading interview...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl font-semibold">
              {session?.role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Interview
            </h1>
            <p className="text-sm text-gray-400">AI Mock Interview Session</p>
          </div>
          <div className="flex items-center gap-6">
            {/* Timer */}
            <div className="text-center">
              <div className="text-2xl font-mono font-bold">{formatTime(elapsed)}</div>
              <div className="text-xs text-gray-400">{session?.duration} min total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left: Video/Audio Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* AI Avatar */}
          <div className="relative">
            <div
              className={`w-48 h-48 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-300 ${
                aiSpeaking ? 'ring-8 ring-blue-500/50 scale-105' : ''
              }`}
            >
              <svg
                className="w-24 h-24 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            {aiSpeaking && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-blue-500 rounded-full text-sm font-semibold">
                AI Speaking...
              </div>
            )}
          </div>

          {/* Status */}
          <div className="mt-12 text-center">
            {!connected && !connecting && (
              <div>
                <p className="text-gray-400 mb-4">Ready to start your interview?</p>
                <Button
                  onClick={startInterview}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg"
                >
                  Start Interview
                </Button>
              </div>
            )}
            {connecting && (
              <div className="text-gray-400">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                Connecting to AI interviewer...
              </div>
            )}
          </div>

          {/* Controls */}
          {connected && (
            <div className="mt-12 flex gap-4">
              <Button
                onClick={() => setMuted(!muted)}
                variant="outline"
                className={`w-16 h-16 rounded-full ${
                  muted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {muted ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </>
                  )}
                </svg>
              </Button>

              <Button
                onClick={endInterview}
                className="bg-red-600 hover:bg-red-700 px-8 py-6"
              >
                End Interview
              </Button>
            </div>
          )}
        </div>

        {/* Right: Transcript */}
        <div className="w-96 border-l border-gray-800 bg-gray-900 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="font-semibold">Live Transcript</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {transcript.length === 0 ? (
              <p className="text-gray-500 text-sm text-center mt-8">
                Transcript will appear here once the interview starts
              </p>
            ) : (
              transcript.map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    item.role === 'ai'
                      ? 'bg-blue-500/10 border-blue-500/20'
                      : 'bg-gray-800 border-gray-700'
                  } border rounded-lg p-3`}
                >
                  <div className="text-xs font-semibold text-gray-400 mb-1">
                    {item.role === 'ai' ? 'AI Interviewer' : 'You'}
                  </div>
                  <div className="text-sm">{item.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

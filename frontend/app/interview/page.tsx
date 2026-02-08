'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function InterviewPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-[0.2em]">
            Interview Hub
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Choose how you want to practice
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base">
            Use the AI mock interview for solo practice with instant feedback, or join a
            live collaborative room for human-to-human mock interviews.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Mock Interview */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-blue-950/60 via-slate-950 to-slate-950 p-6 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                AI powered
              </div>
              <h2 className="text-2xl font-semibold">AI Mock Interview</h2>
              <p className="text-sm text-gray-400">
                Voice-based interview with an AI interviewer powered by Vapi and Gemini,
                tailored to your resume and target role, with detailed feedback at the end.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-gray-400">
                <li>• Resume upload & job description context</li>
                <li>• Real-time AI voice conversation</li>
                <li>• Structured feedback and analytics</li>
              </ul>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-gray-500">Best for solo, structured practice.</p>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-xs font-semibold px-4"
                onClick={() => router.push('/interview/setup')}
              >
                Start AI Interview
              </Button>
            </div>
          </div>

          {/* Live Room */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-emerald-950/60 via-slate-950 to-slate-950 p-6 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live room
              </div>
              <h2 className="text-2xl font-semibold">Human Mock Interview Room</h2>
              <p className="text-sm text-gray-400">
                Join a collaborative room with multiple participants to run mock interviews
                over video, screen share, and chat. Built to integrate with GetStream.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-gray-400">
                <li>• Multi-user video & audio</li>
                <li>• Shared code editor & whiteboard (room page)</li>
                <li>• Chat for backchannel feedback</li>
              </ul>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-gray-500">Best for peer or mentor practice.</p>
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/30 text-xs font-semibold px-4"
                onClick={() => router.push('/room')}
              >
                Enter Live Room
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

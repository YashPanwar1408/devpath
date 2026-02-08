'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { InterviewSession, InterviewFeedback } from '@/lib/schemas/interview.schema';

type SessionWithFeedback = InterviewSession & { feedback: InterviewFeedback | null };

export default function InterviewHistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionWithFeedback[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const res = await fetch('/api/interview/history');
      if (!res.ok) throw new Error('Failed to load history');
      
      const data = await res.json();
      setSessions(data.sessions);
      setLoading(false);
    } catch (err) {
      console.error('Load history error:', err);
      setLoading(false);
    }
  }

  function formatDate(isoString: string | Date): string {
    const date = typeof isoString === 'string' ? new Date(isoString) : isoString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function formatRole(role: string): string {
    return role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function getStatusBadge(status: string) {
    const styles = {
      setup: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      'in-progress': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      completed: 'bg-green-500/20 text-green-300 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles] || styles.setup}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Interview History</h1>
              <p className="text-gray-400 mt-2">
                {sessions.length} interview{sessions.length !== 1 ? 's' : ''} completed
              </p>
            </div>
            <Button
              onClick={() => router.push('/interview/setup')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              + New Interview
            </Button>
          </div>
        </div>
      </div>

      {/* Interview List */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {sessions.length === 0 ? (
          <Card className="p-12 bg-gray-900 border-gray-800 text-center">
            <svg
              className="w-16 h-16 text-gray-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h2 className="text-xl font-semibold mb-2">No interviews yet</h2>
            <p className="text-gray-400 mb-6">Start your first mock interview to begin practicing</p>
            <Button
              onClick={() => router.push('/interview/setup')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start First Interview
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card
                key={session.id}
                className="p-6 bg-gray-900 border-gray-800 hover:border-gray-700 transition-all cursor-pointer"
                onClick={() => {
                  if (session.status === 'completed') {
                    router.push(`/interview/result/${session.id}`);
                  } else if (session.status === 'in-progress') {
                    router.push(`/interview/room/${session.id}`);
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{formatRole(session.role)}</h3>
                      {getStatusBadge(session.status)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{formatDate(session.createdAt)}</span>
                      <span>•</span>
                      <span>{session.duration} minutes</span>
                      {session.jobDescription && (
                        <>
                          <span>•</span>
                          <span>Custom JD</span>
                        </>
                      )}
                    </div>

                    {session.feedback && (
                      <div className="mt-4 flex items-center gap-6">
                        <div>
                          <div className="text-2xl font-bold text-blue-400">
                            {session.feedback.overallScore}
                          </div>
                          <div className="text-xs text-gray-500">Overall Score</div>
                        </div>
                        <div className="h-8 w-px bg-gray-800" />
                        <div className="flex gap-4 text-sm">
                          <div>
                            <div className="font-semibold">{session.feedback.communicationClarity}/10</div>
                            <div className="text-gray-500 text-xs">Communication</div>
                          </div>
                          <div>
                            <div className="font-semibold">{session.feedback.technicalDepth}/10</div>
                            <div className="text-gray-500 text-xs">Technical</div>
                          </div>
                          <div>
                            <div className="font-semibold">{session.feedback.confidence}/10</div>
                            <div className="text-gray-500 text-xs">Confidence</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    {session.status === 'completed' && (
                      <Button
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/interview/result/${session.id}`);
                        }}
                      >
                        View Results →
                      </Button>
                    )}
                    {session.status === 'in-progress' && (
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/interview/room/${session.id}`);
                        }}
                      >
                        Resume →
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

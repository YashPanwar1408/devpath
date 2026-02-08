'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { InterviewSession, InterviewFeedback } from '@/lib/schemas/interview.schema';

export default function InterviewResultPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);

  const loadResults = useCallback(async () => {
    try {
      const res = await fetch(`/api/interview/${sessionId}`);
      if (!res.ok) throw new Error('Session not found');
      
      const data = await res.json();
      setSession(data.session);
      setFeedback(data.feedback);
      setLoading(false);
    } catch (err) {
      console.error('Load results error:', err);
      router.push('/interview/history');
    }
  }, [sessionId, router]);

  useEffect(() => {
    loadResults();
  }, [loadResults]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading results...</div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Card className="p-8 bg-gray-900 border-gray-800 text-center">
          <p className="text-white text-lg mb-4">Processing your interview...</p>
          <p className="text-gray-400 text-sm">Feedback will be available shortly</p>
        </Card>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Interview Results</h1>
          <p className="text-gray-400 mt-2">
            {session?.role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} • {session?.duration} minutes
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Overall Score */}
        <Card className="p-8 bg-linear-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">{feedback.overallScore}</div>
            <div className="text-xl text-gray-300">Overall Score</div>
            <div className="text-sm text-gray-400 mt-2">{feedback.aiSummary}</div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-6 bg-gray-900 border-gray-800">
            <div className="text-3xl font-bold mb-2 ${getScoreColor(feedback.communicationClarity)}">{feedback.communicationClarity}/10</div>
            <div className="text-sm text-gray-400">Communication</div>
            <div className="text-xs text-gray-500 mt-1">{getScoreLabel(feedback.communicationClarity)}</div>
          </Card>
          <Card className="p-6 bg-gray-900 border-gray-800">
            <div className={`text-3xl font-bold mb-2 ${getScoreColor(feedback.technicalDepth)}`}>{feedback.technicalDepth}/10</div>
            <div className="text-sm text-gray-400">Technical Depth</div>
            <div className="text-xs text-gray-500 mt-1">{getScoreLabel(feedback.technicalDepth)}</div>
          </Card>
          <Card className="p-6 bg-gray-900 border-gray-800">
            <div className={`text-3xl font-bold mb-2 ${getScoreColor(feedback.confidence)}`}>{feedback.confidence}/10</div>
            <div className="text-sm text-gray-400">Confidence</div>
            <div className="text-xs text-gray-500 mt-1">{getScoreLabel(feedback.confidence)}</div>
          </Card>
          <Card className="p-6 bg-gray-900 border-gray-800">
            <div className={`text-3xl font-bold mb-2 ${getScoreColor(feedback.roleAlignment)}`}>{feedback.roleAlignment}/10</div>
            <div className="text-sm text-gray-400">Role Fit</div>
            <div className="text-xs text-gray-500 mt-1">{getScoreLabel(feedback.roleAlignment)}</div>
          </Card>
        </div>

        {/* Skill Ratings */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Skill Assessment</h2>
          <div className="space-y-4">
            {feedback.skillRatings.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{skill.skill}</span>
                  <span className={`font-bold ${getScoreColor(skill.rating)}`}>{skill.rating}/10</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      skill.rating >= 8 ? 'bg-green-500' : skill.rating >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(skill.rating / 10) * 100}%` }}
                  />
                </div>
                {skill.comment && (
                  <p className="text-sm text-gray-400 mt-1">{skill.comment}</p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-green-400">✓</span> Strengths
          </h2>
          <ul className="space-y-2">
            {feedback.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-gray-300">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Weaknesses */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-yellow-400">!</span> Areas for Improvement
          </h2>
          <ul className="space-y-2">
            {feedback.weaknesses.map((weakness, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-yellow-400 mt-1">•</span>
                <span className="text-gray-300">{weakness}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Improvements */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Actionable Recommendations</h2>
          <ul className="space-y-3">
            {feedback.improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <span className="text-blue-400 font-bold">{idx + 1}.</span>
                <span className="text-gray-300">{improvement}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Learning Roadmap */}
        <Card className="p-6 bg-gray-900 border-gray-800">
          <h2 className="text-xl font-semibold mb-4">📚 Learning Roadmap</h2>
          <div className="prose prose-invert prose-sm max-w-none">
            <div
              className="text-gray-300 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: feedback.learningRoadmap.replace(/\n/g, '<br/>') }}
            />
          </div>
        </Card>

        {/* Suggested Topics */}
        {feedback.suggestedTopics && feedback.suggestedTopics.length > 0 && (
          <Card className="p-6 bg-gray-900 border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Suggested Study Topics</h2>
            <div className="flex flex-wrap gap-2">
              {feedback.suggestedTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => router.push('/interview/setup')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-6"
          >
            Start New Interview
          </Button>
          <Button
            onClick={() => router.push('/interview/history')}
            variant="outline"
            className="flex-1 border-gray-700 hover:bg-gray-800 py-6"
          >
            View History
          </Button>
        </div>
      </div>
    </div>
  );
}

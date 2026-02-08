'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SharedResult {
  session: {
    id: string;
    role: string;
    duration: number;
    status: string;
    createdAt: string;
    transcript: unknown;
  };
  feedback: {
    overallScore: number;
    communicationScore: number;
    technicalScore: number;
    confidenceScore: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    skillRatings: Array<{ skill: string; rating: number; comment?: string }>;
  };
  user: {
    name: string;
    email: string;
  };
  viewCount: number;
}

export default function SharedInterviewPage() {
  const params = useParams();
  const token = params.token as string;

  const [result, setResult] = useState<SharedResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSharedResult() {
      try {
        const response = await fetch(`/api/interview/share?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load shared result');
        }

        setResult(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchSharedResult();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
            {error.includes('expired') && (
              <p className="text-sm text-gray-500 mt-2">
                This shared link has expired. Please request a new link from the interview owner.
              </p>
            )}
          </div>
        </Card>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const { session, feedback, user, viewCount } = result;
  const durationMinutes = Math.round(session.duration / 60);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Interview Results</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{user.name}</span>
          <span>•</span>
          <Badge>{session.role}</Badge>
          <span>•</span>
          <span>{new Date(session.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{viewCount} views</span>
        </div>
      </div>

      {/* Overall Score */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Overall Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {feedback.overallScore}/10
            </div>
            <div className="text-sm text-gray-600">Overall</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-1">
              {feedback.communicationScore}/10
            </div>
            <div className="text-sm text-gray-600">Communication</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-1">
              {feedback.technicalScore}/10
            </div>
            <div className="text-sm text-gray-600">Technical</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-1">
              {feedback.confidenceScore}/10
            </div>
            <div className="text-sm text-gray-600">Confidence</div>
          </div>
        </div>
      </Card>

      {/* Strengths */}
      {feedback.strengths.length > 0 && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            Strengths
          </h2>
          <ul className="space-y-2">
            {feedback.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Areas for Improvement */}
      {feedback.weaknesses.length > 0 && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">
            Areas for Improvement
          </h2>
          <ul className="space-y-2">
            {feedback.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-600 mr-2">→</span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Suggestions */}
      {feedback.suggestions.length > 0 && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Suggestions
          </h2>
          <ul className="space-y-2">
            {feedback.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">💡</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t">
        <p>
          Interview Duration: {durationMinutes} minutes
        </p>
        <p className="mt-2">Powered by PrepWise</p>
      </div>
    </div>
  );
}

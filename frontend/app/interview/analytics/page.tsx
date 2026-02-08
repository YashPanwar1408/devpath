'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';

interface Analytics {
  totalInterviews: number;
  averageScore: number;
  averageCommunication: number;
  averageTechnical: number;
  averageConfidence: number;
  roleStats: Record<string, { count: number; avgScore: number }>;
  monthlyScores: Array<{ month: string; avgScore: number }>;
  topStrengths: string[];
  topWeaknesses: string[];
  improvementTrend: number;
  recentSessions: Array<{
    id: string;
    role: string;
    createdAt: string;
    feedback: {
      overallScore: number;
    };
  }>;
}

export default function AnalyticsPage() {
  const { user } = useUser();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch('/api/interview/analytics');
        const data = await response.json();

        if (data.success) {
          setAnalytics(data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analytics || analytics.totalInterviews === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-2">No Analytics Yet</h2>
          <p className="text-gray-600 mb-6">
            Complete your first interview to see your performance analytics.
          </p>
          <Button onClick={() => (window.location.href = '/interview')}>
            Start Your First Interview
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Performance Analytics</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-1">Total Interviews</div>
          <div className="text-3xl font-bold">{analytics.totalInterviews}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-1">Average Score</div>
          <div className="text-3xl font-bold text-blue-600">
            {analytics.averageScore.toFixed(1)}/10
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-1">Communication</div>
          <div className="text-3xl font-bold text-green-600">
            {analytics.averageCommunication.toFixed(1)}/10
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-600 mb-1">Technical</div>
          <div className="text-3xl font-bold text-purple-600">
            {analytics.averageTechnical.toFixed(1)}/10
          </div>
        </Card>
      </div>

      {/* Improvement Trend */}
      {analytics.totalInterviews >= 10 && (
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Improvement Trend</h2>
          <div className="flex items-center gap-4">
            <div
              className={`text-4xl ${
                analytics.improvementTrend > 0
                  ? 'text-green-600'
                  : analytics.improvementTrend < 0
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              {analytics.improvementTrend > 0 ? '↑' : analytics.improvementTrend < 0 ? '↓' : '→'}
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Math.abs(analytics.improvementTrend).toFixed(2)} points
              </div>
              <div className="text-sm text-gray-600">
                {analytics.improvementTrend > 0
                  ? 'Your recent interviews show improvement!'
                  : analytics.improvementTrend < 0
                  ? 'Keep practicing to improve your scores'
                  : 'Your performance is consistent'}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Role Performance */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Performance by Role</h2>
        <div className="space-y-4">
          {Object.entries(analytics.roleStats).map(([role, stats]) => (
            <div key={role} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge>{role}</Badge>
                <span className="text-sm text-gray-600">
                  {stats.count} interview{stats.count !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-xl font-bold">
                {stats.avgScore.toFixed(1)}/10
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            Top Strengths
          </h2>
          {analytics.topStrengths.length > 0 ? (
            <ul className="space-y-2">
              {analytics.topStrengths.slice(0, 5).map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">
              Complete more interviews to identify your strengths
            </p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">
            Areas to Improve
          </h2>
          {analytics.topWeaknesses.length > 0 ? (
            <ul className="space-y-2">
              {analytics.topWeaknesses.slice(0, 5).map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-600 mr-2">→</span>
                  <span className="text-sm">{weakness}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">
              Complete more interviews to identify areas for improvement
            </p>
          )}
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Interviews</h2>
        <div className="space-y-3">
          {analytics.recentSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Badge>{session.role}</Badge>
                <span className="text-sm text-gray-600">
                  {new Date(session.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="text-lg font-bold">
                {session.feedback.overallScore}/10
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

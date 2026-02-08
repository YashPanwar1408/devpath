'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { InterviewRole } from '@/lib/schemas/interview.schema';

const INTERVIEW_ROLES: { value: InterviewRole; label: string }[] = [
  { value: 'frontend', label: 'Frontend Engineer' },
  { value: 'backend', label: 'Backend Engineer' },
  { value: 'fullstack', label: 'Full-Stack Engineer' },
  { value: 'data-science', label: 'Data Scientist' },
  { value: 'ml-engineer', label: 'ML Engineer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'mobile', label: 'Mobile Developer' },
  { value: 'qa', label: 'QA Engineer' },
  { value: 'system-design', label: 'System Design' },
];

const DURATIONS = [
  { value: '10', label: '10 minutes (Quick)' },
  { value: '15', label: '15 minutes (Standard)' },
  { value: '20', label: '20 minutes (In-depth)' },
];

export default function InterviewSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [role, setRole] = useState<InterviewRole>('fullstack');
  const [resumeSource, setResumeSource] = useState<'existing' | 'upload'>('existing');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [duration, setDuration] = useState<'10' | '15' | '20'>('15');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get resume data
      let resumeData: string;

      if (resumeSource === 'existing') {
        // Load from Zustand store
        const store = await import('@/lib/store/resume.store');
        const currentResume = store.useResumeStore.getState().currentResume;
        resumeData = JSON.stringify(currentResume);
      } else {
        // Upload and parse PDF
        if (!resumeFile) {
          setError('Please select a resume file');
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', resumeFile);

        const parseRes = await fetch('/api/parse-resume', {
          method: 'POST',
          body: formData,
        });

        if (!parseRes.ok) {
          const errorData = await parseRes.json().catch(() => ({}));
          const errorMessage = errorData.error || errorData.details || 'Failed to parse resume';
          throw new Error(errorMessage);
        }

        const parsed = await parseRes.json();
        resumeData = JSON.stringify(parsed.resume);
      }

      // Create interview session
      const response = await fetch('/api/interview/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          duration: parseInt(duration),
          resumeData,
          jobDescription: jobDescription || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create interview');
      }

      const data = await response.json();

      // Navigate to interview room
      router.push(`/interview/room/${data.sessionId}`);
    } catch (err) {
      console.error('Setup error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">AI Mock Interview</h1>
          <p className="text-gray-400 mt-2">
            Practice technical interviews with AI-powered feedback and real-time voice interaction
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Role Selection */}
          <Card className="p-6 bg-gray-900 border-gray-800">
            <label className="block text-lg font-semibold mb-4">Interview Role</label>
            <div className="grid grid-cols-3 gap-3">
              {INTERVIEW_ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    role === r.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                  }`}
                >
                  <div className="font-semibold">{r.label}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Resume Source */}
          <Card className="p-6 bg-gray-900 border-gray-800">
            <label className="block text-lg font-semibold mb-4">Resume</label>
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setResumeSource('existing')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  resumeSource === 'existing'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                }`}
              >
                <div className="font-semibold">Use Existing Resume</div>
                <div className="text-sm text-gray-400 mt-1">From your Resume Builder</div>
              </button>
              <button
                type="button"
                onClick={() => setResumeSource('upload')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  resumeSource === 'upload'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                }`}
              >
                <div className="font-semibold">Upload PDF</div>
                <div className="text-sm text-gray-400 mt-1">Upload a resume file</div>
              </button>
            </div>

            {resumeSource === 'upload' && (
              <div>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="bg-gray-800 border-gray-700"
                />
                {resumeFile && (
                  <p className="text-sm text-green-400 mt-2">✓ {resumeFile.name}</p>
                )}
              </div>
            )}
          </Card>

          {/* Job Description (Optional) */}
          <Card className="p-6 bg-gray-900 border-gray-800">
            <label className="block text-lg font-semibold mb-2">
              Job Description <span className="text-gray-500 text-sm font-normal">(Optional)</span>
            </label>
            <p className="text-sm text-gray-400 mb-4">
              Paste the job description to tailor interview questions
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Card>

          {/* Duration */}
          <Card className="p-6 bg-gray-900 border-gray-800">
            <label className="block text-lg font-semibold mb-4">Interview Duration</label>
            <div className="grid grid-cols-3 gap-3">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDuration(d.value as '10' | '15' | '20')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    duration === d.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                  }`}
                >
                  <div className="font-semibold">{d.label}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || (resumeSource === 'upload' && !resumeFile)}
            className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Starting Interview...' : 'Start Interview →'}
          </Button>
        </form>
      </div>
    </div>
  );
}

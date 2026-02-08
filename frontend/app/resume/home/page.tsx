'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function ResumeHome() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <Link href="/dashboard" className="text-gray-400 hover:text-white mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
            Resume Builder & ATS Optimizer
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create ATS-friendly resumes or optimize your existing one with AI-powered insights
          </p>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Upload Resume */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 hover:bg-white/10 transition-all group">
            <div className="flex flex-col h-full">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold mb-3">Upload Existing Resume</h2>
              <p className="text-gray-400 mb-6 grow">
                Have a resume already? Upload your PDF and we&apos;ll parse it automatically,
                then help you optimize it for ATS systems.
              </p>

              <ul className="space-y-2 mb-6 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI-powered text extraction
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant ATS scoring
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Keyword optimization suggestions
                </li>
              </ul>

              <Link href="/resume/upload" className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-6 text-lg">
                  Upload Resume →
                </Button>
              </Link>
            </div>
          </Card>

          {/* Create New Resume */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 hover:bg-white/10 transition-all group">
            <div className="flex flex-col h-full">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold mb-3">Create New Resume</h2>
              <p className="text-gray-400 mb-6 grow">
                Start from scratch with our intuitive resume builder.
                Real-time preview and professional templates included.
              </p>

              <ul className="space-y-2 mb-6 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Professional templates
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Live preview as you type
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Export to PDF instantly
                </li>
              </ul>

              <Link href="/resume/editor" className="w-full">
                <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 text-lg">
                  Create New Resume →
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Use Our Resume Builder?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">ATS Optimized</h3>
              <p className="text-sm text-gray-400">
                Beat applicant tracking systems with optimized formatting
              </p>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-400">
                Get intelligent suggestions for improvements
              </p>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Real-time Score</h3>
              <p className="text-sm text-gray-400">
                See your ATS score update as you edit
              </p>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Easy Export</h3>
              <p className="text-sm text-gray-400">
                Download professional PDF with one click
              </p>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">95%</div>
            <p className="text-gray-400">Average ATS Score Improvement</p>
          </Card>
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">50K+</div>
            <p className="text-gray-400">Resumes Created</p>
          </Card>
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">3min</div>
            <p className="text-gray-400">Average Build Time</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

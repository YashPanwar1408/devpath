'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface Solution {
  brute?: {
    intuition: string;
    algorithm: string;
    complexity: string | {
      time: string;
      space: string;
      timeExplanation?: string;
      spaceExplanation?: string;
    };
    code: {
      java?: string;
      python?: string;
      cpp?: string;
      javascript?: string;
    };
  };
  optimized?: {
    intuition: string;
    algorithm: string;
    complexity: string | {
      time: string;
      space: string;
      timeExplanation?: string;
      spaceExplanation?: string;
    };
    code: {
      java?: string;
      python?: string;
      cpp?: string;
      javascript?: string;
    };
  };
}

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  description: string;
  examples: Example[];
  constraints: string[];
  solutions: Solution;
}

const difficultyColors = {
  Easy: 'text-green-400 bg-green-500/10 border-green-500/30',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  Hard: 'text-red-400 bg-red-500/10 border-red-500/30',
};

// Helper function to parse complexity (handles both string and object formats)
const parseComplexity = (complexity: string | { time: string; space: string; timeExplanation?: string; spaceExplanation?: string } | undefined) => {
  if (!complexity) {
    return { time: 'N/A', space: 'N/A' };
  }

  if (typeof complexity === 'string') {
    // Parse from string format like "Time: O(N^2), Space: O(1)"
    const timeMatch = complexity.match(/Time:\s*([^,]+)/i);
    const spaceMatch = complexity.match(/Space:\s*(.+)/i);
    return {
      time: timeMatch ? timeMatch[1].trim() : complexity,
      space: spaceMatch ? spaceMatch[1].trim() : 'N/A',
    };
  }

  return complexity;
};

export default function SolutionPage() {
  const params = useParams();
  const slug = params?.id as string;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [bruteLanguage, setBruteLanguage] = useState('python');
  const [optimizedLanguage, setOptimizedLanguage] = useState('python');
  const [copiedBrute, setCopiedBrute] = useState(false);
  const [copiedOptimized, setCopiedOptimized] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/dsa/problems/${slug}`);
        const data = await response.json();
        setProblem(data);
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProblem();
  }, [slug]);

  const copyCode = (code: string, type: 'brute' | 'optimized') => {
    navigator.clipboard.writeText(code);
    if (type === 'brute') {
      setCopiedBrute(true);
      setTimeout(() => setCopiedBrute(false), 2000);
    } else {
      setCopiedOptimized(true);
      setTimeout(() => setCopiedOptimized(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Problem Not Found</h1>
          <Link href="/dsa/practice" className="text-blue-400 hover:underline">
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  const languages = ['python', 'java', 'cpp', 'javascript'];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Navigation */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/dsa/practice"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Back to Problems
          </Link>
          <Link
            href={`/dsa/solve/${slug}`}
            className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Solve Problem
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Problem Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold">{problem.title}</h1>
            <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${difficultyColors[problem.difficulty as keyof typeof difficultyColors]}`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Problem Description Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-left hover:bg-slate-900/70 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-blue-400">📋</span>
                Problem Description
              </h2>
              {showDescription ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </div>
          </button>

          {showDescription && (
            <div className="mt-4 bg-slate-900/30 border border-slate-700 rounded-xl p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Description</h3>
                <div 
                  className="problem-content text-gray-300"
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              </div>

              {/* Examples */}
              {problem.examples && problem.examples.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Examples</h3>
                  <div className="space-y-4">
                    {problem.examples.map((example: Example, idx: number) => (
                      <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                        <p className="font-semibold text-green-400 mb-2">Example {idx + 1}:</p>
                        <div className="space-y-2 font-mono text-sm">
                          <div>
                            <span className="text-gray-400">Input:</span>{' '}
                            <span className="text-blue-300">{typeof example.input === 'string' ? example.input : JSON.stringify(example.input)}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Output:</span>{' '}
                            <span className="text-green-300">{typeof example.output === 'string' ? example.output : JSON.stringify(example.output)}</span>
                          </div>
                          {example.explanation && (
                            <div>
                              <span className="text-gray-400">Explanation:</span>{' '}
                              <div 
                                className="text-gray-300 inline"
                                dangerouslySetInnerHTML={{ __html: example.explanation }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Constraints */}
              {problem.constraints && problem.constraints.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">Constraints</h3>
                  <ul className="space-y-2 text-gray-300">
                    {problem.constraints.map((constraint: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span 
                          className="font-mono text-sm"
                          dangerouslySetInnerHTML={{ __html: constraint }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Solutions Section */}
        <div className="space-y-12">
          {/* No Solutions Message */}
          {(!problem.solutions || (!problem.solutions.brute && !problem.solutions.optimized)) && (
            <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-2">Solution Coming Soon</h2>
              <p className="text-gray-400">
                We&apos;re working on adding a detailed solution for this problem. Check back later!
              </p>
            </div>
          )}

          {/* Brute Force Approach */}
          {problem.solutions?.brute && (
            <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h2 className="text-3xl font-bold">Brute Force Approach</h2>
              </div>

              {/* Intuition */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-orange-400 flex items-center gap-2">
                  💡 Intuition
                </h3>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <div 
                    className="problem-content text-gray-300"
                    dangerouslySetInnerHTML={{ __html: typeof problem.solutions.brute.intuition === 'string' && problem.solutions.brute.intuition.includes('<') ? problem.solutions.brute.intuition : `<p>${problem.solutions.brute.intuition}</p>` }}
                  />
                </div>
              </div>

              {/* Algorithm */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-orange-400 flex items-center gap-2">
                  📝 Algorithm
                </h3>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  {Array.isArray(problem.solutions.brute.algorithm) ? (
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                      {problem.solutions.brute.algorithm.map((step: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  ) : (
                    <div 
                      className="problem-content text-gray-300"
                      dangerouslySetInnerHTML={{ __html: typeof problem.solutions.brute.algorithm === 'string' && problem.solutions.brute.algorithm.includes('<') ? problem.solutions.brute.algorithm : `<p>${problem.solutions.brute.algorithm}</p>` }}
                    />
                  )}
                </div>
              </div>

              {/* Complexity */}
              {(() => {
                const bruteComplexity = parseComplexity(problem.solutions.brute?.complexity);
                return (
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">⏱️</span>
                        <h4 className="font-semibold">Time Complexity</h4>
                      </div>
                      <code className="text-xl font-bold text-blue-400 block mb-1">
                        {bruteComplexity.time}
                      </code>
                      {'timeExplanation' in bruteComplexity && bruteComplexity.timeExplanation && (
                        <p className="text-gray-400 text-sm">{bruteComplexity.timeExplanation}</p>
                      )}
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">💾</span>
                        <h4 className="font-semibold">Space Complexity</h4>
                      </div>
                      <code className="text-xl font-bold text-purple-400 block mb-1">
                        {bruteComplexity.space}
                      </code>
                      {'spaceExplanation' in bruteComplexity && bruteComplexity.spaceExplanation && (
                        <p className="text-gray-400 text-sm">{bruteComplexity.spaceExplanation}</p>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Code */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-400 flex items-center gap-2">
                  💻 Implementation
                </h3>

                {/* Language Tabs */}
                <div className="flex gap-2 mb-3">
                  {languages.map((lang) => (
                    problem.solutions.brute?.code?.[lang as keyof typeof problem.solutions.brute.code] && (
                      <button
                        key={lang}
                        onClick={() => setBruteLanguage(lang)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${bruteLanguage === lang
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                          }`}
                      >
                        {lang === 'cpp' ? 'C++' : lang}
                      </button>
                    )
                  ))}
                </div>

                <div className="relative group">
                  <button
                    onClick={() => copyCode(problem.solutions.brute?.code?.[bruteLanguage as keyof typeof problem.solutions.brute.code] || '', 'brute')}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-gray-300 hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-2 z-10"
                  >
                    {copiedBrute ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedBrute ? 'Copied!' : 'Copy'}
                  </button>

                  <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                    <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
                      <span className="text-sm font-medium text-gray-400 capitalize">
                        {bruteLanguage === 'cpp' ? 'C++' : bruteLanguage}
                      </span>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-gray-300 leading-relaxed">
                        {problem.solutions.brute?.code?.[bruteLanguage as keyof typeof problem.solutions.brute.code] || '// Code not available'}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Optimized Approach */}
          {problem.solutions?.optimized && (
            <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h2 className="text-3xl font-bold">Optimized Approach</h2>
              </div>

              {/* Intuition */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-green-400 flex items-center gap-2">
                  💡 Intuition
                </h3>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <div 
                    className="problem-content text-gray-300"
                    dangerouslySetInnerHTML={{ __html: typeof problem.solutions.optimized.intuition === 'string' && problem.solutions.optimized.intuition.includes('<') ? problem.solutions.optimized.intuition : `<p>${problem.solutions.optimized.intuition}</p>` }}
                  />
                </div>
              </div>

              {/* Algorithm */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-green-400 flex items-center gap-2">
                  📝 Algorithm
                </h3>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  {Array.isArray(problem.solutions.optimized.algorithm) ? (
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                      {problem.solutions.optimized.algorithm.map((step: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  ) : (
                    <div 
                      className="problem-content text-gray-300"
                      dangerouslySetInnerHTML={{ __html: typeof problem.solutions.optimized.algorithm === 'string' && problem.solutions.optimized.algorithm.includes('<') ? problem.solutions.optimized.algorithm : `<p>${problem.solutions.optimized.algorithm}</p>` }}
                    />
                  )}
                </div>
              </div>

              {/* Complexity */}
              {(() => {
                const optimizedComplexity = parseComplexity(problem.solutions.optimized?.complexity);
                return (
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">⏱️</span>
                        <h4 className="font-semibold">Time Complexity</h4>
                      </div>
                      <code className="text-xl font-bold text-blue-400 block mb-1">
                        {optimizedComplexity.time}
                      </code>
                      {'timeExplanation' in optimizedComplexity && optimizedComplexity.timeExplanation && (
                        <p className="text-gray-400 text-sm">{optimizedComplexity.timeExplanation}</p>
                      )}
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">💾</span>
                        <h4 className="font-semibold">Space Complexity</h4>
                      </div>
                      <code className="text-xl font-bold text-purple-400 block mb-1">
                        {optimizedComplexity.space}
                      </code>
                      {'spaceExplanation' in optimizedComplexity && optimizedComplexity.spaceExplanation && (
                        <p className="text-gray-400 text-sm">{optimizedComplexity.spaceExplanation}</p>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Code */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-green-400 flex items-center gap-2">
                  💻 Implementation
                </h3>

                {/* Language Tabs */}
                <div className="flex gap-2 mb-3">
                  {languages.map((lang) => (
                    problem.solutions.optimized?.code?.[lang as keyof typeof problem.solutions.optimized.code] && (
                      <button
                        key={lang}
                        onClick={() => setOptimizedLanguage(lang)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${optimizedLanguage === lang
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                          }`}
                      >
                        {lang === 'cpp' ? 'C++' : lang}
                      </button>
                    )
                  ))}
                </div>

                <div className="relative group">
                  <button
                    onClick={() => copyCode(problem.solutions.optimized?.code?.[optimizedLanguage as keyof typeof problem.solutions.optimized.code] || '', 'optimized')}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-gray-300 hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-2 z-10"
                  >
                    {copiedOptimized ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedOptimized ? 'Copied!' : 'Copy'}
                  </button>

                  <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                    <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
                      <span className="text-sm font-medium text-gray-400 capitalize">
                        {optimizedLanguage === 'cpp' ? 'C++' : optimizedLanguage}
                      </span>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm font-mono text-gray-300 leading-relaxed">
                        {problem.solutions.optimized?.code?.[optimizedLanguage as keyof typeof problem.solutions.optimized.code] || '// Code not available'}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-slate-700 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to solve it yourself?</h3>
          <p className="text-gray-400 mb-6">Apply what you&apos;ve learned and practice this problem</p>
          <Link
            href={`/dsa/solve/${slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25"
          >
            Start Solving
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

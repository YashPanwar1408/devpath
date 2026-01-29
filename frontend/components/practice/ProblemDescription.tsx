'use client';

import React from 'react';

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  description: string;
  examples: Example[];
  constraints: string[];
  pattern: string;
}

interface ProblemDescriptionProps {
  problem: Problem;
}

export default function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const difficultyColor = {
    Easy: 'text-green-400 bg-green-500/10 border border-green-500/30',
    Medium: 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/30',
    Hard: 'text-red-400 bg-red-500/10 border border-red-500/30',
  }[problem.difficulty] || 'text-gray-400 bg-gray-500/10 border border-gray-500/30';

  return (
    <div className="h-full flex flex-col bg-slate-900">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          
          {/* Title & Difficulty */}
          <div>
            <h1 className="text-2xl font-bold mb-3">{problem.title}</h1>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
                {problem.difficulty}
              </span>
              <span className="text-sm text-slate-400">{problem.pattern}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-800/50 rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-3 text-white">Description</h2>
            <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">
              {problem.description}
            </p>
          </div>

          {/* Examples */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">Examples</h2>
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <p className="text-xs font-semibold text-slate-400 mb-3">Example {idx + 1}</p>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="flex">
                      <span className="text-slate-400 w-20 shrink-0">Input:</span>
                      <code className="text-blue-300 break-all">{example.input}</code>
                    </div>
                    <div className="flex">
                      <span className="text-slate-400 w-20 shrink-0">Output:</span>
                      <code className="text-green-300 break-all">{example.output}</code>
                    </div>
                    {example.explanation && (
                      <div className="flex pt-2 border-t border-slate-700/50 mt-2">
                        <span className="text-slate-400 w-20 shrink-0 text-xs">Explain:</span>
                        <p className="text-slate-300 text-xs leading-relaxed">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">Constraints</h2>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <ul className="space-y-2">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                    <code className="text-xs leading-relaxed break-all">{constraint}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

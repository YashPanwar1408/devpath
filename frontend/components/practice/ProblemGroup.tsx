'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import ProblemRow from './ProblemRow';

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  pattern: string;
  order: number;
  solved: boolean;
  starred: boolean;
}

interface ProblemGroupProps {
  pattern: string;
  problems: Problem[];
  category?: string;
  targetCount?: number;
  onToggleSolved: (problemId: string) => void;
  onToggleStarred: (problemId: string) => void;
}

export default function ProblemGroup({ 
  pattern, 
  problems, 
  category, 
  targetCount,
  onToggleSolved,
  onToggleStarred 
}: ProblemGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  const solvedCount = problems.filter(p => p.solved).length;
  const progressPercentage = Math.round((solvedCount / problems.length) * 100);

  return (
    <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden mb-4">
      {/* Group Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-white">
                {pattern}
              </h3>
              {category && (
                <span className="text-xs px-2 py-1 rounded-md bg-slate-800/50 text-gray-400 border border-slate-700/50">
                  {category}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Progress: {solvedCount} / {problems.length}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </button>

      {/* Problems Table */}
      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-slate-800/50">
              <tr className="text-sm text-gray-400">
                <th className="w-20 px-6 py-3 text-center font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Problem</th>
                <th className="w-32 px-6 py-3 text-center font-medium">Difficulty</th>
                <th className="w-28 px-6 py-3 text-center font-medium">Solution</th>
                <th className="w-24 px-6 py-3 text-center font-medium">Star</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <ProblemRow 
                  key={problem.id} 
                  problem={problem}
                  onToggleSolved={onToggleSolved}
                  onToggleStarred={onToggleStarred}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

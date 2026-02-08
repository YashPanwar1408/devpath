'use client';

import { CheckCircle2, Circle, FileText, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

interface ProblemRowProps {
  problem: Problem;
  onToggleSolved: (problemId: string) => void;
  onToggleStarred: (problemId: string) => void;
}

export default function ProblemRow({ problem, onToggleSolved, onToggleStarred }: ProblemRowProps) {
  const router = useRouter();

  const difficultyColor = {
    Easy: 'text-green-500',
    Medium: 'text-yellow-500',
    Hard: 'text-red-500',
  }[problem.difficulty] || 'text-gray-500';

  const handleViewSolution = () => {
    router.push(`/dsa/solution/${problem.slug}`);
  };

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
      {/* Status */}
      <td className="w-20 px-6 py-4 text-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleSolved(problem.id);
          }}
          className="mx-auto cursor-pointer"
        >
          {problem.solved ? (
            <CheckCircle2 className="w-5 h-5 text-green-500 hover:text-green-400 transition-colors" />
          ) : (
            <Circle className="w-5 h-5 text-gray-600 hover:text-gray-400 transition-colors" />
          )}
        </button>
      </td>

      {/* Problem Title */}
      <td className="px-6 py-4">
        <Link
          href={`/dsa/solve/${problem.slug}`}
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          {problem.title}
        </Link>
      </td>

      {/* Difficulty */}
      <td className="w-32 px-6 py-4 text-center">
        <span className={`font-medium ${difficultyColor}`}>{problem.difficulty}</span>
      </td>

      {/* Solution */}
      <td className="w-28 px-6 py-4 text-center">
        <button 
          onClick={handleViewSolution}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          title="View Solution"
        >
          <FileText className="w-5 h-5 text-gray-400 hover:text-white" />
        </button>
      </td>

      {/* Star */}
      <td className="w-24 px-6 py-4 text-center">
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleStarred(problem.id);
          }}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          title="Star this problem"
        >
          <Star className={`w-5 h-5 transition-colors ${
            problem.starred 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-400 hover:text-yellow-400'
          }`} />
        </button>
      </td>
    </tr>
  );
}

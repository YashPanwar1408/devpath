'use client';

import { CheckCircle2, Circle, FileText, Star } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  pattern: string;
  order: number;
  progress: {
    status: string;
    starred?: boolean;
  } | null;
}

interface ProblemRowProps {
  problem: Problem;
  index?: number;
  onRefresh?: () => void;
}

// TODO: Replace with actual userId from auth
const TEMP_USER_ID = 'temp-user-123';

export default function ProblemRow({ problem, onRefresh }: ProblemRowProps) {
  const router = useRouter();
  const [isSolved, setIsSolved] = useState(problem.progress?.status === 'solved');
  const [isStarred, setIsStarred] = useState(problem.progress?.starred || false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync with prop changes when problem data is refreshed
  useEffect(() => {
    console.log(`Problem ${problem.title}: progress =`, problem.progress);
    setIsSolved(problem.progress?.status === 'solved');
    setIsStarred(problem.progress?.starred || false);
  }, [problem.progress, problem.title]);

  const difficultyColor = {
    Easy: 'text-green-500',
    Medium: 'text-yellow-500',
    Hard: 'text-red-500',
  }[problem.difficulty] || 'text-gray-500';

  const handleStatusToggle = async () => {
    setIsUpdating(true);
    const newStatus = isSolved ? 'unsolved' : 'solved';
    
    // Optimistic update
    setIsSolved(!isSolved);

    try {
      const response = await fetch('http://localhost:5000/api/progress/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: TEMP_USER_ID,
          problemId: problem.id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Failed to update status:', errorData);
        // Revert on error
        setIsSolved(isSolved);
      } else {
        const data = await response.json();
        console.log('Status updated successfully:', data);
        // Refresh the problems list to update stats
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      // Revert on error
      console.error('Error updating status:', error);
      setIsSolved(isSolved);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStarToggle = async () => {
    // Optimistic update
    const newStarred = !isStarred;
    setIsStarred(newStarred);

    try {
      const response = await fetch('http://localhost:5000/api/progress/star', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: TEMP_USER_ID,
          problemId: problem.id,
          starred: newStarred,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Failed to toggle star:', errorData);
        // Revert on error
        setIsStarred(isStarred);
      } else {
        const data = await response.json();
        console.log('Star toggled successfully:', data);
        // Refresh the problems list to update stats
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error) {
      // Revert on error
      console.error('Error toggling star:', error);
      setIsStarred(isStarred);
    }
  };

  const handleViewSolution = () => {
    router.push(`/dsa/solution/${problem.slug}`);
  };

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
      {/* Status */}
      <td className="w-20 px-6 py-4 text-center">
        <button
          onClick={handleStatusToggle}
          disabled={isUpdating}
          className="mx-auto cursor-pointer disabled:opacity-50"
        >
          {isSolved ? (
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
          onClick={handleStarToggle}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          title="Star this problem"
        >
          <Star className={`w-5 h-5 transition-colors ${
            isStarred 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-400 hover:text-yellow-400'
          }`} />
        </button>
      </td>
    </tr>
  );
}

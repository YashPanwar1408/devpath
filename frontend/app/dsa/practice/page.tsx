'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import { useUser } from '@clerk/nextjs';
import PracticeHeader from '@/components/practice/PracticeHeader';
import PracticeFilters from '@/components/practice/PracticeFilters';
import ProblemGroup from '@/components/practice/ProblemGroup';

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  pattern: string;
  sheets: string[];
  order: number;
  solved: boolean;
  starred: boolean;
}

interface BackendProblem extends Problem {
  progress?: {
    status?: string | null;
    starred?: boolean | null;
  } | null;
}

interface PatternMetadata {
  title: string;
  category: string;
  targetCount: number;
  order: number;
}

type StatusFilter = 'all' | 'solved' | 'unsolved' | 'starred';

function PracticePageContent() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const sheet = searchParams.get('sheet') || '75';
  const searchFilter = searchParams.get('search') || '';
  const difficultyFilter = searchParams.get('difficulty') || 'All';
  const patternFilter = searchParams.get('pattern') || 'All';

  const [mounted, setMounted] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [patterns, setPatterns] = useState<Record<string, PatternMetadata>>({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const userId = user?.id;

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchPatterns = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dsa/patterns');
      const data = await response.json();
      const patternMap = data.reduce((acc: Record<string, PatternMetadata>, p: PatternMetadata) => {
        acc[p.title] = p;
        return acc;
      }, {} as Record<string, PatternMetadata>);
      setPatterns(patternMap);
    } catch (error) {
      console.error('Error fetching patterns:', error);
    }
  }, []);

  const fetchProblems = useCallback(async () => {
    try {
      if (!userId) return;
      setLoading(true);
      const params = new URLSearchParams({ sheet, userId });
      const response = await fetch(`http://localhost:5000/api/dsa/problems?${params}`);
      const data = await response.json();
      const problemsArray = Array.isArray(data) ? data : (data.problems || []);
      
      const normalized = problemsArray.map((p: BackendProblem) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        pattern: p.pattern,
        sheets: p.sheets,
        order: p.order,
        solved: p.progress?.status === 'solved',
        starred: p.progress?.starred || false,
      }));
      
      setProblems(normalized);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  }, [sheet, userId]);

  useEffect(() => {
    fetchPatterns();
    fetchProblems();
  }, [fetchPatterns, fetchProblems]);

  const toggleSolved = useCallback((problemId: string) => {
    if (!userId) return;
    const currentProblem = problems.find(p => p.id === problemId);
    if (!currentProblem) return;
    const newSolvedState = !currentProblem.solved;

    setProblems(prev => prev.map(p => 
      p.id === problemId ? { ...p, solved: newSolvedState } : p
    ));

    fetch('http://localhost:5000/api/dsa/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, problemId, solved: newSolvedState }),
    }).catch(err => {
      console.error('Failed to update solved status:', err);
      setProblems(prev => prev.map(p => 
        p.id === problemId ? { ...p, solved: !newSolvedState } : p
      ));
    });
  }, [problems, userId]);

  const toggleStarred = useCallback((problemId: string) => {
    if (!userId) return;
    const currentProblem = problems.find(p => p.id === problemId);
    if (!currentProblem) return;
    const newStarredState = !currentProblem.starred;

    setProblems(prev => prev.map(p => 
      p.id === problemId ? { ...p, starred: newStarredState } : p
    ));

    fetch('http://localhost:5000/api/dsa/star', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, problemId, starred: newStarredState }),
    }).catch(err => {
      console.error('Failed to update starred status:', err);
      setProblems(prev => prev.map(p => 
        p.id === problemId ? { ...p, starred: !newStarredState } : p
      ));
    });
  }, [problems, userId]);

  const availablePatterns = useMemo(() => {
    const uniquePatterns = Array.from(new Set(problems.map(p => p.pattern).filter(Boolean))).sort();
    return ['All', ...uniquePatterns];
  }, [problems]);

  const filteredProblems = useMemo(() => {
    let result = problems;

    if (searchFilter) {
      result = result.filter(p => p.title.toLowerCase().includes(searchFilter.toLowerCase()));
    }
    if (difficultyFilter !== 'All') {
      result = result.filter(p => p.difficulty === difficultyFilter);
    }
    if (patternFilter !== 'All') {
      result = result.filter(p => p.pattern === patternFilter);
    }
    if (statusFilter === 'solved') {
      result = result.filter(p => p.solved);
    } else if (statusFilter === 'unsolved') {
      result = result.filter(p => !p.solved);
    } else if (statusFilter === 'starred') {
      result = result.filter(p => p.starred);
    }

    return result;
  }, [problems, searchFilter, difficultyFilter, patternFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: problems.length,
    solved: problems.filter(p => p.solved).length,
    easy: {
      total: problems.filter(p => p.difficulty === 'Easy').length,
      solved: problems.filter(p => p.difficulty === 'Easy' && p.solved).length,
    },
    medium: {
      total: problems.filter(p => p.difficulty === 'Medium').length,
      solved: problems.filter(p => p.difficulty === 'Medium' && p.solved).length,
    },
    hard: {
      total: problems.filter(p => p.difficulty === 'Hard').length,
      solved: problems.filter(p => p.difficulty === 'Hard' && p.solved).length,
    },
  }), [problems]);

  const handleRandomProblem = useCallback((mode: 'Unsolved' | 'Starred') => {
    let candidates = filteredProblems;

    if (mode === 'Unsolved') {
      candidates = candidates.filter(p => !p.solved);
    } else if (mode === 'Starred') {
      candidates = candidates.filter(p => p.starred);
    }

    if (candidates.length > 0) {
      const random = candidates[Math.floor(Math.random() * candidates.length)];
      router.push(`/dsa/solve/${random.slug}`);
    } else {
      alert(`No ${mode.toLowerCase()} problems found in current filters!`);
    }
  }, [filteredProblems, router]);

  const handleSheetChange = (newSheet: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sheet', newSheet);
    router.push(`?${params.toString()}`);
  };

  const groupedProblems = useMemo(() => {
    return filteredProblems.reduce((acc, problem) => {
      if (!acc[problem.pattern]) acc[problem.pattern] = [];
      acc[problem.pattern].push(problem);
      return acc;
    }, {} as Record<string, Problem[]>);
  }, [filteredProblems]);

  if (!mounted || !isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Please sign in to access DSA practice.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="relative max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">DSA Practice</h1>
            <p className="text-gray-400">Master patterns through curated problem sheets</p>
          </div>
          <div className="flex gap-3">
            {[
              { id: '75', label: 'DSA 75', desc: 'Core' }, 
              { id: '150', label: 'DSA 150', desc: 'Interview-Ready' }, 
              { id: '250', label: 'DSA 250', desc: 'Mastery' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => handleSheetChange(s.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  sheet === s.id 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white border border-slate-700'
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold">{s.label}</span>
                  <span className="text-xs opacity-75">{s.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <PracticeHeader sheet={sheet} onSheetChange={() => {}} stats={stats} />
        
        <PracticeFilters 
          onRandomProblem={handleRandomProblem}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          availablePatterns={availablePatterns}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No problems found</p>
            <p className="text-sm text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedProblems)
              .filter(([_, patternProblems]) => patternProblems.length > 0)
              .sort(([a], [b]) => (patterns[a]?.order || 999) - (patterns[b]?.order || 999))
              .map(([pattern, patternProblems]) => (
                <ProblemGroup 
                  key={pattern} 
                  pattern={pattern} 
                  problems={patternProblems}
                  category={patterns[pattern]?.category}
                  targetCount={patterns[pattern]?.targetCount}
                  onToggleSolved={toggleSolved}
                  onToggleStarred={toggleStarred}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DSAPracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    }>
      <PracticePageContent />
    </Suspense>
  );
}

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, Suspense } from 'react';
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
  progress: {
    status: string;
    starred?: boolean;
  } | null;
}

interface PatternMetadata {
  title: string;
  category: string;
  targetCount: number;
  order: number;
}

interface PatternResponse {
  title: string;
  category: string;
  targetCount: number;
  order: number;
}

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sheet = searchParams.get('sheet') || '75';
  
  const [mounted, setMounted] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [patterns, setPatterns] = useState<Record<string, PatternMetadata>>({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    difficulty: 'All',
    pattern: 'All',
    status: 'All',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch patterns metadata
  const fetchPatterns = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dsa/patterns');
      const data: PatternResponse[] = await response.json();
      const patternMap = data.reduce((acc: Record<string, PatternMetadata>, p: PatternResponse) => {
        acc[p.title] = {
          title: p.title,
          category: p.category,
          targetCount: p.targetCount,
          order: p.order,
        };
        return acc;
      }, {});
      setPatterns(patternMap);
    } catch (error) {
      console.error('Error fetching patterns:', error);
    }
  }, []);

  // Fetch problems for selected sheet
  const fetchProblems = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ 
        sheet,
        userId: 'temp-user-123' // TODO: Replace with actual user ID from auth
      });
      
      const response = await fetch(`http://localhost:5000/api/dsa/problems?${params}`);
      const data = await response.json();
      const problemsArray = Array.isArray(data) ? data : (data.problems || []);
      console.log(`Fetched ${problemsArray.length} problems with userId`, problemsArray.slice(0, 2));
      setProblems(problemsArray);
      setFilteredProblems(problemsArray);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  }, [sheet]);

  useEffect(() => {
    fetchPatterns();
  }, [fetchPatterns]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  // Apply client-side filters
  useEffect(() => {
    let filtered = problems;

    if (filters.search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.difficulty !== 'All') {
      filtered = filtered.filter(p => p.difficulty === filters.difficulty);
    }

    if (filters.pattern !== 'All') {
      filtered = filtered.filter(p => p.pattern === filters.pattern);
    }

    if (filters.status !== 'All') {
      if (filters.status === 'Solved') {
        filtered = filtered.filter(p => p.progress?.status === 'solved');
      } else if (filters.status === 'Unsolved') {
        filtered = filtered.filter(p => !p.progress || p.progress.status !== 'solved');
      } else if (filters.status === 'Starred') {
        filtered = filtered.filter(p => p.progress?.starred === true);
      }
    }

    setFilteredProblems(filtered);
  }, [problems, filters]);

  // Handle filter change
  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  // Refresh problems after status/star update
  const refreshProblems = useCallback(async () => {
    try {
      const params = new URLSearchParams({ 
        sheet,
        userId: 'temp-user-123' // TODO: Replace with actual user ID from auth
      });
      const response = await fetch(`http://localhost:5000/api/dsa/problems?${params}`);
      const data = await response.json();
      const problemsArray = Array.isArray(data) ? data : (data.problems || []);
      console.log(`Refreshed ${problemsArray.length} problems`, problemsArray.slice(0, 2));
      setProblems(problemsArray);
    } catch (error) {
      console.error('Error refreshing problems:', error);
    }
  }, [sheet]);

  // Calculate stats
  const stats = {
    total: problems.length,
    solved: problems.filter((p) => p.progress?.status === 'solved').length,
    easy: {
      total: problems.filter((p) => p.difficulty === 'Easy').length,
      solved: problems.filter((p) => p.difficulty === 'Easy' && p.progress?.status === 'solved').length,
    },
    medium: {
      total: problems.filter((p) => p.difficulty === 'Medium').length,
      solved: problems.filter((p) => p.difficulty === 'Medium' && p.progress?.status === 'solved').length,
    },
    hard: {
      total: problems.filter((p) => p.difficulty === 'Hard').length,
      solved: problems.filter((p) => p.difficulty === 'Hard' && p.progress?.status === 'solved').length,
    },
  };

  // Group problems by pattern
  const groupedProblems = filteredProblems.reduce((acc, problem) => {
    if (!acc[problem.pattern]) {
      acc[problem.pattern] = [];
    }
    acc[problem.pattern].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);

  // Handle random problem
  const handleRandomProblem = useCallback((mode: 'Unsolved' | 'Starred' | 'Any') => {
    let candidateProblems: Problem[] = [];

    // Use full problems list, not filtered
    if (mode === 'Unsolved') {
      candidateProblems = problems.filter((p) => !p.progress || p.progress.status !== 'solved');
    } else if (mode === 'Starred') {
      candidateProblems = problems.filter((p) => p.progress?.starred === true);
    } else {
      candidateProblems = problems;
    }

    console.log(`Random ${mode}: Found ${candidateProblems.length} candidates out of ${problems.length} total`);

    if (candidateProblems.length > 0) {
      const random = candidateProblems[Math.floor(Math.random() * candidateProblems.length)];
      console.log(`Selected: ${random.title} (starred: ${random.progress?.starred}, status: ${random.progress?.status})`);
      router.push(`/dsa/solve/${random.slug}`);
    } else {
      alert(`No ${mode.toLowerCase()} problems found!`);
    }
  }, [problems, router]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.08),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto space-y-6">
        {/* Header with Sheet Selector */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              DSA Practice
            </h1>
            <p className="text-gray-400">Master patterns through curated problem sheets</p>
          </div>

          {/* Sheet Tabs */}
          <div className="flex gap-3">
            {[
              { id: '75', label: 'DSA 75', desc: 'Core' },
              { id: '150', label: 'DSA 150', desc: 'Interview-Ready' },
              { id: '250', label: 'DSA 250', desc: 'Mastery' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => router.push(`/dsa/practice?sheet=${s.id}`)}
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

        {/* Stats Header */}
        <PracticeHeader sheet={sheet} onSheetChange={() => {}} stats={stats} />

        {/* Filters */}
        <PracticeFilters onFilterChange={handleFilterChange} onRandomProblem={handleRandomProblem} />

        {/* Problems List Grouped by Pattern */}
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
              .sort(([a], [b]) => {
                const orderA = patterns[a]?.order || 999;
                const orderB = patterns[b]?.order || 999;
                return orderA - orderB;
              })
              .map(([pattern, patternProblems]) => (
                <ProblemGroup 
                  key={pattern} 
                  pattern={pattern} 
                  problems={patternProblems}
                  category={patterns[pattern]?.category}
                  targetCount={patterns[pattern]?.targetCount}
                  onRefresh={refreshProblems}
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

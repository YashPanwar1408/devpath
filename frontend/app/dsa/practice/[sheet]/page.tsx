'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Search, ChevronDown, CheckCircle2, Circle, ArrowLeft, Filter, SlidersHorizontal, ChevronRight, Star, ArrowRight } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  pattern: string;
  order: number;
  progress: {
    status: string;
  } | null;
  isStarred?: boolean;
}

const DIFFICULTY_COLORS = {
  Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
};

export default function SheetPage() {
  const params = useParams();
  const router = useRouter();
  const sheetName = params?.sheet as string || '75';

  const [search, setSearch] = useState('');
  const [activeDiff, setActiveDiff] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [starredProblems, setStarredProblems] = useState<Set<string>>(new Set());
  
  // Default expanding the first few sections
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 
    'Arrays & Hashing': true, 
    'Two Pointers': true 
  });

  // Fetch problems from API
  const fetchProblems = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        sheet: sheetName,
      });
      
      const response = await fetch(`http://localhost:5000/api/dsa/problems?${params}`);
      const data = await response.json();
      setProblems(data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  }, [sheetName]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  // Toggle problem status
  const toggleStatus = async (problemSlug: string) => {
    const problem = problems.find(p => p.slug === problemSlug);
    if (!problem) return;

    const newStatus = problem.progress?.status === 'solved' ? 'unsolved' : 'solved';
    
    try {
      const response = await fetch(`http://localhost:5000/api/dsa/problems/${problemSlug}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setProblems(prev => prev.map(p => 
          p.slug === problemSlug 
            ? { ...p, progress: { status: newStatus } }
            : p
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Toggle star
  const toggleStar = (problemId: string) => {
    setStarredProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
      }
      return newSet;
    });
  };

  const toggleSection = (pattern: string) => {
    setExpanded(prev => ({ ...prev, [pattern]: !prev[pattern] }));
  };

  // Filter Logic
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchDiff = activeDiff === 'All' || p.difficulty === activeDiff;
      const matchStatus = activeStatus === 'All' || 
        (activeStatus === 'Solved' && p.progress?.status === 'solved') ||
        (activeStatus === 'Unsolved' && (!p.progress || p.progress.status !== 'solved'));
      return matchSearch && matchDiff && matchStatus;
    });
  }, [problems, search, activeDiff, activeStatus]);

  // Group by Pattern
  const grouped = useMemo(() => {
    const groups: Record<string, Problem[]> = {};
    filteredProblems.forEach(p => {
      if (!groups[p.pattern]) groups[p.pattern] = [];
      groups[p.pattern].push(p);
    });
    return groups;
  }, [filteredProblems]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = problems.length;
    const solved = problems.filter(p => p.progress?.status === 'solved').length;
    const easy = {
      total: problems.filter(p => p.difficulty === 'Easy').length,
      solved: problems.filter(p => p.difficulty === 'Easy' && p.progress?.status === 'solved').length,
    };
    const medium = {
      total: problems.filter(p => p.difficulty === 'Medium').length,
      solved: problems.filter(p => p.difficulty === 'Medium' && p.progress?.status === 'solved').length,
    };
    const hard = {
      total: problems.filter(p => p.difficulty === 'Hard').length,
      solved: problems.filter(p => p.difficulty === 'Hard' && p.progress?.status === 'solved').length,
    };
    const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
    
    return { total, solved, easy, medium, hard, percentage };
  }, [problems]);

  // Sheet Tabs
  const sheets = [
    { id: '75', label: 'DSA 75', sub: '<1 Month' },
    { id: '150', label: 'DSA 150', sub: '1-3 Months' },
    { id: '250', label: 'DSA 250', sub: '3+ Months' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Tabs */}
        <div className="space-y-8">
           <div className="flex justify-between items-start">
             <div>
               <button onClick={() => router.push('/dsa/practice')} className="group flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-4">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Hub
               </button>
               <h1 className="text-4xl md:text-5xl font-bold mb-2">DSA Practice Sheets</h1>
               <p className="text-gray-400">Master coding patterns through curated problems.</p>
             </div>
             <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform">
               <SlidersHorizontal className="w-4 h-4" /> Random Problem
             </button>
           </div>

           {/* Sheet Tabs (Glassy Look) */}
           <div className="flex gap-4 border-b border-white/10 pb-1">
             {sheets.map((tab) => {
               const isActive = sheetName === tab.id;
               return (
                 <button
                   key={tab.id}
                   onClick={() => router.push(`/dsa/practice/${tab.id}`)}
                   className={`px-6 py-4 rounded-t-2xl border-t border-x border-transparent transition-all relative overflow-hidden group ${
                     isActive 
                       ? 'bg-white/5 border-white/10 text-white' 
                       : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                   }`}
                 >
                   {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />}
                   <div className="text-lg font-bold">{tab.label}</div>
                   <div className="text-xs opacity-70">{tab.sub}</div>
                 </button>
               );
             })}
           </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-8 items-center justify-between">
           <div className="flex-1 w-full">
              <div className="flex justify-between text-sm mb-2">
                 <span className="text-gray-400">Problems Solved</span>
                 <span className="text-blue-400 font-bold">{stats.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-black rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${stats.percentage}%` }} />
              </div>
           </div>
           
           <div className="flex gap-8 w-full md:w-auto justify-between md:justify-end">
              <div className="text-center">
                 <div className="w-3 h-3 rounded-full mx-auto mb-2 bg-emerald-500" />
                 <div className="text-xl font-bold">{stats.easy.solved}/{stats.easy.total}</div>
                 <div className="text-xs text-gray-500 uppercase">Easy</div>
              </div>
              <div className="text-center">
                 <div className="w-3 h-3 rounded-full mx-auto mb-2 bg-amber-500" />
                 <div className="text-xl font-bold">{stats.medium.solved}/{stats.medium.total}</div>
                 <div className="text-xs text-gray-500 uppercase">Medium</div>
              </div>
              <div className="text-center">
                 <div className="w-3 h-3 rounded-full mx-auto mb-2 bg-rose-500" />
                 <div className="text-xl font-bold">{stats.hard.solved}/{stats.hard.total}</div>
                 <div className="text-xs text-gray-500 uppercase">Hard</div>
              </div>
           </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search problems..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
           </div>
           
           <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Filter className="w-4 h-4 text-gray-500" />
              </div>
              <select 
                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-10 pr-8 text-gray-300 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                value={activeDiff}
                onChange={(e) => setActiveDiff(e.target.value)}
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
           </div>

           <div className="relative">
              <select 
                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 px-4 text-gray-300 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                value={activeStatus}
                onChange={(e) => setActiveStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Solved">Solved</option>
                <option value="Unsolved">Unsolved</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
           </div>
        </div>

        {/* Problem Groups (Accordion) */}
        <div className="space-y-4">
           {loading ? (
             <div className="flex items-center justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
             </div>
           ) : Object.keys(grouped).length === 0 ? (
             <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                <p className="text-gray-500">No problems found.</p>
             </div>
           ) : (
             Object.entries(grouped).map(([pattern, problems]) => {
                const solvedCount = problems.filter(p => p.progress?.status === 'solved').length;
                const progress = Math.round((solvedCount / problems.length) * 100);
                const isOpen = expanded[pattern];

                return (
                   <div key={pattern} className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden">
                      {/* Accordion Header */}
                      <button 
                        onClick={() => toggleSection(pattern)}
                        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                         <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg bg-white/5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                               <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="text-left">
                               <h3 className="text-lg font-bold">{pattern}</h3>
                               <p className="text-sm text-gray-500">{solvedCount} / {problems.length} solved</p>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-6">
                            <div className="hidden md:block w-32 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-sm font-mono text-gray-400 w-10 text-right">{progress}%</span>
                         </div>
                      </button>

                      {/* Problem Table */}
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                         <div className="border-t border-white/5">
                            {problems.map((problem) => {
                              const isSolved = problem.progress?.status === 'solved';
                              const isStarred = starredProblems.has(problem.id);
                              
                              return (
                                <div key={problem.id} className="group flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] border-b border-white/5 last:border-0 transition-colors">
                                  <div className="flex items-center gap-4 flex-1">
                                     <button 
                                       onClick={() => toggleStatus(problem.slug)}
                                       className="text-gray-600 hover:text-green-500 transition-colors"
                                     >
                                        {isSolved ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6" />}
                                     </button>
                                     <Link 
                                       href={`/dsa/solve/${problem.slug}`}
                                       className="font-medium text-gray-200 hover:text-blue-400 transition-colors"
                                     >
                                       {problem.title}
                                     </Link>
                                  </div>
                                  
                                  <div className="flex items-center gap-4 md:gap-6">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold border ${DIFFICULTY_COLORS[problem.difficulty as keyof typeof DIFFICULTY_COLORS]}`}>
                                        {problem.difficulty}
                                     </span>
                                     <button
                                       onClick={() => toggleStar(problem.id)}
                                       className={`transition-colors ${isStarred ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'}`}
                                     >
                                       <Star className={`w-5 h-5 ${isStarred ? 'fill-yellow-400' : ''}`} />
                                     </button>
                                     <Link 
                                       href={`/dsa/solve/${problem.slug}`}
                                       className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white transition-all text-gray-500"
                                     >
                                        <ArrowRight className="w-4 h-4" />
                                     </Link>
                                  </div>
                               </div>
                              );
                            })}
                         </div>
                      </div>
                   </div>
                );
             })
           )}
        </div>

      </div>
    </div>
  );
}
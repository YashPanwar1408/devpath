'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

// --- Icons ---
const Icons = {
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Stack: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  File: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Mic: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    </svg>
  ),
  Map: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  ),
  BookOpen: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  FileText: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  Flame: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Target: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [showAllModules, setShowAllModules] = useState(false);
  const [userStats, setUserStats] = useState({
    streakDays: 0,
    solvedTotal: 0,
    modulesCompleted: 0,
    weeklySolved: 0,
    weeklyGoal: 6,
  });
  const [lastProblem, setLastProblem] = useState<{
    title: string;
    slug: string;
    difficulty: string;
    lastAttempt: string | null;
    status: string;
  } | null>(null);

  const userName =
    isLoaded && user ? user.firstName || user.fullName || 'Friend' : 'Guest';
  const userId = user?.id || null;

  useEffect(() => {
    if (!userId) return;

    interface ProgressEntry {
      status: string;
      lastAttempt: string | null;
      problem?: {
        title: string;
        slug: string;
        difficulty: string;
      } | null;
    }

    async function fetchStats() {
      try {
        const res = await fetch(`http://localhost:5000/api/progress/${userId}`);
        if (!res.ok) return;
        const data: ProgressEntry[] = await res.json();

        const solved = data.filter(
          (p) => p.status === 'solved' && p.lastAttempt
        );
        const solvedTotal = solved.length;

        const today = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);

        const weeklySolved = solved.filter((p) => {
          const d = new Date(p.lastAttempt as string);
          return d >= weekAgo;
        }).length;

        const dates = new Set(
          solved.map((p) =>
            new Date(p.lastAttempt as string).toDateString()
          )
        );
        let streak = 0;
        for (let i = 0; ; i++) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          if (dates.has(d.toDateString())) {
            streak += 1;
          } else {
            break;
          }
        }

        const modulesCompleted = Math.min(7, Math.floor(solvedTotal / 25));

        const withAttempts = data.filter(
          (p) => p.problem && p.lastAttempt
        ) as ProgressEntry[];

        if (withAttempts.length > 0) {
          const sorted = [...withAttempts].sort(
            (a, b) =>
              new Date((b.lastAttempt as string)).getTime() -
              new Date((a.lastAttempt as string)).getTime()
          );
          const lp = sorted[0];
          setLastProblem({
            title: lp.problem!.title,
            slug: lp.problem!.slug,
            difficulty: lp.problem!.difficulty,
            lastAttempt: lp.lastAttempt,
            status: lp.status,
          });
        } else {
          setLastProblem(null);
        }

        setUserStats({
          streakDays: streak,
          solvedTotal,
          modulesCompleted,
          weeklySolved,
          weeklyGoal: 6,
        });
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    }

    fetchStats();
  }, [userId]);

  const weeklyPercent =
    userStats.weeklyGoal === 0
      ? 0
      : Math.min(
          100,
          Math.round((userStats.weeklySolved / userStats.weeklyGoal) * 100)
        );

  const circumference = 2 * Math.PI * 40;
  const progressOffset = circumference * (1 - weeklyPercent / 100);

  const hasRecentProblem = !!lastProblem;
  const continueProgressLabel = !hasRecentProblem
    ? '0%'
    : lastProblem!.status === 'solved'
    ? '100%'
    : '60%';
  const continueProgressWidthClass = !hasRecentProblem
    ? 'w-0'
    : lastProblem!.status === 'solved'
    ? 'w-full'
    : 'w-3/4';

  const modules = [
    {
      id: 1,
      title: 'DSA & Problem Solving',
      description: 'Master algorithms and data structures',
      icon: <Icons.Code />,
      gradient: 'from-blue-500 to-cyan-500',
      link: '/dsa',
    },
    {
      id: 2,
      title: 'Learning Paths',
      description: 'Full Stack, AI/ML and more',
      icon: <Icons.BookOpen />,
      gradient: 'from-violet-500 to-purple-500',
      link: '/learn',
    },
    {
      id: 3,
      title: 'Resume & ATS',
      description: 'Optimize your CV',
      icon: <Icons.File />,
      gradient: 'from-emerald-500 to-green-500',
      link: '/resume',
    },
    {
      id: 4,
      title: 'Mock Interviews',
      description: 'AI-powered practice',
      icon: <Icons.Mic />,
      gradient: 'from-indigo-500 to-purple-500',
      link: '/interview',
    },
    {
      id: 5,
      title: 'Career Roadmaps',
      description: 'Personalized learning paths',
      icon: <Icons.Map />,
      gradient: 'from-pink-500 to-rose-500',
      link: '/roadmaps',
    },
    {
      id: 6,
      title: 'Cheatsheets',
      description: 'Quick reference guides',
      icon: <Icons.FileText />,
      gradient: 'from-amber-500 to-orange-500',
      link: '/cheatsheets',
    },
  ];

  const suggestions = [
    { text: 'Solve 2 array problems', gradient: 'from-blue-500 to-cyan-500' },
    { text: 'Mock interview: DSA basics', gradient: 'from-purple-500 to-pink-500' },
    { text: 'Improve resume keywords', gradient: 'from-emerald-500 to-green-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[20%] h-[20%] bg-cyan-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-12">
        
        {/* 1. HERO / GREETING SECTION */}
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          
          {/* Welcome Text */}
          <div className="flex-1 space-y-6 py-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                Good afternoon, {userName} <span className="animate-pulse inline-block">👋</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl">
                You&apos;re on a{' '}
                <span className="text-orange-400 font-semibold">
                  {userStats.streakDays || 0}-day streak
                </span>
                . Don&apos;t break the chain now.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
                <Icons.Target />
                <span className="text-sm font-medium text-blue-300">Focus: DSA Arrays</span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center gap-2">
                <Icons.Sparkles />
                <span className="text-sm font-medium text-purple-300">Goal: Google Prep</span>
              </div>
            </div>
          </div>
          
          {/* Progress Card - uses per-user weekly stats */}
          <div className="md:w-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-between gap-4 shadow-xl">
             <div className="space-y-1">
                <p className="text-sm text-gray-400 font-medium">Weekly Goal</p>
                <div className="text-3xl font-bold text-white">
                  {userStats.weeklySolved}
                  <span className="text-gray-500">/{userStats.weeklyGoal}</span>
                </div>
                <p className="text-xs text-green-400">
                  {weeklyPercent >= 100
                    ? 'Goal reached'
                    : weeklyPercent >= 50
                    ? 'On track'
                    : 'Keep going'}
                </p>
             </div>
             <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#progress-gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
                  {weeklyPercent}%
                </div>
             </div>
          </div>
        </div>

        {/* 2. CONTINUE LEARNING (HERO CARD) */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
          <Link
            href={hasRecentProblem ? `/dsa/solve/${lastProblem!.slug}` : '/dsa/practice'}
            className="relative block bg-[#0B1121] rounded-3xl p-8 border border-white/10 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 uppercase tracking-wider">
                   <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"/>
                   {hasRecentProblem ? 'In Progress' : 'Getting started'}
                </div>
                <div>
                   <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-blue-200 transition-colors">
                     {hasRecentProblem ? lastProblem!.title : 'Start your DSA journey'}
                   </h3>
                   <p className="text-gray-400 text-lg">
                     {hasRecentProblem
                       ? "Continue where you left off on your last problem."
                       : "Kick off with foundational problems and build your streak."}
                   </p>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-2 max-w-md pt-2">
                   <div className="flex justify-between text-xs font-medium text-gray-400">
                      <span>Progress</span>
                     <span>{continueProgressLabel}</span>
                   </div>
                   <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className={`h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full relative overflow-hidden ${continueProgressWidthClass}`}>
                         <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Icons.Flame />
                    <span className="text-orange-400 font-medium">
                      {hasRecentProblem ? lastProblem!.difficulty : 'Not started'}
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>
                    Last attempt:{' '}
                    {hasRecentProblem && lastProblem!.lastAttempt
                      ? new Date(lastProblem!.lastAttempt).toLocaleDateString()
                      : 'Not started yet'}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <button className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:bg-blue-50 group-hover:text-blue-600">
                  <Icons.Play />
                </button>
              </div>
            </div>
            
            {/* Decorative Background Icon */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none transform translate-x-10 scale-150">
               <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /></svg>
            </div>
          </Link>
        </div>

        {/* 3. MODULES GRID */}
        <div>
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold">Your Modules</h2>
             <button 
               onClick={() => setShowAllModules(!showAllModules)}
               className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
             >
                {showAllModules ? 'Show less' : 'View all'} 
                <span className={`transition-transform duration-300 ${showAllModules ? 'rotate-90' : ''}`}>
                  <Icons.ArrowRight />
                </span>
             </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-500">
            {modules.slice(0, showAllModules ? modules.length : 6).map((module) => (
              <Link
                key={module.id}
                href={module.link}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10" />
                
                {/* Glow effect on hover */}
                <div className={`absolute -inset-px rounded-2xl bg-linear-to-r ${module.gradient} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500`} />
                
                <div className="relative h-full p-6 flex flex-col">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${module.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <div className="text-white">
                       {module.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-white">{module.title}</h3>
                  <p className="text-sm text-gray-400 mb-6 grow">{module.description}</p>
                  
                  <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-white transition-colors gap-2">
                     <span>Continue</span>
                     <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        →
                     </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. RECOMMENDATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 hover:border-white/20 cursor-pointer transition-colors group">
                 <div className={`w-10 h-10 rounded-full bg-linear-to-br ${suggestion.gradient} flex items-center justify-center text-white/80`}>
                    <Icons.Sparkles />
                 </div>
                 <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-0.5">Recommended</div>
                    <div className="text-sm font-medium text-gray-200 group-hover:text-white">{suggestion.text}</div>
                 </div>
              </div>
           ))}
        </div>

        {/* 5. STATS (per-user) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          {[
            {
              label: 'Days Streak',
              value: String(userStats.streakDays || 0),
              icon: '🔥',
              color: 'from-orange-500 to-red-500',
            },
            {
              label: 'Problems Solved',
              value: String(userStats.solvedTotal || 0),
              icon: '✅',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              label: 'Modules Completed',
              value: `${userStats.modulesCompleted || 0}/7`,
              icon: '📚',
              color: 'from-green-500 to-emerald-500',
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white/2 border border-white/5 rounded-2xl p-6 hover:bg-white/5 transition-colors flex items-center gap-5">
              <div className="text-4xl">{stat.icon}</div>
              <div>
                 <div className={`text-3xl font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}>
                   {stat.value}
                 </div>
                 <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
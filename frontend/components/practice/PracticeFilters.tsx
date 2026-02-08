'use client';

import { Search, Shuffle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type StatusFilter = 'all' | 'solved' | 'unsolved' | 'starred';

interface PracticeFiltersProps {
  onRandomProblem: (mode: 'Unsolved' | 'Starred') => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (filter: StatusFilter) => void;
  availablePatterns: string[];
}

export default function PracticeFilters({ 
  onRandomProblem, 
  statusFilter, 
  onStatusFilterChange,
  availablePatterns 
}: PracticeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

  // Helper to update URL
  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== (searchParams.get('search') || '')) {
        updateFilter('search', searchValue);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue, updateFilter, searchParams]);

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Status - UNIFIED FILTER */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
              <option value="starred">⭐ Starred</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Difficulty</label>
            <select
              value={searchParams.get('difficulty') || 'All'}
              onChange={(e) => updateFilter('difficulty', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Pattern - DYNAMIC from current problem set */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Pattern</label>
            <select
              value={searchParams.get('pattern') || 'All'}
              onChange={(e) => updateFilter('pattern', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              {availablePatterns.map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? 'All Patterns' : p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pick Random Problem - Only Unsolved & Starred */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shuffle className="w-5 h-5 text-gray-400" />
            <span className="text-lg font-semibold text-white">Pick Random Problem:</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onRandomProblem('Unsolved')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Unsolved
            </button>
            <button
              onClick={() => onRandomProblem('Starred')}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Starred
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

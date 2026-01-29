'use client';

import { Search, Shuffle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PracticeFiltersProps {
  onFilterChange: (filters: {
    search: string;
    difficulty: string;
    pattern: string;
    status: string;
  }) => void;
  onRandomProblem?: (mode: 'Unsolved' | 'Starred' | 'Any') => void;
}

const PATTERNS = [
  'All',
  'Arrays',
  'Linked List',
  'Stack',
  'Queue',
  'Hash Table',
  'Tree',
  'Graph',
  'Dynamic Programming',
  'Greedy',
  'Binary Search',
  'Backtracking',
  'Sliding Window',
  'Two Pointers',
];

export default function PracticeFilters({ onFilterChange, onRandomProblem }: PracticeFiltersProps) {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [pattern, setPattern] = useState('All');
  const [status, setStatus] = useState('All');
  const [randomMode, setRandomMode] = useState<'Unsolved' | 'Starred' | 'Any'>('Unsolved');

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search, difficulty, pattern, status });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, difficulty, pattern, status, onFilterChange]);

  return (
    <div className="space-y-4">
      {/* Main Filters */}
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Solved">Solved</option>
              <option value="Unsolved">Unsolved</option>
              <option value="Starred">⭐ Starred</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Pattern */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Pattern</label>
            <select
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              {PATTERNS.map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? 'All Patterns' : p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pick Random Problem */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shuffle className="w-5 h-5 text-gray-400" />
            <span className="text-lg font-semibold text-white">Pick Random Problem:</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRandomMode('Unsolved');
                onRandomProblem?.('Unsolved');
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                randomMode === 'Unsolved'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              Unsolved
            </button>
            <button
              onClick={() => {
                setRandomMode('Starred');
                onRandomProblem?.('Starred');
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                randomMode === 'Starred'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              Starred
            </button>
            <button
              onClick={() => {
                setRandomMode('Any');
                onRandomProblem?.('Any');
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                randomMode === 'Any'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              Any
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

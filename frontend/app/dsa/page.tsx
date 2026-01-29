'use client';

import Link from 'next/link';

const Icons = {
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
  Grid: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
};

export default function DSAPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
            Data Structures & Algorithms
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose how you want to master DSA
          </p>
        </div>

        {/* Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Learn DSA */}
          <Link href="/dsa/learn" className="group block">
            <div className="relative h-full">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              
              {/* Card */}
              <div className="relative h-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all duration-300 group-hover:-translate-y-1">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icons.Book />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors">
                  Learn DSA
                </h2>
                <p className="text-lg text-gray-400 mb-3">Theory</p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Structured explanations with examples, animations, and step-by-step concepts.
                </p>

                {/* Button */}
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
                  Start Learning
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Practice DSA */}
          <Link href="/dsa/practice" className="group block">
            <div className="relative h-full">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              
              {/* Card */}
              <div className="relative h-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all duration-300 group-hover:-translate-y-1">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icons.Grid />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors">
                  Practice DSA
                </h2>
                <p className="text-lg text-gray-400 mb-3">Patterns</p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Solve curated problems pattern-wise using 75, 150, and 250 question sheets.
                </p>

                {/* Button */}
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 group-hover:scale-105 transition-all duration-300">
                  Start Practicing
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

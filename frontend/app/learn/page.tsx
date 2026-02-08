'use client';

import Link from 'next/link';

const Icons = {
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
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans selection:bg-blue-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
            Learning Paths
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Choose your learning journey
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Full Stack Development - Active */}
          <Link href="/learn/full-stack" className="group block">
            <div className="relative h-full">
              <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              
              <div className="relative h-full bg-[#0B1121] backdrop-blur-xl border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all duration-300 group-hover:-translate-y-1 shadow-xl">
                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icons.Stack />
                </div>

                <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors">
                  Full Stack Development
                </h2>
                <p className="text-lg text-purple-400 mb-3 font-semibold">Web Development</p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Master HTML, CSS, JavaScript, React, Node.js, databases and more.
                </p>

                <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 group-hover:scale-105 transition-all duration-200">
                  Start Learning
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* AI / ML - Active */}
          <Link href="/learn/aiml" className="group block">
            <div className="relative h-full">
              <div className="absolute -inset-0.5 bg-linear-to-r from-orange-500 to-yellow-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              
              <div className="relative h-full bg-[#0B1121] backdrop-blur-xl border border-white/10 rounded-3xl p-8 group-hover:border-white/20 transition-all duration-300 group-hover:-translate-y-1 shadow-xl">
                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-6 text-white shadow-[0_0_30px_rgba(251,146,60,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icons.Brain />
                </div>

                <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-orange-200 transition-colors">
                  AI / ML
                </h2>
                <p className="text-lg text-orange-400 mb-3 font-semibold">Artificial Intelligence</p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Python, Machine Learning, Deep Learning, LLMs and more.
                </p>

                <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 group-hover:scale-105 transition-all duration-200">
                  Start Learning
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

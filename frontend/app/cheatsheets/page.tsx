'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface CheatsheetCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  cheatsheetCount: number;
}

export default function CheatsheetsPage() {
  const [categories, setCategories] = useState<CheatsheetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch('http://localhost:5000/api/cheatsheets');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-orange-400 mb-4">
            Cheatsheets
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Quick reference guides for developers
          </p>
          
          {/* Search */}
          <div className="mt-8 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Categories Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/cheatsheets/${category.slug}`}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-xl border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer overflow-hidden">
                  <div className="p-6 h-full flex flex-col">
                    {/* Icon and Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center text-3xl shadow-lg`}>
                        {category.icon}
                      </div>
                      <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full">
                        <span className="text-sm text-amber-300 font-medium">
                          {category.cheatsheetCount} {category.cheatsheetCount === 1 ? 'sheet' : 'sheets'}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {category.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors grow">
                      {category.description}
                    </p>

                    {/* Arrow Icon */}
                    <div className="mt-4 flex items-center text-amber-400 group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-medium">View cheatsheets</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

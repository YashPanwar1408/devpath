'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface Cheatsheet {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  difficulty: string;
  tags: string[];
  popularity: number;
}

interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  cheatsheets: Cheatsheet[];
}

const difficultyColors = {
  Beginner: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300',
  Intermediate: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-300',
  Advanced: 'from-red-500/20 to-pink-500/20 border-red-500/30 text-red-300'
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.categorySlug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await fetch(`http://localhost:5000/api/cheatsheets/${categorySlug}`);
        if (!response.ok) {
          router.push('/cheatsheets');
          return;
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error('Error fetching category:', error);
        router.push('/cheatsheets');
      } finally {
        setLoading(false);
      }
    }

    fetchCategory();
  }, [categorySlug, router]);

  const filteredCheatsheets = category?.cheatsheets.filter(sheet =>
    sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sheet.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sheet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!category) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/cheatsheets"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Categories
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 rounded-3xl bg-linear-to-br ${category.color} flex items-center justify-center text-4xl shadow-lg`}>
              {category.icon}
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-orange-400 mb-4">
            {category.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            {category.description}
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search cheatsheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Cheatsheets Grid */}
        {filteredCheatsheets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCheatsheets.map((sheet) => (
              <Link
                key={sheet.id}
                href={`/cheatsheets/${categorySlug}/${sheet.slug}`}
                className="group"
              >
                <Card className="h-full bg-white/5 backdrop-blur-xl border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer">
                  <div className="p-6 h-full flex flex-col">
                    {/* Icon and Difficulty Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{sheet.icon}</div>
                      <div className={`px-3 py-1 bg-linear-to-r ${difficultyColors[sheet.difficulty as keyof typeof difficultyColors]} border rounded-full`}>
                        <span className="text-xs font-medium">{sheet.difficulty}</span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {sheet.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{sheet.subtitle}</p>

                    {/* Description */}
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors grow mb-4">
                      {sheet.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sheet.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Link */}
                    <div className="flex items-center text-amber-400 group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-medium">View cheatsheet</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">
              {searchQuery ? 'No cheatsheets found matching your search.' : 'No cheatsheets available yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

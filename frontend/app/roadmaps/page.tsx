'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Clock, TrendingUp, ChevronRight } from 'lucide-react';

interface RoadmapCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  gradient: string;
  icon: string;
  skills: string[];
  popularity: number;
}

export default function RoadmapsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [categories, setCategories] = useState<RoadmapCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/roadmaps');
        if (!response.ok) {
          throw new Error('Failed to fetch roadmaps');
        }
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Error fetching roadmaps:', err);
        setError('Failed to load roadmaps. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  // Filter roadmaps
  const filteredRoadmaps = categories.filter((roadmap) => {
    const matchesSearch =
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesLevel =
      selectedLevel === 'all' ||
      roadmap.level.toLowerCase() === selectedLevel.toLowerCase();
    return matchesSearch && matchesLevel;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading roadmaps...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Career Roadmaps
            </h1>
            <p className="text-xl text-gray-400">
              Structured learning paths to guide you from beginner to job-ready
              developer
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search roadmaps, skills, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                <Button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  variant={selectedLevel === level ? 'default' : 'outline'}
                  className={
                    selectedLevel === level
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                  }
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap) => (
            <Card
              key={roadmap.id}
              className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group"
            >
              {/* Gradient Header */}
              <div
                className={`h-32 bg-gradient-to-br ${roadmap.gradient} relative`}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <span className="text-5xl">{roadmap.icon}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge
                    className={`${
                      roadmap.level === 'Beginner'
                        ? 'bg-green-500/20 text-green-300 border-green-500/30'
                        : roadmap.level === 'Intermediate'
                          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                    } border`}
                  >
                    {roadmap.level}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {roadmap.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {roadmap.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{roadmap.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>{roadmap.popularity}% demand</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {roadmap.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {roadmap.skills.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full">
                      +{roadmap.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <Link href={`/roadmaps/${roadmap.slug}`}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group">
                    View Roadmap
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredRoadmaps.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">No roadmaps found</p>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

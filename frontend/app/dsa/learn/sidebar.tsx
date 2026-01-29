'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

type Lesson = {
  id: string;
  slug: string;
  title: string;
  difficulty: string | null;
};

type Topic = {
  id: string;
  slug: string;
  title: string;
  lessons: Lesson[];
};

interface SidebarProps {
  topics: Topic[];
}

export function Sidebar({ topics }: SidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extract current slug from pathname
  const currentSlug = pathname.split('/').pop() || '';
  
  // Filter lessons based on search query
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    
    const query = searchQuery.toLowerCase();
    return topics
      .map(topic => ({
        ...topic,
        lessons: topic.lessons.filter(lesson =>
          lesson.title.toLowerCase().includes(query)
        ),
      }))
      .filter(topic => topic.lessons.length > 0);
  }, [topics, searchQuery]);
  
  return (
    <div className="w-80 h-full border-r border-border bg-card/50 backdrop-blur-xl">
      <div className="p-6 border-b border-border">
        <Link 
          href="/dsa"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Overview
        </Link>
        <h2 className="text-xl font-bold mb-4">DSA Tutorial</h2>
        
        {/* Search Input */}
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <Input
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50 border-border/50"
          />
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        {filteredTopics.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No lessons found matching &quot;{searchQuery}&quot;
          </div>
        ) : (
          <nav className="p-4 space-y-6">
            {filteredTopics.map((topic, topicIdx) => (
              <div key={topic.id}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                  {topic.title}
                </h3>
                <div className="space-y-1">
                  {topic.lessons.map((lesson) => {
                    const isActive = lesson.slug === currentSlug;
                    const href = `/dsa/learn/${lesson.slug}`;
                    
                    return (
                      <Link key={lesson.id} href={href}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm font-normal transition-all ${
                            isActive
                              ? 'bg-linear-to-r from-primary/20 to-primary/10 text-primary border-l-2 border-primary hover:bg-primary/20'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          {lesson.title}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
                {topicIdx < filteredTopics.length - 1 && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </nav>
        )}
      </ScrollArea>
    </div>
  );
}

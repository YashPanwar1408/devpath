'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  slug: string;
}

interface Category {
  id: string;
  title: string;
  topics: Topic[];
}

interface DomainStructure {
  title: string;
  slug: string;
  categories: Category[];
}

export default function Sidebar({ domainSlug }: { domainSlug: string }) {
  const pathname = usePathname();
  const [structure, setStructure] = useState<DomainStructure | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(`http://localhost:5000/api/learn/structure/${domainSlug}`)
      .then(res => res.json())
      .then(data => {
        setStructure(data);
        // Auto-expand all categories on first load
        const allCategoryIds = data.categories?.map((c: Category) => c.id) || [];
        setExpandedCategories(new Set(allCategoryIds));
      })
      .catch(err => console.error(err));
  }, [domainSlug]);

  // Save expanded state to localStorage
  useEffect(() => {
    if (expandedCategories.size > 0) {
      localStorage.setItem(
        `sidebar-expanded-${domainSlug}`,
        JSON.stringify([...expandedCategories])
      );
    }
  }, [expandedCategories, domainSlug]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  if (!structure) {
    return (
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-4">
        <div className="text-slate-400">Loading...</div>
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900">
      <ScrollArea className="h-screen">
        <div className="p-4">
          <h2 className="text-lg font-bold text-white mb-4">{structure.title}</h2>
          
          <nav className="space-y-1">
            {structure.categories?.map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              
              return (
                <div key={category.id} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                  >
                    <span>{category.title}</span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-4 space-y-1">
                      {category.topics.map((topic) => {
                        const topicPath = `/${domainSlug}/learn/${topic.slug}`;
                        const isActive = pathname === topicPath;
                        
                        return (
                          <Link
                            key={topic.id}
                            href={topicPath}
                            className={cn(
                              'block px-3 py-2 text-sm rounded-md transition-colors',
                              isActive
                                ? 'bg-blue-600 text-white font-medium'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            )}
                          >
                            {topic.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
}

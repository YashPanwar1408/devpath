import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { fetchLessonBySlug } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch lesson data from API
  const data = await fetchLessonBySlug(slug);
  
  if (!data) {
    notFound();
  }
  
  const { lesson, navigation } = data;
  const prevLesson = navigation.prev;
  const nextLesson = navigation.next;
  
  // Check if content is placeholder
  const isComingSoon = lesson.content === 'Coming soon';
  
  // Difficulty badge colors
  const getDifficultyColor = (difficulty: string | null) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return '';
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      {/* Title Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-5xl font-bold tracking-tight">{lesson.title}</h1>
          {lesson.difficulty && (
            <Badge 
              variant="secondary" 
              className={`text-sm ${getDifficultyColor(lesson.difficulty)}`}
            >
              {lesson.difficulty}
            </Badge>
          )}
        </div>
        <div className="h-1 w-20 bg-linear-to-r from-primary to-primary/50 rounded-full" />
      </div>

      {/* Content */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-8">
          {isComingSoon ? (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="text-8xl mb-6">🚧</div>
              <h2 className="text-3xl font-bold mb-3">Content Coming Soon</h2>
              <p className="text-muted-foreground text-lg max-w-md">
                This lesson is currently being developed. Check back soon for comprehensive content on {lesson.title.toLowerCase()}.
              </p>
            </div>
          ) : (
            <MarkdownRenderer content={lesson.content} />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-12">
        <Separator className="mb-8" />
        <div className="flex items-center justify-between gap-4">
          {prevLesson ? (
            <Link href={`/dsa/learn/${prevLesson.slug}`} className="flex-1">
              <Button variant="outline" className="w-full justify-start group">
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
                  className="mr-2 group-hover:-translate-x-1 transition-transform"
                >
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-medium">{prevLesson.title}</div>
                </div>
              </Button>
            </Link>
          ) : (
            <Button variant="outline" disabled className="flex-1 justify-start opacity-50">
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
                className="mr-2"
              >
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">No previous lesson</div>
              </div>
            </Button>
          )}
          
          {nextLesson ? (
            <Link href={`/dsa/learn/${nextLesson.slug}`} className="flex-1">
              <Button className="w-full justify-end group">
                <div className="text-right">
                  <div className="text-xs opacity-80">Next</div>
                  <div className="font-medium">{nextLesson.title}</div>
                </div>
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
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Button>
            </Link>
          ) : (
            <Button disabled className="flex-1 justify-end opacity-50">
              <div className="text-right">
                <div className="text-xs opacity-80">No next lesson</div>
              </div>
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
                className="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

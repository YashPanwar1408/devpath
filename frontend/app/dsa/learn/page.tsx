import { Card, CardContent } from '@/components/ui/card';
import { fetchSidebarData } from '@/lib/api';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LearnPage() {
  // Fetch sidebar data to get the first lesson
  const topics = await fetchSidebarData();
  
  // Find the first lesson
  const firstLesson = topics[0]?.lessons[0];

  // If no lesson exists, show empty state
  if (!firstLesson) {
    return (
      <div className="max-w-5xl mx-auto px-8 py-12">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-8">
            <h1 className="text-3xl font-bold mb-4">No Lessons Available</h1>
            <p className="text-muted-foreground mb-6">
              The DSA learning content is being prepared. Please check back soon.
            </p>
            <Link 
              href="/dsa"
              className="text-primary hover:underline"
            >
              ← Back to DSA Overview
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect to the first lesson
  redirect(`/dsa/learn/${firstLesson.slug}`);
}
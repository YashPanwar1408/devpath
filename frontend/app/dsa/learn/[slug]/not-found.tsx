import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <Card className="border-destructive/50 bg-destructive/10">
        <CardContent className="pt-8">
          <h1 className="text-3xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The lesson you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/dsa/learn">
            <Button>Back to Lessons</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

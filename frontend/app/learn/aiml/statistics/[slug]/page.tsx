import LessonPage from '@/components/learn/LessonPage';

export default async function StatisticsLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="statistics" domainSlug="aiml" />;
}

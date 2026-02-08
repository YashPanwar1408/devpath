import LessonPage from '@/components/learn/LessonPage';

export default async function DataScienceLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="data-science" domainSlug="aiml" />;
}

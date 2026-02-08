import LessonPage from '@/components/learn/LessonPage';

export default async function MLOpsLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="mlops" domainSlug="aiml" />;
}

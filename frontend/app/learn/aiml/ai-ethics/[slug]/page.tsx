import LessonPage from '@/components/learn/LessonPage';

export default async function AIEthicsLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="ai-ethics" domainSlug="aiml" />;
}

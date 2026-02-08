import LessonPage from '@/components/learn/LessonPage';

export default async function AgenticAILessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="agentic-ai" domainSlug="aiml" />;
}

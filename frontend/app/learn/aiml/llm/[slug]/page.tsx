import LessonPage from '@/components/learn/LessonPage';

export default async function LLMLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="llm" domainSlug="aiml" />;
}

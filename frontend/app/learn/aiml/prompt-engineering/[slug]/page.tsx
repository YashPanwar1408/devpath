import LessonPage from '@/components/learn/LessonPage';

export default async function PromptEngineeringLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="prompt-engineering" domainSlug="aiml" />;
}

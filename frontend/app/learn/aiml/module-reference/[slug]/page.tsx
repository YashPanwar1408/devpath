import LessonPage from '@/components/learn/LessonPage';

export default async function ModuleReferenceLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="module-reference" domainSlug="aiml" />;
}

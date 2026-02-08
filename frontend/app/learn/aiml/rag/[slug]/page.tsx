import LessonPage from '@/components/learn/LessonPage';

export default async function RAGLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="rag" domainSlug="aiml" />;
}

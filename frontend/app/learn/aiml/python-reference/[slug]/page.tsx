import LessonPage from '@/components/learn/LessonPage';

export default async function PythonReferenceLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="python-reference" domainSlug="aiml" />;
}

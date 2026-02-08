import LessonPage from '@/components/learn/LessonPage';

export default async function PythonOOPLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="python-oop" domainSlug="aiml" />;
}

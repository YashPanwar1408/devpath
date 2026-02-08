import LessonPage from '@/components/learn/LessonPage';

export default async function PythonInterviewLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="python-interview" domainSlug="aiml" />;
}

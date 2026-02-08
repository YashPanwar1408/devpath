import LessonPage from '@/components/learn/LessonPage';

export default async function PythonHowToLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="python-howto" domainSlug="aiml" />;
}

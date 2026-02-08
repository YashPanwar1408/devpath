import LessonPage from '@/components/learn/LessonPage';

export default async function PythonLibrariesLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="python-libraries" domainSlug="aiml" />;
}

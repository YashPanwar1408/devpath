import LessonPage from '@/components/learn/LessonPage';

export default async function PythonDatabasesLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="python-databases" domainSlug="aiml" />;
}

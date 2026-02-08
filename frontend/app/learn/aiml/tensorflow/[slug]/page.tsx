import LessonPage from '@/components/learn/LessonPage';

export default async function TensorFlowLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="tensorflow" domainSlug="aiml" />;
}

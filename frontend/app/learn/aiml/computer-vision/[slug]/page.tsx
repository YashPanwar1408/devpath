import LessonPage from '@/components/learn/LessonPage';

export default async function ComputerVisionLessonPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <LessonPage slug={slug} categoryPath="computer-vision" domainSlug="aiml" />;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchSidebarData() {
  const response = await fetch(`${API_BASE_URL}/dsa/sidebar`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch sidebar data');
  }
  
  return response.json();
}

export async function fetchLessonBySlug(slug: string) {
  const response = await fetch(`${API_BASE_URL}/dsa/lesson/${slug}`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch lesson');
  }
  
  return response.json();
}

export type SidebarTopic = {
  id: string;
  slug: string;
  title: string;
  order: number;
  lessons: {
    id: string;
    slug: string;
    title: string;
    difficulty: string | null;
    order: number;
  }[];
};

export type LessonResponse = {
  lesson: {
    id: string;
    slug: string;
    title: string;
    content: string;
    difficulty: string | null;
    order: number;
    topic: {
      id: string;
      slug: string;
      title: string;
    };
  };
  navigation: {
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
  };
};

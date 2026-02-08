'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResumePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/resume/home');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-white text-xl">Redirecting...</div>
    </div>
  );
}

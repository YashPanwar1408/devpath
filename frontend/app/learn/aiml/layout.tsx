import { AISidebar } from '@/components/learn/AISidebar';

export default function AIMLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="flex-shrink-0">
        <AISidebar />
      </aside>
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}

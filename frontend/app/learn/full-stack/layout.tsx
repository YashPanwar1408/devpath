import { SidebarProvider } from '@/components/ui/sidebar';
import { FullStackSidebar } from '@/components/learn/FullStackSidebar';

export default function FullStackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <FullStackSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

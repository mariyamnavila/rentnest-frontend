import { DashboardSidebar } from '@/components/shared/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#14171d] font-sans">
      <DashboardSidebar />

      <main className="pt-8 lg:pt-8 lg:ml-64 p-4 sm:p-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}

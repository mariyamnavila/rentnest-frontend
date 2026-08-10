import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { DashboardNavbar } from '@/components/shared/DashboardNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#14171d] font-sans">
      <DashboardSidebar />

      <div className="lg:ml-64 flex flex-col min-h-screen">
        <DashboardNavbar />

        <main className="pt-4 lg:pt-6 p-4 sm:p-8 flex-1">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

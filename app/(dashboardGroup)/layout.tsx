import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import { getMe } from '@/service/getMe';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  const role = user.data?.role;
  const name = user.data?.name;
  const email = user.data?.email;
  const profileImage = user.data?.profileImage;

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#14171d] flex font-sans">
      {/* Dynamic Role-Based Sidebar */}
      <DashboardSidebar
        role={role}
        userName={name}
        userEmail={email}
        profileImage={profileImage}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

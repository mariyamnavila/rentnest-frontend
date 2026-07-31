import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { getMe } from '@/service/getMe';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock/server fetch user state placeholder until auth service is connected
  const user = await getMe();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

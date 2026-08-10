import { getAllUsers } from '../../_actions/admin/adminActions';
import { UserTable } from '../../_components/admin/UserTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Manage Users - Admin Dashboard',
  description: 'View and manage all registered users',
};

type PageProps = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;

  const result = await getAllUsers(search, page, 10);
  const users = result.data;
  const meta = result.meta;

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
          Manage <span className="text-[#CFA190]">Users</span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
          {meta?.total || users.length} total users registered on the platform
        </p>
      </div>

      {/* Users Table */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <CardHeader className="p-6 py-0">
          <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
            All Users
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            Search by name, email, or role. Ban or unban accounts as needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-1 pb-0">
          <UserTable users={users} meta={meta} />
        </CardContent>
      </Card>

    </div>
  );
}

import { getAllUsers } from '../../_actions/admin/adminActions';
import { UserTable } from '../../_components/admin/UserTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Manage Users - Admin Dashboard',
  description: 'View and manage all registered users',
};

export default async function AdminUsersPage() {
  const result = await getAllUsers();
  const users = result.data;

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
          Manage <span className="text-[#CFA190]">Users</span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
          {users.length} total users registered on the platform
        </p>
      </div>

      {/* Users Table */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
            All Users
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            Search by name or email. Ban or unban accounts as needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <UserTable users={users} />
        </CardContent>
      </Card>

    </div>
  );
}

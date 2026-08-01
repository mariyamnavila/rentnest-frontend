import { getAllUsers, getAllProperties, getAllRentals } from '../_actions/admin/adminActions';
import { UserTable } from '../_components/admin/UserTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, Building2, ClipboardList, UserCheck, UserX, Shield } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard - RentNest',
  description: 'Manage users, properties, and rental requests',
};

export default async function AdminDashboardPage() {
  const [usersResult, propertiesResult, rentalsResult] = await Promise.all([
    getAllUsers(),
    getAllProperties(),
    getAllRentals(),
  ]);

  const users = usersResult.data;
  const properties = propertiesResult.data;
  const rentals = rentalsResult.data;

  const tenants = users.filter((u) => u.role === 'TENANT').length;
  const landlords = users.filter((u) => u.role === 'LANDLORD').length;
  const bannedUsers = users.filter((u) => u.status === 'BANNED').length;

  const statCards = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-[#CFA190]', bg: 'bg-[#fff5f5] dark:bg-[#232733]' },
    { label: 'Tenants', value: tenants, icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { label: 'Landlords', value: landlords, icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { label: 'Properties', value: properties.total, icon: Building2, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { label: 'Rental Requests', value: rentals.total, icon: ClipboardList, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30' },
    { label: 'Banned Users', value: bannedUsers, icon: UserX, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' },
  ];

  return (
    <div className="space-y-6 font-sans">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center shrink-0">
            <Shield className="size-6 sm:size-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
              Admin <span className="text-[#CFA190]">Dashboard</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
              Manage users, moderate listings, and monitor platform activity.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.label}
              className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs hover:shadow-md transition-all group"
            >
              <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1.5 h-full">
                <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-2xl ${card.bg} border border-[#CFA190]/20 flex items-center justify-center ${card.color} group-hover:scale-105 transition-transform mb-0.5`}>
                  <Icon className="size-5" />
                </div>
                <div className="space-y-0.5 text-center">
                  <p className="text-lg sm:text-2xl font-black text-[#222222] dark:text-white tracking-tight text-center">
                    {card.value}
                  </p>
                  <p className="text-[10px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider text-center">
                    {card.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* User Management Table */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <CardHeader className="p-6 pb-4">
          <div>
            <CardTitle className="text-base sm:text-lg font-black uppercase tracking-wide text-[#222222] dark:text-white">
              User Management
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
              View and manage all registered users. Ban or unban accounts as needed.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <UserTable users={users} />
        </CardContent>
      </Card>

    </div>
  );
}

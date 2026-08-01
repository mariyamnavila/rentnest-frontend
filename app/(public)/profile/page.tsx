import Link from 'next/link';
import { ProfileForm } from '../../(dashboardGroup)/_components/profile/ProfileForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ClipboardList, Building2, Users, DollarSign, Shield } from 'lucide-react';
import { getProfile } from '../../(dashboardGroup)/_actions/profile/profileActions';

export const metadata = {
  title: 'My Profile - RentNest',
  description: 'Manage your profile settings',
};

export default async function ProfilePage() {
  const result = await getProfile();
  const user = result.data;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-sm text-gray-500">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f7] dark:bg-[#1a1d24]">
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">

        {/* Page Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            My <span className="text-[#CFA190]">Profile</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            Manage your account settings and personal information
          </p>
        </div>

        {/* Profile Form */}
        <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <ProfileForm user={user} />
          </CardContent>
        </Card>

        {/* Role-Based Quick Stats */}
        {user.role === 'TENANT' && (
          <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
                Tenant Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-2 gap-3">
                <Link href="/tenant-dashboard/requests" className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] hover:border-[#CFA190]/50 transition-all text-center space-y-2">
                  <ClipboardList className="size-6 text-[#CFA190] mx-auto" />
                  <p className="text-xs font-bold text-[#222222] dark:text-white">My Requests</p>
                </Link>
                <Link href="/tenant-dashboard/payments" className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] hover:border-[#CFA190]/50 transition-all text-center space-y-2">
                  <DollarSign className="size-6 text-[#CFA190] mx-auto" />
                  <p className="text-xs font-bold text-[#222222] dark:text-white">Payments</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {user.role === 'LANDLORD' && (
          <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
                Landlord Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-2 gap-3">
                <Link href="/landlord-dashboard/properties" className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] hover:border-[#CFA190]/50 transition-all text-center space-y-2">
                  <Building2 className="size-6 text-[#CFA190] mx-auto" />
                  <p className="text-xs font-bold text-[#222222] dark:text-white">My Properties</p>
                </Link>
                <Link href="/landlord-dashboard/requests" className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] hover:border-[#CFA190]/50 transition-all text-center space-y-2">
                  <ClipboardList className="size-6 text-[#CFA190] mx-auto" />
                  <p className="text-xs font-bold text-[#222222] dark:text-white">Requests</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {user.role === 'ADMIN' && (
          <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
                Admin Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-3 gap-3">
                <Link href="/admin-dashboard/users" className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] hover:border-[#CFA190]/50 transition-all text-center space-y-2">
                  <Users className="size-6 text-[#CFA190] mx-auto" />
                  <p className="text-xs font-bold text-[#222222] dark:text-white">Users</p>
                </Link>
                <Link href="/admin-dashboard/properties" className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] hover:border-[#CFA190]/50 transition-all text-center space-y-2">
                  <Building2 className="size-6 text-[#CFA190] mx-auto" />
                  <p className="text-xs font-bold text-[#222222] dark:text-white">Listings</p>
                </Link>
                <Link href="/admin-dashboard/categories" className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] hover:border-[#CFA190]/50 transition-all text-center space-y-2">
                  <Shield className="size-6 text-[#CFA190] mx-auto" />
                  <p className="text-xs font-bold text-[#222222] dark:text-white">Categories</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}

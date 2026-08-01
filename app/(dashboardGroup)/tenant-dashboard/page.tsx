import { getMyRentals, getRentalStats } from '../_actions/tenant/dashboardActions';
import { getMe } from '@/service/getMe';
import { StatusBadge } from '../_components/shared/StatusBadge';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  DollarSign,
  ArrowRight,
  Building2,
  Calendar,
  CreditCard,
  Search,
} from 'lucide-react';

export default async function TenantDashboardPage() {
  const [userResult, statsResult, rentalsResult] = await Promise.all([
    getMe(),
    getRentalStats(),
    getMyRentals(),
  ]);

  const userName = userResult?.data?.name || 'Tenant';
  const stats = statsResult.data;
  const rentals = rentalsResult.data;
  const recentRentals = rentals.slice(0, 5);

  const statCards = [
    { label: 'Total Requests', value: stats.total, icon: ClipboardList, color: 'text-[#CFA190]', bg: 'bg-[#fff5f5] dark:bg-[#232733]' },
    { label: 'Pending Approval', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { label: 'Approved Leases', value: stats.approved, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { label: 'Active Stay', value: stats.active, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30' },
    { label: 'Total Spent', value: `$${stats.totalSpent.toLocaleString()}`, icon: DollarSign, color: 'text-[#CFA190]', bg: 'bg-[#fff5f5] dark:bg-[#232733]' },
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            WELCOME BACK, <span className="text-[#CFA190]">{userName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Manage your rental applications, active lease agreements, and payment history in one place.
          </p>
        </div>
      </div>

      {/* Metrics & Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.label}
              className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs hover:shadow-md transition-all group"
            >
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-3">
                <div className={`h-11 w-11 rounded-2xl ${card.bg} border border-[#CFA190]/20 flex items-center justify-center ${card.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-[#222222] dark:text-white tracking-tight">
                    {card.value}
                  </p>
                  <p className="text-[10px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                    {card.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Action Navigation Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/properties" className="group">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs hover:border-[#CFA190]/50 transition-all flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="size-6" />
            </div>
            <div>
              <h3 className="text-xs font-black text-[#222222] dark:text-white uppercase">Explore Properties</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Find verified monthly rentals</p>
            </div>
            <ArrowRight className="size-4 text-gray-400 group-hover:text-[#CFA190] ml-auto transition-colors" />
          </div>
        </Link>

        <Link href="/tenant-dashboard/requests" className="group">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs hover:border-[#CFA190]/50 transition-all flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ClipboardList className="size-6" />
            </div>
            <div>
              <h3 className="text-xs font-black text-[#222222] dark:text-white uppercase">My Applications</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Track submitted requests</p>
            </div>
            <ArrowRight className="size-4 text-gray-400 group-hover:text-[#CFA190] ml-auto transition-colors" />
          </div>
        </Link>

        <Link href="/tenant-dashboard/payments" className="group">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs hover:border-[#CFA190]/50 transition-all flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CreditCard className="size-6" />
            </div>
            <div>
              <h3 className="text-xs font-black text-[#222222] dark:text-white uppercase">Payment History</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">View Stripe transaction receipts</p>
            </div>
            <ArrowRight className="size-4 text-gray-400 group-hover:text-[#CFA190] ml-auto transition-colors" />
          </div>
        </Link>
      </div>

      {/* Recent Requests Section */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm">
        <CardHeader className="p-6 sm:p-8 pb-4 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg font-black uppercase tracking-wide text-[#222222] dark:text-white">
              Recent Applications
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
              Latest rental requests submitted to landlords
            </CardDescription>
          </div>

          <Link href="/tenant-dashboard/requests">
            <Button variant="outline" className="border-[#CFA190] text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-xl text-xs gap-1.5 py-4">
              <span>View All</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 pt-0">
          {recentRentals.length > 0 ? (
            <div className="space-y-3">
              {recentRentals.map((rental) => {
                const propertyImg =
                  rental.property?.images?.[0] ||
                  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

                return (
                  <Link
                    key={rental.id}
                    href={`/tenant-dashboard/requests/${rental.id}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] hover:border-[#CFA190]/50 transition-all gap-4 group shadow-xs"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative h-12 w-14 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                        <Image
                          unoptimized
                          src={propertyImg}
                          alt={rental.property?.title || 'Property'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-sm font-extrabold text-[#222222] dark:text-white truncate group-hover:text-[#CFA190] transition-colors">
                          {rental.property?.title || 'Unknown Property'}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3 text-[#CFA190]" />
                            {new Date(rental.createdAt || '').toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          {rental.property?.price && (
                            <span className="font-bold text-[#CFA190]">
                              ${rental.property.price.toLocaleString()}/mo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-200 dark:border-slate-800">
                      <StatusBadge status={rental.status} />
                      <ArrowRight className="size-4 text-gray-400 group-hover:text-[#CFA190] transition-colors hidden sm:block" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center">
                <ClipboardList className="size-7" />
              </div>
              <div>
                <p className="text-sm font-black text-[#222222] dark:text-white">
                  No Rental Requests Yet
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Start browsing properties and submit your first rental application.
                </p>
              </div>
              <Link href="/properties" className="inline-block pt-1">
                <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs px-6 py-4 cursor-pointer gap-2">
                  <Search className="size-4" />
                  <span>Browse Available Properties</span>
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

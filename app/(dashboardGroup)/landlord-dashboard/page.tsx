import { getMe } from '@/service/getMe';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Building2,
  FileText,
  Clock,
  CheckCircle,
  Zap,
  DollarSign,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { getLandlordProperties, getLandlordStats } from '../_actions/landlord/dashboardActions';

export default async function LandlordDashboardPage() {
  const [userResult, statsResult, propertiesResult] = await Promise.all([
    getMe(),
    getLandlordStats(),
    getLandlordProperties(),
  ]);

  const userName = userResult?.data?.name || 'Landlord';
  const stats = statsResult.data;
  const properties = propertiesResult.data;

  const statCards = stats
    ? [
      { label: 'Total Properties', value: stats.totalProperties, icon: Building2, color: 'text-[#CFA190]', bg: 'bg-[#fff5f5] dark:bg-[#232733]' },
      { label: 'Total Requests', value: stats.totalRequests, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
      { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
      { label: 'Active Leases', value: stats.active, icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
      { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30' },
      { label: 'Total Earnings', value: `$${stats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'text-[#CFA190]', bg: 'bg-[#fff5f5] dark:bg-[#232733]' },
    ]
    : [];

  return (
    <div className="space-y-6 font-sans">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            WELCOME BACK, <span className="text-[#CFA190]">{userName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Manage your properties, review tenant requests, and track your earnings.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
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
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Link href="/landlord-dashboard/properties/new" className="group">
          <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs hover:border-[#CFA190]/50 transition-all flex items-center gap-3">
            <div className="h-11 sm:h-12 w-11 sm:w-12 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <PlusCircle className="size-5 sm:size-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-black text-[#222222] dark:text-white uppercase truncate">Add New Property</h3>
              <p className="text-[11px] text-gray-400 mt-0.5 truncate">List a new rental property</p>
            </div>
            <ArrowRight className="size-4 text-gray-400 group-hover:text-[#CFA190] ml-auto transition-colors shrink-0" />
          </div>
        </Link>

        <Link href="/landlord-dashboard/requests" className="group">
          <div className="p-4 rounded-3xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs hover:border-[#CFA190]/50 transition-all flex items-center gap-3">
            <div className="h-11 sm:h-12 w-11 sm:w-12 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="size-5 sm:size-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-black text-[#222222] dark:text-white uppercase truncate">Tenant Requests</h3>
              <p className="text-[11px] text-gray-400 mt-0.5 truncate">Review incoming applications</p>
            </div>
            <ArrowRight className="size-4 text-gray-400 group-hover:text-[#CFA190] ml-auto transition-colors shrink-0" />
          </div>
        </Link>
      </div>

      {/* Recent Properties */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="p-6 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wide text-[#222222] dark:text-white">
              My Properties
            </h2>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              {properties.length} {properties.length === 1 ? 'listing' : 'listings'} on record
            </p>
          </div>
          <Link href="/landlord-dashboard/properties">
            <Button variant="outline" className="w-full sm:w-auto h-10 rounded-xl border-[#CFA190] text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold text-xs cursor-pointer gap-2">
              View All
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        <div className="px-6 pb-6">
          {properties.length > 0 ? (
            <div className="space-y-3">
              {properties.slice(0, 5).map((property) => {
                const displayImage =
                  property.images?.[0] ||
                  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

                return (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] hover:border-[#CFA190]/50 transition-all gap-3 group shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative h-12 w-14 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                        <Image
                          unoptimized
                          src={displayImage}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-xs sm:text-sm font-extrabold text-[#222222] dark:text-white truncate group-hover:text-[#CFA190] transition-colors">
                          {property.title}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">{property.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <p className="text-sm font-black text-[#CFA190]">
                        ${property.price.toLocaleString()}<span className="text-[10px] text-gray-400 font-normal">/mo</span>
                      </p>
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-bold ${property.isAvailable ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600'}`}>
                        {property.isAvailable ? 'Available' : 'Rented'}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="h-12 sm:h-14 w-12 sm:w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center">
                <Building2 className="size-6 sm:size-7" />
              </div>
              <div>
                <p className="text-sm font-black text-[#222222] dark:text-white">No Properties Yet</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                  Start listing your properties and find tenants.
                </p>
              </div>
              <Link href="/landlord-dashboard/properties/new" className="inline-block pt-1">
                <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs px-5 sm:px-6 py-3.5 sm:py-4 cursor-pointer gap-2">
                  <PlusCircle className="size-4" />
                  <span>Add Your First Property</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

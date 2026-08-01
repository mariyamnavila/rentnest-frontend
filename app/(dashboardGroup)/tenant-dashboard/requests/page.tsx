import Link from 'next/link';
import Image from 'next/image';
import { getMyRentals } from '../../_actions/tenant/dashboardActions';
import { StatusBadge } from '../../_components/shared/StatusBadge';
import { ReviewButton } from '../../_components/tenant/ReviewButton';
import { MapPin, CalendarDays, Eye, Pencil, CreditCard, Plus, FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'My Requests - RentNest',
};

export default async function MyRequestsPage() {
  const result = await getMyRentals();
  const rentals = result.data || [];

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            <FileText className="size-3.5" />
            <span>Applications History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] pt-2 dark:text-white uppercase tracking-tight">
            MY RENTAL <span className="text-[#CFA190]">APPLICATIONS</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Track and manage all your lease requests, approval statuses, and payments.
          </p>
        </div>

        <Link href="/properties">
          <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl px-5 py-5 text-xs sm:text-sm gap-2 cursor-pointer shadow-md transition-transform hover:-translate-y-0.5 shrink-0">
            <Plus className="size-4" />
            <span>New Application</span>
          </Button>
        </Link>
      </div>

      {/* Main Content Card */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm overflow-hidden">
        <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-lg font-black uppercase tracking-wide text-[#222222] dark:text-white">
              All Submitted Requests
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
              Total {rentals.length} {rentals.length === 1 ? 'application' : 'applications'} on record
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0">
          {rentals.length > 0 ? (
            <>
              {/* Desktop & Tablet Data Table (>= 640px) */}
              <div className="hidden sm:block overflow-x-auto rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440]">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                      <th className="py-4 px-5">Property</th>
                      <th className="py-4 px-5">Lease Dates</th>
                      <th className="py-4 px-5">Monthly Rate</th>
                      <th className="py-4 px-5">Status</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                    {rentals.map((rental) => {
                      const displayImage =
                        rental.property?.images?.[0] ||
                        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

                      const isPending = rental.status === 'PENDING';
                      const isApproved = rental.status === 'APPROVED';
                      const isCompleted = rental.status === 'COMPLETED';

                      return (
                        <tr
                          key={rental.id}
                          className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors group"
                        >
                          {/* Property Info */}
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3.5 min-w-50">
                              <div className="relative h-12 w-14 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                                <Image
                                  unoptimized
                                  src={displayImage}
                                  alt={rental.property?.title || 'Property'}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="min-w-0 space-y-0.5">
                                <Link
                                  href={`/tenant-dashboard/requests/${rental.id}`}
                                  className="font-extrabold text-[#222222] dark:text-white truncate block hover:text-[#CFA190] transition-colors text-sm"
                                >
                                  {rental.property?.title || 'Unknown Property'}
                                </Link>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                  <MapPin className="size-3 text-[#CFA190] shrink-0" />
                                  <span className="truncate">{rental.property?.location}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Lease Dates */}
                          <td className="py-4 px-5 min-w-50">
                            <div className="space-y-0.5">
                              <span className="flex items-center gap-1 font-bold text-[#222222] dark:text-white text-xs">
                                <CalendarDays className="size-3.5 text-[#CFA190] shrink-0" />
                                {new Date(rental.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                {' — '}
                                {new Date(rental.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              <span className="text-[10px] text-gray-400 block">
                                Submitted {new Date(rental.createdAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                          </td>

                          {/* Monthly Rate */}
                          <td className="py-4 px-5 font-black text-sm text-[#CFA190]">
                            ${rental.property?.price?.toLocaleString() || 0}
                            <span className="text-[10px] text-gray-400 font-normal">/mo</span>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-5">
                            <StatusBadge status={rental.status} />
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {isApproved && (
                                <Link href={`/tenant-dashboard/requests/${rental.id}/pay`}>
                                  <Button size="sm" className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs px-3 py-1.5 cursor-pointer gap-1">
                                    <CreditCard className="size-3.5" />
                                    <span>Pay Now</span>
                                  </Button>
                                </Link>
                              )}

                              {isPending && (
                                <Link href={`/tenant-dashboard/requests/${rental.id}/edit`}>
                                  <Button size="sm" variant="outline" className="border-[#e4e4e4] dark:border-[#2e3440] text-gray-600 dark:text-slate-200 hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-xl text-xs px-2.5 py-1.5 cursor-pointer">
                                    <Pencil className="size-3.5" />
                                  </Button>
                                </Link>
                              )}

                              {isCompleted && (
                                <ReviewButton
                                  propertyId={rental.propertyId}
                                  propertyName={rental.property?.title || 'this property'}
                                />
                              )}

                              <Link href={`/tenant-dashboard/requests/${rental.id}`}>
                                <Button size="sm" variant="ghost" className="text-gray-500 hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] rounded-xl px-2.5 py-1.5 cursor-pointer">
                                  <Eye className="size-4" />
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Structured Cards View (< 640px) */}
              <div className="sm:hidden space-y-3">
                {rentals.map((rental) => {
                  const displayImage =
                    rental.property?.images?.[0] ||
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

                  const isPending = rental.status === 'PENDING';
                  const isApproved = rental.status === 'APPROVED';
                  const isCompleted = rental.status === 'COMPLETED';

                  return (
                    <div
                      key={rental.id}
                      className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-16 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                          <Image unoptimized src={displayImage} alt={rental.property?.title || 'Property'} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <Link href={`/tenant-dashboard/requests/${rental.id}`} className="text-xs font-black text-[#222222] dark:text-white truncate block">
                            {rental.property?.title || 'Unknown Property'}
                          </Link>
                          <p className="text-[11px] font-extrabold text-[#CFA190]">
                            ${rental.property?.price?.toLocaleString()}/mo
                          </p>
                        </div>
                        <StatusBadge status={rental.status} />
                      </div>

                      <div className="pt-2 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-gray-500">
                        <span className="flex items-center gap-1 font-semibold">
                          <CalendarDays className="size-3 text-[#CFA190]" />
                          {new Date(rental.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(rental.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>

                        <div className="flex items-center gap-2">
                          {isApproved && (
                            <Link href={`/tenant-dashboard/requests/${rental.id}/pay`}>
                              <Button size="sm" className="bg-[#CFA190] text-white font-bold rounded-lg text-[10px] px-2.5 py-1">
                                Pay
                              </Button>
                            </Link>
                          )}
                          {isPending && (
                            <Link href={`/tenant-dashboard/requests/${rental.id}/edit`}>
                              <Button size="sm" variant="outline" className="text-xs p-1.5 h-7">
                                <Pencil className="size-3" />
                              </Button>
                            </Link>
                          )}
                          {isCompleted && (
                            <ReviewButton
                              propertyId={rental.propertyId}
                              propertyName={rental.property?.title || 'this property'}
                              compact
                            />
                          )}
                          <Link href={`/tenant-dashboard/requests/${rental.id}`}>
                            <Button size="sm" variant="ghost" className="text-xs p-1.5 h-7">
                              <Eye className="size-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-12 p-6 space-y-3">
              <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center">
                <FileText className="size-7" />
              </div>
              <div>
                <p className="text-sm font-black text-[#222222] dark:text-white">No Applications Found</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">You haven&apos;t submitted any rental requests yet.</p>
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

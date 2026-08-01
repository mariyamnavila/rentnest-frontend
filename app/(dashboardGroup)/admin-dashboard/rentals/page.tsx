import { getAdminRentals } from '../../_actions/admin/adminActions';
import { StatusBadge } from '../../_components/shared/StatusBadge';
import Image from 'next/image';
import { ClipboardList, CalendarDays, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Rentals - Admin Dashboard',
  description: 'View all rental requests on the platform',
};

export default async function AdminRentalsPage() {
  const result = await getAdminRentals();
  const rentals = result.data;

  const totalRevenue = rentals.flatMap((r) => r.payments ?? []).filter((p) => p.status === 'COMPLETED').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            Rental <span className="text-[#CFA190]">Requests</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {rentals.length} total requests · ${totalRevenue.toLocaleString()} total revenue
          </p>
        </div>
      </div>

      {/* Rentals Table */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs pb-1">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
            All Rental Requests
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            Every rental request submitted on the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {rentals.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440]">
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Property</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Tenant</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Landlord</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Dates</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                  {rentals.map((rental) => {
                    const img = rental.property?.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';
                    const paidAmount = rental.payments?.filter((p) => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0) || 0;

                    return (
                      <tr key={rental.id} className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                              <Image unoptimized src={img} alt={rental.property?.title || 'Property'} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-[#222222] dark:text-white truncate max-w-45">
                                {rental.property?.title || 'Unknown'}
                              </p>
                              <p className="text-[10px] text-gray-400">
                                ${rental.property?.price?.toLocaleString() || 0}/mo
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-xs text-gray-500 dark:text-slate-400">
                          {rental.tenant?.name || '—'}
                        </td>
                        <td className="py-3.5 px-5 text-xs text-gray-500 dark:text-slate-400">
                          {rental.property?.landlord?.name || '—'}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                            <CalendarDays className="size-3 text-[#CFA190] shrink-0" />
                            {new Date(rental.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            {' – '}
                            {new Date(rental.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="py-3.5 px-5">
                          <StatusBadge status={rental.status} />
                        </td>
                        <td className="py-3.5 px-5">
                          {paidAmount > 0 ? (
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              <DollarSign className="size-3" />
                              {paidAmount.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center">
                <ClipboardList className="size-6" />
              </div>
              <p className="text-sm font-bold text-[#222222] dark:text-white">No Rental Requests</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">No rental requests have been submitted yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

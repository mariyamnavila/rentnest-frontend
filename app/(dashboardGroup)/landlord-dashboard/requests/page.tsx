import { getLandlordRequests } from '../../_actions/landlord/requestActions';
import { RequestActions } from '../../_components/landlord/RequestActions';
import { StatusBadge } from '../../_components/shared/StatusBadge';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, MapPin, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Tenant Requests - RentNest',
};

export default async function LandlordRequestsPage() {
  const result = await getLandlordRequests();
  const requests = result.data;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            <FileText className="size-3.5" />
            <span>Inbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            TENANT <span className="text-[#CFA190]">REQUESTS</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Review and manage incoming rental applications.
          </p>
        </div>
      </div>

      {/* Content */}
      {requests.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-4 px-6">Tenant</th>
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-6">Dates</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                  {requests.map((request) => {
                    const displayImage =
                      request.property?.images?.[0] ||
                      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

                    return (
                      <tr
                        key={request.id}
                        className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors"
                      >
                        {/* Tenant */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3 min-w-45">
                            <div className="h-9 w-9 rounded-full bg-[#CFA190] text-white flex items-center justify-center text-xs font-bold shrink-0">
                              {request.tenant?.name?.[0]?.toUpperCase() || 'T'}
                            </div>
                            <div className="min-w-0 space-y-0.5">
                              <p className="font-extrabold text-[#222222] dark:text-white truncate text-sm">
                                {request.tenant?.name || 'Unknown'}
                              </p>
                              <p className="text-[11px] text-gray-400 truncate">
                                {request.tenant?.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Property */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3 min-w-50">
                            <div className="relative h-10 w-12 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                              <Image
                                unoptimized
                                src={displayImage}
                                alt={request.property?.title || 'Property'}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 space-y-0.5">
                              <Link
                                href={`/properties/${request.propertyId}`}
                                className="font-extrabold text-[#222222] dark:text-white truncate block hover:text-[#CFA190] transition-colors text-sm"
                              >
                                {request.property?.title || 'Unknown'}
                              </Link>
                              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                <MapPin className="size-3 text-[#CFA190] shrink-0" />
                                <span className="truncate">{request.property?.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Dates */}
                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <span className="flex items-center gap-1 font-bold text-[#222222] dark:text-white text-xs">
                              <Calendar className="size-3.5 text-[#CFA190]" />
                              {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              {' — '}
                              {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            {request.message && (
                              <p className="text-[10px] text-gray-400 truncate max-w-37.5">
                                &ldquo;{request.message}&rdquo;
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          <StatusBadge status={request.status} />
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <RequestActions rentalRequestId={request.id} status={request.status} request={request} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {requests.map((request) => {
              const displayImage =
                request.property?.images?.[0] ||
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

              return (
                <div
                  key={request.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] space-y-3"
                >
                  {/* Tenant & Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#CFA190] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {request.tenant?.name?.[0]?.toUpperCase() || 'T'}
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#222222] dark:text-white">{request.tenant?.name}</p>
                        <p className="text-[10px] text-gray-400">{request.tenant?.email}</p>
                      </div>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>

                  {/* Property */}
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-12 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                      <Image unoptimized src={displayImage} alt={request.property?.title || ''} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <Link href={`/properties/${request.propertyId}`} className="text-xs font-bold text-[#222222] dark:text-white truncate block hover:text-[#CFA190]">
                        {request.property?.title}
                      </Link>
                      <p className="text-[10px] text-gray-400">{request.property?.location}</p>
                    </div>
                  </div>

                  {/* Dates & Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                    <span className="flex items-center gap-1 text-[11px] text-gray-500">
                      <Calendar className="size-3 text-[#CFA190]" />
                      {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <RequestActions rentalRequestId={request.id} status={request.status} request={request} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm">
          <div className="space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center">
              <FileText className="size-7" />
            </div>
            <div>
              <p className="text-sm font-black text-[#222222] dark:text-white">No Requests Yet</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Incoming rental requests will appear here.
              </p>
            </div>
            <Link href="/landlord-dashboard/properties" className="inline-block pt-1">
              <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs px-6 py-4 cursor-pointer gap-2">
                <Search className="size-4" />
                <span>View My Properties</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

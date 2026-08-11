'use client';

import { useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, MapPin, Calendar, ArrowUpDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '../shared/StatusBadge';
import { RequestActions } from './RequestActions';
import type { IRentalRequest } from '@/lib/types';
import type { LandlordMeta } from '../../_actions/landlord/dashboardActions';

type LandlordRequestsTableProps = {
  requests: IRentalRequest[];
  meta: LandlordMeta | null;
};

export function LandlordRequestsTable({ requests, meta }: LandlordRequestsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const statusFilter = searchParams.get('status') || 'ALL';
  const sortBy = searchParams.get('sortBy') || 'newest';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'ALL') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleChange = (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      params.delete('page');

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  const handleClear = () => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('page');

    router.replace(`${pathname}?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;
  const itemsPerPage = meta?.limit || 5;
  const total = meta?.total || 0;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, total);

  return (
    <div className="space-y-4 font-sans">
      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 mb-5">
        {/* Search Input */}
        <div className="relative sm:col-span-1 lg:col-span-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            defaultValue={searchParams.get('search') ?? ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search by tenant name, email, property title..."
            className="pl-10 pr-10 h-11 rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium placeholder:text-gray-400"
          />
          {searchParams.get('search') && (
            <button
              onClick={handleClear}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2e3440] transition-colors cursor-pointer"
            >
              <X className="size-3.5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="lg:col-span-3">
          <Select
            value={statusFilter}
            onValueChange={(val) => updateFilters('status', val)}
          >
            <SelectTrigger className="w-full h-11! rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-xs font-bold text-[#222222] dark:text-slate-100">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-white dark:bg-[#1a1d24]">
              <SelectItem value="ALL" className="font-bold text-xs">All Status</SelectItem>
              <SelectItem value="PENDING" className="font-bold text-xs">Pending</SelectItem>
              <SelectItem value="APPROVED" className="font-bold text-xs">Approved</SelectItem>
              <SelectItem value="REJECTED" className="font-bold text-xs">Rejected</SelectItem>
              <SelectItem value="ACTIVE" className="font-bold text-xs">Active Stay</SelectItem>
              <SelectItem value="COMPLETED" className="font-bold text-xs">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sorting Dropdown */}
        <div className="lg:col-span-3">
          <Select
            value={sortBy}
            onValueChange={(val) => updateFilters('sortBy', val)}
          >
            <SelectTrigger className="w-full h-11! rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-xs font-bold text-[#222222] dark:text-slate-100">
              <span className="flex items-center gap-1.5">
                <ArrowUpDown className="size-3.5 text-[#CFA190]" />
                <SelectValue placeholder="Sort By" />
              </span>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-white dark:bg-[#1a1d24]">
              <SelectItem value="newest" className="font-bold text-xs">Newest First</SelectItem>
              <SelectItem value="price-asc" className="font-bold text-xs">Price: Low to High</SelectItem>
              <SelectItem value="price-desc" className="font-bold text-xs">Price: High to Low</SelectItem>
              <SelectItem value="start-date" className="font-bold text-xs">Start Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {requests.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440]">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                  <th className="py-4 px-6">Tenant</th>
                  <th className="py-4 px-6">Property</th>
                  <th className="py-4 px-6 min-w-50 whitespace-nowrap">Dates</th>
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
                          <div className="relative h-10 w-12 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1a1d24]">
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
                              className="font-extrabold text-[#222222] dark:text-white truncate block hover:text-[#CFA190] transition-colors text-sm max-w-50"
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
                      <td className="py-4 px-6 min-w-50 whitespace-nowrap">
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
                    <div className="relative h-10 w-12 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1a1d24]">
                      <Image unoptimized src={displayImage} alt={request.property?.title || ''} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <Link href={`/properties/${request.propertyId}`} className="text-xs font-bold text-[#222222] dark:text-white truncate block hover:text-[#CFA190] max-w-50">
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

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-400 font-medium">
              Showing {startIndex}–{endIndex} of {total} applications
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] p-0 cursor-pointer text-gray-500"
              >
                <ChevronLeft className="size-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  size="sm"
                  variant={page === currentPage ? 'default' : 'outline'}
                  onClick={() => goToPage(page)}
                  className={`h-9 w-9 rounded-xl text-xs font-bold p-0 cursor-pointer ${page === currentPage
                    ? 'bg-[#CFA190] hover:bg-[#C08E82] text-white border-0'
                    : 'border-[#e4e4e4] dark:border-[#2e3440] text-gray-500'
                    }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] p-0 cursor-pointer text-gray-500"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 border border-dashed border-[#e4e4e4] dark:border-[#2e3440] rounded-2xl">
          <p className="text-sm text-gray-500">No requests matching your criteria found.</p>
        </div>
      )}
    </div>
  );
}

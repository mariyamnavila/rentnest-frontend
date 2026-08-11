'use client';

import { useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, MapPin, CalendarDays, Eye, Pencil, CreditCard, ArrowUpDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '../shared/StatusBadge';
import { ReviewButton } from './ReviewButton';
import type { IRentalRequest } from '@/lib/types';
import type { TenantMeta } from '../../_actions/tenant/dashboardActions';

type TenantRequestsTableProps = {
  rentals: IRentalRequest[];
  meta: TenantMeta | null;
};

export function TenantRequestsTable({ rentals, meta }: TenantRequestsTableProps) {
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
            placeholder="Search by property title, location..."
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
              <SelectItem value="newest" className="font-bold text-xs">Newest Requested</SelectItem>
              <SelectItem value="price-asc" className="font-bold text-xs">Price: Low to High</SelectItem>
              <SelectItem value="price-desc" className="font-bold text-xs">Price: High to Low</SelectItem>
              <SelectItem value="start-date" className="font-bold text-xs">Start Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {rentals.length > 0 ? (
        <>
          {/* Desktop & Tablet Data Table (>= 640px) */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440]">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                  <th className="py-4 px-5">Property</th>
                  <th className="py-4 px-5 min-w-50 whitespace-nowrap">Lease Dates</th>
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
                  const isActive = rental.status === 'ACTIVE';
                  const isCompleted = rental.status === 'COMPLETED';
                  const canReview = isActive || isCompleted;

                  return (
                    <tr
                      key={rental.id}
                      className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors group"
                    >
                      {/* Property Info */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5 min-w-50">
                          <div className="relative h-12 w-14 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1a1d24]">
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
                              className="font-extrabold text-[#222222] dark:text-white truncate block hover:text-[#CFA190] transition-colors text-sm max-w-50"
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
                      <td className="py-4 px-5 min-w-50 whitespace-nowrap">
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

                          {canReview && (
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
                    <div className="relative h-14 w-16 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1a1d24]">
                      <Image unoptimized src={displayImage} alt={rental.property?.title || 'Property'} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <Link href={`/tenant-dashboard/requests/${rental.id}`} className="text-xs font-black text-[#222222] dark:text-white truncate block max-w-50">
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
          <p className="text-sm text-gray-500">No applications matching your criteria found.</p>
        </div>
      )}
    </div>
  );
}

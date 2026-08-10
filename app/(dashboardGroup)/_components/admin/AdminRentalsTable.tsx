'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight, CalendarDays, DollarSign, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '../shared/StatusBadge';
import type { IRentalRequest } from '@/lib/types';
import type { AdminUserMeta } from '../../_actions/admin/adminActions';

type AdminRentalsTableProps = {
  rentals: IRentalRequest[];
  meta: AdminUserMeta | null;
};

export function AdminRentalsTable({ rentals, meta }: AdminRentalsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
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

  const handleSearch = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val.trim()) {
      params.set('search', val.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;
  const itemsPerPage = meta?.limit || 8;
  const total = meta?.total || 0;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, total);

  return (
    <div className="space-y-4">
      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 mb-5">
        {/* Search Input */}
        <div className="relative sm:col-span-1 lg:col-span-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search by property, tenant, or landlord..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch(search);
            }}
            className="pl-10 h-11 rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium placeholder:text-gray-400"
          />
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

      {/* Rentals Table */}
      {rentals.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440]">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440]">
                  <th className="py-3.5 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Property</th>
                  <th className="py-3.5 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Tenant</th>
                  <th className="py-3.5 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider min-w-45 whitespace-nowrap">Lease Dates</th>
                  <th className="py-3.5 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Payments</th>
                  <th className="py-3.5 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                {rentals.map((rental) => {
                  const img = rental.property?.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';
                  // const isCompleted = rental.status === 'COMPLETED';

                  // Calculate total payments received
                  const totalPaid = rental.payments
                    ?.filter((p) => p.status === 'COMPLETED')
                    .reduce((sum, p) => sum + p.amount, 0) || 0;

                  return (
                    <tr key={rental.id} className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#1a1d24]">
                            <Image unoptimized src={img} alt={rental.property?.title || 'Property'} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#222222] dark:text-white truncate max-w-50">{rental.property?.title || 'Unknown Property'}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{rental.property?.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#222222] dark:text-white truncate">{rental.tenant?.name}</p>
                          <p className="text-[10px] text-gray-400 truncate">{rental.tenant?.email}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 min-w-45 whitespace-nowrap">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400 font-medium">
                          <CalendarDays className="size-3.5 text-[#CFA190]" />
                          {new Date(rental.startDate).toLocaleDateString()} – {new Date(rental.endDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1 font-black text-xs text-[#CFA190]">
                          <DollarSign className="size-3 text-[#CFA190] shrink-0" />
                          <span>{totalPaid.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-400 font-normal">total</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusBadge status={rental.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

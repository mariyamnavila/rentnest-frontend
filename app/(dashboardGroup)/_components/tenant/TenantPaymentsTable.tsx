'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, CreditCard, Calendar, ArrowUpRight, DollarSign, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '../shared/StatusBadge';
import type { IPayment } from '@/lib/types';
import type { PaymentMeta } from '../../_actions/tenant/paymentHistoryActions';

type TenantPaymentsTableProps = {
  payments: IPayment[];
  meta: PaymentMeta | null;
};

export function TenantPaymentsTable({ payments, meta }: TenantPaymentsTableProps) {
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
            placeholder="Search payments by property, location..."
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
              <SelectItem value="COMPLETED" className="font-bold text-xs">Completed</SelectItem>
              <SelectItem value="FAILED" className="font-bold text-xs">Failed</SelectItem>
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
              <SelectItem value="newest" className="font-bold text-xs">Newest Paid</SelectItem>
              <SelectItem value="amount-asc" className="font-bold text-xs">Amount: Low to High</SelectItem>
              <SelectItem value="amount-desc" className="font-bold text-xs">Amount: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {payments.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Method</th>
                    <th className="py-4 px-6 min-w-35 whitespace-nowrap">Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Request</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="min-w-0">
                          <p className="font-extrabold text-[#222222] dark:text-white truncate text-sm">
                            {payment.rentalRequest?.property?.title || 'Unknown Property'}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">
                            {payment.rentalRequest?.property?.location}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-black text-sm text-[#CFA190]">
                          ${payment.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f7f7f7] dark:bg-[#232733] text-[11px] font-bold text-gray-600 dark:text-slate-300 border border-gray-100 dark:border-slate-800">
                          <CreditCard className="size-3" />
                          {payment.method}
                        </span>
                      </td>
                      <td className="py-4 px-6 min-w-35 whitespace-nowrap">
                        <span className="flex items-center gap-1 text-[11px] text-gray-500 font-semibold">
                          <Calendar className="size-3.5 text-[#CFA190] shrink-0" />
                          {payment.paidAt
                            ? new Date(payment.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : new Date(payment.createdAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/tenant-dashboard/payments/${payment.id}`}>
                          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] rounded-xl px-2.5 py-1.5 cursor-pointer">
                            <ArrowUpRight className="size-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-xs font-black text-[#222222] dark:text-white truncate">
                      {payment.rentalRequest?.property?.title || 'Unknown Property'}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {payment.rentalRequest?.property?.location}
                    </p>
                  </div>
                  <StatusBadge status={payment.status} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 font-bold text-[#CFA190]">
                      <DollarSign className="size-3" />
                      ${payment.amount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Calendar className="size-3 text-[#CFA190]" />
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : new Date(payment.createdAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <Link href={`/tenant-dashboard/payments/${payment.id}`}>
                    <Button size="sm" variant="ghost" className="text-xs p-1.5 h-7">
                      <ArrowUpRight className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-400 font-medium">
              Showing {startIndex}–{endIndex} of {total} transactions
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
          <p className="text-sm text-gray-500">No transactions matching your criteria found.</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Star, MessageSquare, MapPin, Calendar, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { IMyReview } from '@/lib/types';
import type { ReviewsMeta } from '../../_actions/tenant/reviewActions';

type TenantReviewsTableProps = {
  reviews: IMyReview[];
  meta: ReviewsMeta | null;
};

export function TenantReviewsTable({ reviews, meta }: TenantReviewsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const ratingFilter = searchParams.get('rating') || 'ALL';
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
            placeholder="Search reviews by property, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch(search);
            }}
            className="pl-10 h-11 rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-sm font-medium placeholder:text-gray-400"
          />
        </div>

        {/* Rating Filter */}
        <div className="lg:col-span-3">
          <Select
            value={ratingFilter}
            onValueChange={(val) => updateFilters('rating', val)}
          >
            <SelectTrigger className="w-full h-11! rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] text-xs font-bold text-[#222222] dark:text-slate-100">
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-white dark:bg-[#1a1d24]">
              <SelectItem value="ALL" className="font-bold text-xs">All Ratings</SelectItem>
              <SelectItem value="5" className="font-bold text-xs">5 Stars</SelectItem>
              <SelectItem value="4" className="font-bold text-xs">4 Stars</SelectItem>
              <SelectItem value="3" className="font-bold text-xs">3 Stars</SelectItem>
              <SelectItem value="2" className="font-bold text-xs">2 Stars</SelectItem>
              <SelectItem value="1" className="font-bold text-xs">1 Star</SelectItem>
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
              <SelectItem value="newest" className="font-bold text-xs">Newest Reviewed</SelectItem>
              <SelectItem value="oldest" className="font-bold text-xs">Oldest Reviewed</SelectItem>
              <SelectItem value="rating-desc" className="font-bold text-xs">Highest Rated</SelectItem>
              <SelectItem value="rating-asc" className="font-bold text-xs">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {reviews.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-6">Rating</th>
                    <th className="py-4 px-6">Comment</th>
                    <th className="py-4 px-6 min-w-35 whitespace-nowrap">Date</th>
                    <th className="py-4 px-6 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                  {reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="min-w-0">
                          <p className="font-extrabold text-[#222222] dark:text-white truncate text-sm max-w-50">
                            {review.property?.title || 'Unknown Property'}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate flex items-center gap-1">
                            <MapPin className="size-3" />
                            {review.property?.location}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`size-4 ${star <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-gray-200 text-gray-200 dark:fill-slate-700 dark:text-slate-700'
                                }`}
                            />
                          ))}
                          <span className="ml-1.5 text-[11px] font-bold text-gray-500 dark:text-slate-400">
                            {review.rating}/5
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {review.comment ? (
                          <p className="text-xs text-gray-600 dark:text-slate-300 max-w-50 truncate">
                            {review.comment}
                          </p>
                        ) : (
                          <span className="text-xs text-gray-400 italic">No comment</span>
                        )}
                      </td>
                      <td className="py-4 px-6 min-w-35 whitespace-nowrap">
                        <span className="flex items-center gap-1 text-[11px] text-gray-500">
                          <Calendar className="size-3 text-[#CFA190]" />
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                            : '-'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/properties/${review.propertyId}`} target="_blank">
                          <span className="inline-flex h-8 w-8 rounded-xl hover:bg-[#fff5f5] dark:hover:bg-[#232733] items-center justify-center text-gray-400 hover:text-[#CFA190] transition-colors">
                            <MessageSquare className="size-4" />
                          </span>
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
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-xs font-black text-[#222222] dark:text-white truncate max-w-50">
                      {review.property?.title || 'Unknown Property'}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate flex items-center gap-1">
                      <MapPin className="size-3" />
                      {review.property?.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`size-3.5 ${star <= review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200 dark:fill-slate-700 dark:text-slate-700'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {review.comment && (
                  <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                  <span className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Calendar className="size-3 text-[#CFA190]" />
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                      : '-'}
                  </span>
                  <Link href={`/properties/${review.propertyId}`} target="_blank">
                    <Button size="sm" variant="ghost" className="text-xs p-1.5 h-7">
                      <MessageSquare className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-400 font-medium">
              Showing {startIndex}–{endIndex} of {total} reviews
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
          <p className="text-sm text-gray-500">No reviews matching your criteria found.</p>
        </div>
      )}
    </div>
  );
}

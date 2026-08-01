'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyMeta } from '../../_actions/properties/propertyActions';

type PropertyPaginationProps = {
  meta: PropertyMeta;
};

export function PropertyPagination({ meta }: PropertyPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = meta.page;
  const totalPages = meta.totalPages;

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const getPageNumbers = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-between pt-6">
      <p className="text-xs text-gray-500 dark:text-slate-400">
        Showing page <span className="font-bold text-[#222222] dark:text-white">{currentPage}</span> of{' '}
        <span className="font-bold text-[#222222] dark:text-white">{totalPages}</span>{' '}
        ({meta.total} properties)
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
          className="border-[#e4e4e4] dark:border-[#2e3440] text-[#222222] dark:text-slate-200 disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </Button>

        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-xs text-gray-400"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => goToPage(page)}
              className={`min-w-8 cursor-pointer ${currentPage === page
                  ? 'bg-[#CFA190] hover:bg-[#C08E82] text-white border-[#CFA190]'
                  : 'border-[#e4e4e4] dark:border-[#2e3440] text-[#222222] dark:text-slate-200'
                }`}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="border-[#e4e4e4] dark:border-[#2e3440] text-[#222222] dark:text-slate-200 disabled:opacity-40 cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

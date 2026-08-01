'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';

const sortOptions = [
  { label: 'Newest First', sortBy: 'createdAt', sortOrder: 'desc' },
  { label: 'Oldest First', sortBy: 'createdAt', sortOrder: 'asc' },
  { label: 'Price: Low to High', sortBy: 'price', sortOrder: 'asc' },
  { label: 'Price: High to Low', sortBy: 'price', sortOrder: 'desc' },
];

export function PropertySortBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSortBy = searchParams.get('sortBy') ?? 'createdAt';
  const activeSortOrder = searchParams.get('sortOrder') ?? 'desc';

  const activeValue = `${activeSortBy}-${activeSortOrder}`;

  const updateSort = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    params.delete('page');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="size-3.5 text-[#CFA190] shrink-0" />

      {/* Mobile: Select Dropdown */}
      <select
        value={activeValue}
        onChange={(e) => updateSort(e.target.value)}
        className="lg:hidden flex-1 appearance-none bg-white dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] rounded-xl px-3 py-2 text-xs font-bold text-[#222222] dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#CFA190]/50"
      >
        {sortOptions.map((option) => (
          <option key={option.label} value={`${option.sortBy}-${option.sortOrder}`}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Desktop: Button Group */}
      <div className="hidden lg:flex items-center gap-1.5">
        {sortOptions.map((option) => {
          const isActive =
            option.sortBy === activeSortBy && option.sortOrder === activeSortOrder;
          return (
            <button
              key={option.label}
              onClick={() => updateSort(`${option.sortBy}-${option.sortOrder}`)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                isActive
                  ? 'border-[#CFA190] bg-[#fff5f5] text-[#CFA190] dark:bg-[#232733]'
                  : 'border-[#e4e4e4] dark:border-[#2e3440] bg-gray-50 dark:bg-[#1a1d24] text-gray-600 dark:text-slate-300 hover:border-[#CFA190]/50'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

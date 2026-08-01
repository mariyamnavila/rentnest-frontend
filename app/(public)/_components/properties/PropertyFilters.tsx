'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { MapPin, DollarSign, Tag, SlidersHorizontal, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { ICategory } from '@/lib/types';

type PropertyFiltersProps = {
  categories: ICategory[];
};

export function PropertyFilters({ categories }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategoryId = searchParams.get('categoryId') ?? '';
  const activeLocation = searchParams.get('location') ?? '';
  const activeMinPrice = searchParams.get('minPrice') ?? '';
  const activeMaxPrice = searchParams.get('maxPrice') ?? '';

  const [minPriceInput, setMinPriceInput] = useState(activeMinPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(activeMaxPrice);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete('page');

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const applyPriceRange = () => {
    updateParam('minPrice', minPriceInput.trim() || null);
    updateParam('maxPrice', maxPriceInput.trim() || null);
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applyPriceRange();
  };

  const clearAllFilters = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    router.replace(pathname);
  };

  const hasActiveFilters =
    activeCategoryId || activeLocation || activeMinPrice || activeMaxPrice;

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-[#CFA190]" />
          <h3 className="text-sm font-black uppercase tracking-wide text-[#222222] dark:text-white">
            Filters
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-[11px] font-bold text-[#CFA190] hover:underline cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
          <MapPin className="size-3.5 text-[#CFA190]" />
          Location
        </label>

        <Input
          type="text"
          defaultValue={activeLocation}
          onBlur={(e) => updateParam('location', e.target.value || null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateParam('location', e.currentTarget.value || null);
            }
          }}
          placeholder="Enter exact location..."
          className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
          <Tag className="size-3.5 text-[#CFA190]" />
          Category
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParam('categoryId', null)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${!activeCategoryId
              ? 'border-[#CFA190] bg-[#fff5f5] text-[#CFA190] dark:bg-[#232733]'
              : 'border-[#e4e4e4] dark:border-[#2e3440] bg-gray-50 dark:bg-[#1a1d24] text-gray-600 dark:text-slate-300 hover:border-[#CFA190]/50'
              }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParam('categoryId', cat.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${activeCategoryId === cat.id
                ? 'border-[#CFA190] bg-[#fff5f5] text-[#CFA190] dark:bg-[#232733]'
                : 'border-[#e4e4e4] dark:border-[#2e3440] bg-gray-50 dark:bg-[#1a1d24] text-gray-600 dark:text-slate-300 hover:border-[#CFA190]/50'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
          <DollarSign className="size-3.5 text-[#CFA190]" />
          Price Range
        </label>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="0"
            value={minPriceInput}
            onChange={(e) => setMinPriceInput(e.target.value)}
            onKeyDown={handlePriceKeyDown}
            placeholder="Min"
            className="flex-1 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-3 text-sm"
          />

          <span className="text-xs text-gray-400 font-bold">—</span>

          <Input
            type="number"
            min="0"
            value={maxPriceInput}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            onKeyDown={handlePriceKeyDown}
            placeholder="Max"
            className="flex-1 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-3 text-sm"
          />

          <Button
            type="button"
            onClick={applyPriceRange}
            size="sm"
            className="shrink-0 h-10 w-10 p-0 rounded-xl bg-[#CFA190] hover:bg-[#C08E82] text-white cursor-pointer"
          >
            <Search className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
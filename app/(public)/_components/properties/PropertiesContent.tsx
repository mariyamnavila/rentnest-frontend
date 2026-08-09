'use client';

import { motion } from 'framer-motion';
import { PropertyCard } from './PropertyCard';
import { PropertySearchBar } from './PropertySearchBar';
import { PropertyFilters } from './PropertyFilters';
import { PropertyPagination } from './PropertyPagination';
import { PropertySortBar } from './PropertySortBar';
import { Home } from 'lucide-react';
import type { IProperty, ICategory } from '@/lib/types';
import { PropertyMeta, PropertyQuery } from '../../_actions/properties/propertyActions';

type PropertiesContentProps = {
  initialProperties: IProperty[];
  initialMeta: PropertyMeta;
  categories: ICategory[];
  initialQuery: PropertyQuery;
};

export function PropertiesContent({
  initialProperties,
  initialMeta,
  categories,
}: PropertiesContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row gap-8"
    >
      {/* Sidebar Filters (Desktop) */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] p-5">
          <PropertyFilters categories={categories} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Mobile Search */}
        <div className="lg:hidden">
          <PropertySearchBar />
        </div>

        {/* Desktop Search + Sort Bar */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex-1">
            <PropertySearchBar />
          </div>
          <PropertySortBar />
        </div>

        {/* Mobile Sort */}
        <div className="lg:hidden">
          <PropertySortBar />
        </div>

        {/* Mobile Filters Toggle */}
        <details className="lg:hidden">
          <summary className="cursor-pointer text-sm font-bold text-[#CFA190] uppercase tracking-wide">
            Show Filters
          </summary>
          <div className="mt-4 bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] p-5">
            <PropertyFilters categories={categories} />
          </div>
        </details>

        {/* Results Count */}
        <div className="text-xs text-gray-500 dark:text-slate-400">
          <span className="font-bold text-[#222222] dark:text-white">{initialMeta.total}</span>{' '}
          {initialMeta.total === 1 ? 'property' : 'properties'} found
        </div>

        {/* Property Grid */}
        {initialProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {initialProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-full bg-[#fff5f5] dark:bg-[#232733] flex items-center justify-center mb-4">
              <Home className="size-8 text-[#CFA190]" />
            </div>
            <h3 className="text-lg font-black text-[#222222] dark:text-white mb-1">
              No Properties Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm">
              Try adjusting your filters or search terms to find what you&apos;re looking for.
            </p>
          </div>
        )}

        {/* Pagination */}
        <PropertyPagination meta={initialMeta} />
      </div>
    </motion.div>
  );
}

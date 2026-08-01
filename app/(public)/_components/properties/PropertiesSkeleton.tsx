'use client';

export function PropertiesSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Skeleton */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] p-5 space-y-6">
          {/* Filter Header */}
          <div className="h-4 w-20 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
          {/* Location */}
          <div className="space-y-2">
            <div className="h-3 w-16 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 dark:bg-[#2e3440] rounded-xl animate-pulse" />
          </div>
          {/* Categories */}
          <div className="space-y-2">
            <div className="h-3 w-16 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-7 w-16 bg-gray-200 dark:bg-[#2e3440] rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          {/* Price */}
          <div className="space-y-2">
            <div className="h-3 w-20 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-[#2e3440] rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Search Skeleton */}
        <div className="h-12 w-full bg-gray-200 dark:bg-[#2e3440] rounded-xl animate-pulse" />

        {/* Sort Skeleton */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-7 w-24 bg-gray-200 dark:bg-[#2e3440] rounded-lg animate-pulse" />
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-[#e4e4e4] dark:border-[#2e3440] bg-white dark:bg-[#232733]"
            >
              <div className="aspect-4/3 w-full bg-gray-200 dark:bg-[#2e3440] animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-32 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
                <div className="h-4 w-48 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
                <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-slate-700/80">
                  <div className="h-3 w-24 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

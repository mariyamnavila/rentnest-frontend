export function PropertyDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 max-w-6xl py-8">
      {/* Back Button Skeleton */}
      <div className="h-4 w-32 bg-gray-200 dark:bg-[#2e3440] rounded mb-6 animate-pulse" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Image Skeleton */}
          <div className="aspect-16/10 w-full rounded-2xl bg-gray-200 dark:bg-[#2e3440] animate-pulse" />

          {/* Thumbnail Skeleton */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-16 rounded-xl bg-gray-200 dark:bg-[#2e3440] animate-pulse" />
            ))}
          </div>

          {/* Description Skeleton */}
          <div className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] p-6 space-y-3">
            <div className="h-4 w-40 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
              <div className="h-3 w-full bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            </div>
          </div>

          {/* Amenities Skeleton */}
          <div className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] p-6 space-y-3">
            <div className="h-4 w-28 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-7 w-24 bg-gray-200 dark:bg-[#2e3440] rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <aside className="lg:w-80 shrink-0 space-y-4">
          <div className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] p-6 space-y-4">
            <div className="h-8 w-32 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            <div className="h-12 w-full bg-gray-200 dark:bg-[#2e3440] rounded-xl animate-pulse" />
          </div>
          <div className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] p-6 space-y-3">
            <div className="h-4 w-20 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-[#2e3440] animate-pulse" />
              <div className="space-y-1.5">
                <div className="h-3 w-28 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
                <div className="h-2.5 w-36 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

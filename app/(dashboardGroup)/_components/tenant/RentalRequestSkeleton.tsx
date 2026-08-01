export function RentalRequestSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="h-4 w-32 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />

      <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440]">
        <div className="h-16 w-20 rounded-xl bg-gray-200 dark:bg-[#2e3440] animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
          <div className="h-3 w-28 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] p-6 space-y-5">
        <div className="space-y-1">
          <div className="h-5 w-36 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
          <div className="h-3 w-64 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 w-28 bg-gray-200 dark:bg-[#2e3440] rounded animate-pulse" />
            <div className="h-12 w-full bg-gray-200 dark:bg-[#2e3440] rounded-xl animate-pulse" />
          </div>
        ))}
        <div className="h-12 w-full bg-gray-200 dark:bg-[#2e3440] rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

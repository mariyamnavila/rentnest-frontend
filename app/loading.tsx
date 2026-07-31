import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex-1 min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4 bg-background font-sans">
      <div className="flex flex-col items-center space-y-4 text-center">
        
        {/* Animated Branded Logo Container */}
        <div className="relative h-16 w-16 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xl flex items-center justify-center animate-bounce">
          <Image
            src="/logo.png"
            alt="RentNest Logo"
            width={48}
            height={48}
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Loading Spinner */}
        <div className="h-6 w-6 border-3 border-[#CFA190]/30 border-t-[#CFA190] rounded-full animate-spin mt-2" />

        {/* Text Copy */}
        <div className="space-y-1">
          <h3 className="text-base font-black uppercase tracking-wider text-[#222222] dark:text-white">
            RENT<span className="text-[#CFA190]">NEST</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold animate-pulse">
            Loading marketplace content...
          </p>
        </div>

      </div>
    </div>
  );
}

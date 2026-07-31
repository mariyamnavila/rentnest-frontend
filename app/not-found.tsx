import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-6 bg-background text-foreground font-sans">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] p-8 sm:p-10 rounded-3xl shadow-xl">
        
        {/* Big 404 Number Badge */}
        <div className="relative">
          <span className="text-7xl sm:text-8xl font-black text-[#CFA190]/20 tracking-widest block select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-3.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Heading & Copy */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            LOST YOUR WAY?
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
            The page you are looking for doesn’t exist or may have been moved. Let’s get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs gap-2 py-5 cursor-pointer shadow-md">
              <Home className="size-4" />
              <span>Return Home</span>
            </Button>
          </Link>

          <Link href="/properties">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-[#CFA190] text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-xl text-xs gap-2 py-5"
            >
              <Search className="size-4" />
              <span>Browse Rentals</span>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

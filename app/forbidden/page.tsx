import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldOff, Home, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Access Denied - RentNest',
};

export default function ForbiddenPage() {
  return (
    <div className="flex-1 min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-6 bg-background text-foreground font-sans">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] p-8 sm:p-10 rounded-3xl shadow-xl">

        {/* Big 403 Number Badge */}
        <div className="relative">
          <span className="text-7xl sm:text-8xl font-black text-[#CFA190]/20 tracking-widest block select-none">
            403
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-3.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
              Access Denied
            </span>
          </div>
        </div>

        {/* Icon */}
        <div className="h-16 w-16 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-rose-500 mx-auto flex items-center justify-center shadow-xs">
          <ShieldOff className="size-8 text-[#CFA190]" />
        </div>

        {/* Heading & Copy */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            ACCESS DENIED
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
            You do not have permission to access this page. If you believe this is a mistake, please contact support.
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
              className="w-full sm:w-auto border-[#CFA190] text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-xl text-xs gap-2 py-5 cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              <span>Browse Properties</span>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

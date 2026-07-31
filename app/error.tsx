'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Unhandled System Error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 bg-background text-foreground font-sans">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] p-8 rounded-3xl shadow-xl">
        
        {/* Error Icon */}
        <div className="h-16 w-16 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-rose-500 mx-auto flex items-center justify-center shadow-xs">
          <AlertTriangle className="size-8 text-[#CFA190]" />
        </div>

        {/* Text Copy */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] text-[#CFA190] text-[10px] font-extrabold tracking-wider uppercase border border-[#CFA190]/20">
            System Error Fallback
          </span>
          <h1 className="text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            SOMETHING WENT WRONG
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
            An unexpected error occurred while processing your request. Please try again or return to the home page.
          </p>
        </div>

        {/* Diagnostic Digest if available */}
        {error.digest && (
          <div className="p-2.5 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-[10px] text-gray-400 font-mono truncate">
            Error Digest: {error.digest}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            onClick={() => reset()}
            className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs gap-2 py-5 cursor-pointer shadow-md"
          >
            <RefreshCw className="size-4" />
            <span>Try Again</span>
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-[#e4e4e4] dark:border-[#2e3440] font-bold rounded-xl text-xs gap-2 py-5"
            >
              <Home className="size-4 text-[#CFA190]" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

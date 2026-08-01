import Link from 'next/link';
import { XCircle, ArrowLeft, Home } from 'lucide-react';

export const metadata = {
  title: 'Payment Cancelled - RentNest',
};

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-amber-100 dark:bg-amber-950/40 text-amber-500 mx-auto">
          <XCircle className="size-10" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            Payment Cancelled
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs mx-auto">
            Your payment was not completed. No charges were made. You can try again anytime.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/tenant-dashboard/requests"
            className="inline-flex items-center gap-2 bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl px-6 py-3 text-sm cursor-pointer transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Requests</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] text-gray-600 dark:text-slate-300 font-bold rounded-xl px-6 py-3 text-sm hover:border-[#CFA190]/50 transition-colors"
          >
            <Home className="size-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

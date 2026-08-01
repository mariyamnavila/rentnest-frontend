import Link from 'next/link';
import { CheckCircle, Home, ClipboardList } from 'lucide-react';

export const metadata = {
  title: 'Payment Successful - RentNest',
};

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 mx-auto">
          <CheckCircle className="size-10" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            Payment Successful
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs mx-auto">
            Your payment has been processed successfully. Your rental is now active!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/tenant-dashboard/requests"
            className="inline-flex items-center gap-2 bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl px-6 py-3 text-sm cursor-pointer transition-colors gap-2"
          >
            <ClipboardList className="size-4" />
            <span>View My Requests</span>
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

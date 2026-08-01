import { getMyPayments } from '../../_actions/tenant/paymentHistoryActions';
import { StatusBadge } from '../../_components/shared/StatusBadge';
import { CreditCard, DollarSign, Calendar, ArrowUpRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Payment History - RentNest',
};

export default async function PaymentHistoryPage() {
  const result = await getMyPayments();
  const payments = result.data;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            <CreditCard className="size-3.5" />
            <span>Transactions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            PAYMENT <span className="text-[#CFA190]">HISTORY</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            View all your past transactions and receipts.
          </p>
        </div>
      </div>

      {/* Content */}
      {payments.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Method</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Request</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="min-w-0">
                          <p className="font-extrabold text-[#222222] dark:text-white truncate text-sm">
                            {payment.rentalRequest?.property?.title || 'Unknown Property'}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate">
                            {payment.rentalRequest?.property?.location}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-black text-sm text-[#CFA190]">
                          ${payment.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f7f7f7] dark:bg-[#232733] text-[11px] font-bold text-gray-600 dark:text-slate-300">
                          <CreditCard className="size-3" />
                          {payment.method}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="flex items-center gap-1 text-[11px] text-gray-500">
                          <Calendar className="size-3 text-[#CFA190]" />
                          {payment.paidAt
                            ? new Date(payment.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : new Date(payment.createdAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/tenant-dashboard/requests/${payment.rentalRequestId}`}>
                          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] rounded-xl px-2.5 py-1.5 cursor-pointer">
                            <ArrowUpRight className="size-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-xs font-black text-[#222222] dark:text-white truncate">
                      {payment.rentalRequest?.property?.title || 'Unknown Property'}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {payment.rentalRequest?.property?.location}
                    </p>
                  </div>
                  <StatusBadge status={payment.status} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 font-bold text-[#CFA190]">
                      <DollarSign className="size-3" />
                      ${payment.amount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 text-[#CFA190]" />
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : new Date(payment.createdAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <Link href={`/tenant-dashboard/requests/${payment.rentalRequestId}`}>
                    <Button size="sm" variant="ghost" className="text-xs p-1.5 h-7">
                      <ArrowUpRight className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm">
          <div className="space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center">
              <CreditCard className="size-7" />
            </div>
            <div>
              <p className="text-sm font-black text-[#222222] dark:text-white">No Payments Yet</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Your payment history will appear here after you complete a transaction.
              </p>
            </div>
            <Link href="/properties" className="inline-block pt-1">
              <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs px-6 py-4 cursor-pointer gap-2">
                <Search className="size-4" />
                <span>Browse Properties</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

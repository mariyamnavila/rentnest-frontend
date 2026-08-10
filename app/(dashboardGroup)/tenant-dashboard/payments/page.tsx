import { getMyPayments } from '../../_actions/tenant/paymentHistoryActions';
import { TenantPaymentsTable } from '../../_components/tenant/TenantPaymentsTable';
import { CreditCard } from 'lucide-react';

export const metadata = {
  title: 'Payment History - RentNest',
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    status?: string;
    sortBy?: string;
  }>;
};

export default async function PaymentHistoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;
  const status = params.status || 'ALL';
  const sortBy = params.sortBy || 'newest';

  const result = await getMyPayments(search, page, 5, status, sortBy);
  const payments = result.data || [];
  const meta = result.meta;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase mb-3">
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

      {/* Table & Filtering */}
      <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm p-6">
        <TenantPaymentsTable payments={payments} meta={meta} />
      </div>
    </div>
  );
}

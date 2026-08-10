import { getAdminPayments } from '../../_actions/admin/adminActions';
import { AdminPaymentsTable } from '../../_components/admin/AdminPaymentsTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Payments - Admin Dashboard',
  description: 'View all payment transactions on the platform',
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    status?: string;
    sortBy?: string;
  }>;
};

export default async function AdminPaymentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;
  const status = params.status || 'ALL';
  const sortBy = params.sortBy || 'newest';

  const result = await getAdminPayments(search, page, 8, status, sortBy);
  const payments = result.data || [];
  const meta = result.meta;

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            Payment <span className="text-[#CFA190]">Transactions</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {meta?.total || payments.length} total transactions on record
          </p>
        </div>
      </div>

      {/* Payments Table Card */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs pb-1">
        <CardHeader className="p-6 py-0">
          <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
            All Transactions
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            Every payment transaction recorded on the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-1 pb-4">
          <AdminPaymentsTable payments={payments} meta={meta} />
        </CardContent>
      </Card>

    </div>
  );
}

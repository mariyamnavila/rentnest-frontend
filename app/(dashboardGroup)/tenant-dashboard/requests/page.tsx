import Link from 'next/link';
import { getMyRentals } from '../../_actions/tenant/dashboardActions';
import { TenantRequestsTable } from '../../_components/tenant/TenantRequestsTable';
import { Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'My Requests - RentNest',
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    status?: string;
    sortBy?: string;
  }>;
};

export default async function MyRequestsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;
  const status = params.status || 'ALL';
  const sortBy = params.sortBy || 'newest';

  const result = await getMyRentals(search, page, 5, status, sortBy);
  const rentals = result.data || [];
  const meta = result.meta;

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            <FileText className="size-3.5" />
            <span>Applications History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] pt-2 dark:text-white uppercase tracking-tight">
            MY RENTAL <span className="text-[#CFA190]">APPLICATIONS</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Track and manage all your lease requests, approval statuses, and payments.
          </p>
        </div>

        <Link href="/properties">
          <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl px-5 py-5 text-xs sm:text-sm gap-2 cursor-pointer shadow-md transition-transform hover:-translate-y-0.5 shrink-0">
            <Plus className="size-4" />
            <span>New Application</span>
          </Button>
        </Link>
      </div>

      {/* Main Content Card */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm overflow-hidden">
        <CardHeader className="p-6 pb-4">
          <div>
            <CardTitle className="text-lg font-black uppercase tracking-wide text-[#222222] dark:text-white">
              All Submitted Requests
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
              Total {meta?.total || rentals.length} {meta?.total === 1 ? 'application' : 'applications'} on record
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-2">
          <TenantRequestsTable rentals={rentals} meta={meta} />
        </CardContent>
      </Card>

    </div>
  );
}

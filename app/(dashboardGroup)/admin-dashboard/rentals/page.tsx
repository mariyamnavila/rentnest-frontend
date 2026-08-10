import { getAdminRentals } from '../../_actions/admin/adminActions';
import { AdminRentalsTable } from '../../_components/admin/AdminRentalsTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Rentals - Admin Dashboard',
  description: 'View all rental requests on the platform',
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    status?: string;
    sortBy?: string;
  }>;
};

export default async function AdminRentalsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;
  const status = params.status || 'ALL';
  const sortBy = params.sortBy || 'newest';

  const result = await getAdminRentals(search, page, 8, status, sortBy);
  const rentals = result.data || [];
  const meta = result.meta;

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            Rental <span className="text-[#CFA190]">Requests</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {meta?.total || rentals.length} total requests on record
          </p>
        </div>
      </div>

      {/* Rentals Table Card */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs pb-1">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
            All Rental Requests
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            Every rental request submitted on the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-4">
          <AdminRentalsTable rentals={rentals} meta={meta} />
        </CardContent>
      </Card>

    </div>
  );
}

import { getLandlordRequests } from '../../_actions/landlord/requestActions';
import { LandlordRequestsTable } from '../../_components/landlord/LandlordRequestsTable';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Tenant Requests - RentNest',
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    status?: string;
    sortBy?: string;
  }>;
};

export default async function LandlordRequestsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;
  const status = params.status || 'ALL';
  const sortBy = params.sortBy || 'newest';

  const result = await getLandlordRequests(search, page, 5, status, sortBy);
  const requests = result.data || [];
  const meta = result.meta;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase mb-3">
            <FileText className="size-3.5" />
            <span>Inbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            TENANT <span className="text-[#CFA190]">REQUESTS</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Review and manage incoming rental applications.
          </p>
        </div>
      </div>

      {/* Content wrapper with shadow card styling */}
      <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm p-6">
        <LandlordRequestsTable requests={requests} meta={meta} />
      </div>
    </div>
  );
}

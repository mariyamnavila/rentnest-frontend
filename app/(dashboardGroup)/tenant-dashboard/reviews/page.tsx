import { getMyReviews } from '../../_actions/tenant/reviewActions';
import { TenantReviewsTable } from '../../_components/tenant/TenantReviewsTable';
import { Star } from 'lucide-react';

export const metadata = {
  title: 'My Reviews - RentNest',
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    rating?: string;
    sortBy?: string;
  }>;
};

export default async function MyReviewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;
  const rating = params.rating ? Number(params.rating) : undefined;
  const sortBy = params.sortBy || 'newest';

  const result = await getMyReviews(search, page, 5, rating, sortBy);
  const reviews = result.data || [];
  const meta = result.meta;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase mb-3">
            <Star className="size-3.5" />
            <span>Reviews</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            MY <span className="text-[#CFA190]">REVIEWS</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            {meta?.total && meta.total > 0
              ? `You have submitted ${meta.total} review${meta.total > 1 ? 's' : ''}.`
              : 'Share your experiences with properties you have rented.'}
          </p>
        </div>
      </div>

      {/* Content wrapper with shadow card styling */}
      <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm p-6">
        <TenantReviewsTable reviews={reviews} meta={meta} />
      </div>
    </div>
  );
}

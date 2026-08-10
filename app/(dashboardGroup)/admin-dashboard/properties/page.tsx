import { getAdminProperties, getCategories } from '../../_actions/admin/adminActions';
import { AdminPropertiesTable } from '../../_components/admin/AdminPropertiesTable';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'All Listings - Admin Dashboard',
  description: 'View and moderate all property listings',
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    categoryId?: string;
    isAvailable?: string;
    sortBy?: string;
  }>;
};

export default async function AdminPropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;
  const categoryId = params.categoryId || 'ALL';
  const isAvailable = params.isAvailable || 'ALL';
  const sortBy = params.sortBy || 'newest';

  const [propertiesResult, categoriesResult] = await Promise.all([
    getAdminProperties(search, page, 8, categoryId, isAvailable, sortBy),
    getCategories(),
  ]);

  const properties = propertiesResult.data || [];
  const meta = propertiesResult.meta;
  const categories = categoriesResult.data || [];

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            All <span className="text-[#CFA190]">Listings</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {meta?.total || properties.length} total listings on record
          </p>
        </div>
      </div>

      {/* Properties Table Card */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs pb-1">
        <CardHeader className="p-6 py-0">
          <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
            Property Listings
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            All properties listed on the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-1 pb-4">
          <AdminPropertiesTable properties={properties} meta={meta} categories={categories} />
        </CardContent>
      </Card>

    </div>
  );
}

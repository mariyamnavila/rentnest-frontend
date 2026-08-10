import { getLandlordProperties } from '../../_actions/landlord/dashboardActions';
import { getCategories } from '../../_actions/admin/adminActions';
import { LandlordPropertiesTable } from '../../_components/landlord/LandlordPropertiesTable';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Building2, Plus } from 'lucide-react';

export const metadata = {
  title: 'My Properties - RentNest',
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

export default async function LandlordPropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;
  const categoryId = params.categoryId || 'ALL';
  const isAvailable = params.isAvailable || 'ALL';
  const sortBy = params.sortBy || 'newest';

  const [propertiesResult, categoriesResult] = await Promise.all([
    getLandlordProperties(search, page, 5, categoryId, isAvailable, sortBy),
    getCategories(),
  ]);

  const properties = propertiesResult.data || [];
  const meta = propertiesResult.meta;
  const categories = categoriesResult.data || [];

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase mb-3">
            <Building2 className="size-3.5" />
            <span>Listings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            MY <span className="text-[#CFA190]">PROPERTIES</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Manage your listings, update availability, and track performance.
          </p>
        </div>

        <Link href="/landlord-dashboard/properties/new">
          <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl px-5 py-5 text-xs sm:text-sm gap-2 cursor-pointer shadow-md transition-transform hover:-translate-y-0.5 shrink-0">
            <Plus className="size-4" />
            <span>Add Property</span>
          </Button>
        </Link>
      </div>

      {/* Content wrapper with shadow card styling */}
      <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm p-6">
        <LandlordPropertiesTable properties={properties} meta={meta} categories={categories} />
      </div>
    </div>
  );
}

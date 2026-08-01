import { Suspense } from 'react';
import { PropertiesSkeleton } from '../_components/properties/PropertiesSkeleton';
import { PropertiesContent } from '../_components/properties/PropertiesContent';
import { getCategories, getProperties, PropertyQuery } from '../_actions/properties/propertyActions';

export const metadata = {
  title: 'Browse Properties - RentNest',
  description: 'Find your next rental property from our curated listings.',
};

type PropertiesPageProps = {
  searchParams: Promise<PropertyQuery>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const query = await searchParams;

  const [propertiesResult, categoriesResult] = await Promise.all([
    getProperties({
      page: query.page || '1',
      limit: query.limit || '12',
      searchTerm: query.searchTerm,
      location: query.location,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      categoryId: query.categoryId,
      sortBy: query.sortBy || 'createdAt',
      sortOrder: query.sortOrder || 'desc',
    }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#14171d] font-sans">
      {/* Page Header */}
      <div className="bg-white dark:bg-[#1a1d24] border-b border-[#e4e4e4] dark:border-[#2e3440]">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
              Available Listings
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
              BROWSE <span className="text-[#CFA190]">PROPERTIES</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Discover the perfect rental property that suits your lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<PropertiesSkeleton />}>
          <PropertiesContent
            initialProperties={propertiesResult.data}
            initialMeta={propertiesResult.meta}
            categories={categoriesResult.data}
            initialQuery={query}
          />
        </Suspense>
      </div>
    </div>
  );
}

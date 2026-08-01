import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getPropertyById } from '../../_actions/properties/propertyActions';
import { PropertyDetailSkeleton } from '../../_components/properties/PropertyDetailSkeleton';
import { PropertyDetail } from '../../_components/properties/PropertyDetail';

type PropertyDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const result = await getPropertyById(id);

  if (!result.success || !result.data) {
    return { title: 'Property Not Found - RentNest' };
  }

  return {
    title: `${result.data.title} - RentNest`,
    description: result.data.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const result = await getPropertyById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#14171d] font-sans">
      <Suspense fallback={<PropertyDetailSkeleton />}>
        <PropertyDetail property={result.data} />
      </Suspense>
    </div>
  );
}

import { notFound } from 'next/navigation';
import { getPropertyById } from '../../../../(public)/_actions/properties/propertyActions';
import { RentalRequestForm } from '../../../_components/tenant/RentalRequestForm';
import { RentalRequestSkeleton } from '../../../_components/tenant/RentalRequestSkeleton';
import { Suspense } from 'react';

type NewRequestPageProps = {
  searchParams: Promise<{ propertyId?: string }>;
};

export async function generateMetadata({ searchParams }: NewRequestPageProps) {
  const { propertyId } = await searchParams;
  if (!propertyId) return { title: 'New Rental Request - RentNest' };

  const result = await getPropertyById(propertyId);
  if (!result.success || !result.data) return { title: 'Property Not Found - RentNest' };

  return {
    title: `Rent ${result.data.title} - RentNest`,
  };
}

export default async function NewRequestPage({ searchParams }: NewRequestPageProps) {
  const { propertyId } = await searchParams;

  if (!propertyId) {
    notFound();
  }

  const result = await getPropertyById(propertyId);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <Suspense fallback={<RentalRequestSkeleton />}>
      <RentalRequestForm property={result.data} />
    </Suspense>
  );
}

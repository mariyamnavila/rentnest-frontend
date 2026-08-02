import { getLandlordProperty } from '@/app/(dashboardGroup)/_actions/landlord/propertyActions';
import { EditPropertyForm } from '@/app/(dashboardGroup)/_components/landlord/EditPropertyForm';
import { getCategories } from '@/app/(public)/_actions/properties/propertyActions';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = {
  title: 'Edit Property - Landlord Dashboard',
};

export default async function EditPropertyPage({ params }: PageProps) {
  const { id } = await params;

  const [propertyResult, categoriesResult] = await Promise.all([
    getLandlordProperty(id),
    getCategories(),
  ]);

  if (!propertyResult.success || !propertyResult.data) {
    notFound();
  }

  const property = propertyResult.data as {
    title: string;
    description: string;
    location: string;
    price: number;
    categoryId: string;
    amenities: string[];
    images: string[];
  };

  const categories = categoriesResult.data || [];

  return (
    <div className="font-sans">
      <EditPropertyForm
        propertyId={id}
        property={property}
        categories={categories}
      />
    </div>
  );
}

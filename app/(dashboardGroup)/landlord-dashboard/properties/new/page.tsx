import { PropertyForm } from "@/app/(dashboardGroup)/_components/landlord/PropertyForm";
import { getCategories } from "@/app/(public)/_actions/properties/propertyActions";

export const metadata = {
  title: 'Add Property - RentNest',
};

export default async function NewPropertyPage() {
  const result = await getCategories();
  const categories = result.data || [];

  return <PropertyForm categories={categories} />;
}

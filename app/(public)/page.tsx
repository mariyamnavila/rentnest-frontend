import { getProperties } from './_actions/properties/propertyActions';
import { FAQSection } from './_components/FAQSection';
import { FeaturedPropertiesSection } from './_components/FeaturedPropertiesSection';
import { HeroSection } from './_components/HeroSection';
import { HowItWorksSection } from './_components/HowItWorksSection';
import { RoleOverviewSection } from './_components/RoleOverviewSection';

export default async function HomePage() {
  const result = await getProperties({ page: '1', limit: '3', sortBy: 'createdAt', sortOrder: 'desc' });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Animated Hero Section */}
      <HeroSection />

      {/* Professional Multi-Role Overview Section */}
      <RoleOverviewSection />
      <FeaturedPropertiesSection properties={result.data} />
      <HowItWorksSection />
      <FAQSection />
    </div>
  );
}

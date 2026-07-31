import { FAQSection } from './_components/FAQSection';
import { FeaturedPropertiesSection } from './_components/FeaturedPropertiesSection';
import { HeroSection } from './_components/HeroSection';
import { HowItWorksSection } from './_components/HowItWorksSection';
import { RoleOverviewSection } from './_components/RoleOverviewSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Animated Hero Section */}
      <HeroSection />

      {/* Professional Multi-Role Overview Section */}
      <RoleOverviewSection />
      <FeaturedPropertiesSection/>
      <HowItWorksSection/>
      <FAQSection/>
    </div>
  );
}

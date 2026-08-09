import { getProperties } from './_actions/properties/propertyActions';
import { HeroSection } from './_components/HeroSection';
import { RoleOverviewSection } from './_components/RoleOverviewSection';
import { CategoryHighlightsSection } from './_components/CategoryHighlightsSection';
import { FeaturedPropertiesSection } from './_components/FeaturedPropertiesSection';
import { HowItWorksSection } from './_components/HowItWorksSection';
import { StatsImpactSection } from './_components/StatsImpactSection';
import { TestimonialsSection } from './_components/TestimonialsSection';
import { FAQSection } from './_components/FAQSection';
import { NewsletterCTASection } from './_components/NewsletterCTASection';

export default async function HomePage() {
  const result = await getProperties({ page: '1', limit: '3', sortBy: 'createdAt', sortOrder: 'desc' });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Animated Hero Banner */}
      <HeroSection />

      {/* Section 2: Role Overview (Tenants, Landlords, Admins) */}
      <RoleOverviewSection />

      {/* Section 3: Popular Category Highlights */}
      <CategoryHighlightsSection />

      {/* Section 4: Featured Property Listings */}
      <FeaturedPropertiesSection properties={result.data} />

      {/* Section 5: How RentNest Works */}
      <HowItWorksSection />

      {/* Section 6: Live Platform Impact & Statistics Counter */}
      <StatsImpactSection />

      {/* Section 7: Verified Testimonials */}
      <TestimonialsSection />

      {/* Section 8: Frequently Asked Questions (FAQ) */}
      <FAQSection />

      {/* Section 9: Newsletter Subscription & Dual CTA Banner */}
      <NewsletterCTASection />
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { IProperty } from '@/lib/types';
import { PropertyCard } from './properties/PropertyCard';

type FeaturedPropertiesSectionProps = {
  properties: IProperty[];
};

export function FeaturedPropertiesSection({ properties }: FeaturedPropertiesSectionProps) {
  if (!properties || properties.length === 0) return null;

  return (
    <section className="py-16 bg-white dark:bg-[#1a1d24] font-sans">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
              Featured Listings
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
              EXPLORE TOP-RATED <span className="text-[#CFA190]">RENTALS</span>
            </h2>
          </div>

          <Link href="/properties">
            <Button variant="outline" className="border-[#CFA190] text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-xl text-xs gap-2">
              <span>View All Properties</span>
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>

        {/* Responsive Property Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, ArrowRight, Star } from 'lucide-react';

const featuredProperties = [
  {
    id: '1',
    title: 'Modern Sunset Apartment',
    location: 'Downtown, Financial District',
    price: 1850,
    beds: 2,
    baths: 2,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    type: 'Apartment',
  },
  {
    id: '2',
    title: 'Luxury Beachfront Studio',
    location: 'Coastal Avenue, Bay Area',
    price: 2400,
    beds: 1,
    baths: 1,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    type: 'Studio',
  },
  {
    id: '3',
    title: 'Cozy Family Suburban Home',
    location: 'Green Valley, Westside',
    price: 3100,
    beds: 3,
    baths: 2.5,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    type: 'House',
  },
];

export function FeaturedPropertiesSection() {
  return (
    <section className="py-16 bg-white dark:bg-[#1a1d24] font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        
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

        {/* Responsive Property Cards Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="group rounded-2xl overflow-hidden border border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  unoptimized
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-black/70 text-white backdrop-blur-xs font-bold text-[10px] uppercase">
                  {property.type}
                </Badge>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white dark:bg-[#1a1d24] text-[#222222] dark:text-white px-2 py-1 rounded-lg text-xs font-bold shadow-xs">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span>{property.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400 mb-1">
                    <MapPin className="size-3.5 text-[#CFA190] shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-[#222222] dark:text-white line-clamp-1">
                    {property.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700/80">
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-slate-300 font-semibold">
                      <span className="flex items-center gap-1"><Bed className="size-4 text-[#CFA190]" /> {property.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath className="size-4 text-[#CFA190]" /> {property.baths} Baths</span>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-[#CFA190]">${property.price}</span>
                      <span className="text-[10px] text-gray-400 block font-normal">/ month</span>
                    </div>
                  </div>

                  <Link href={`/properties/${property.id}`} className="block">
                    <Button className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs py-4 cursor-pointer">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
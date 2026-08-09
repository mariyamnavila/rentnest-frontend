'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowRight } from 'lucide-react';
import type { IProperty } from '@/lib/types';

type PropertyCardProps = {
  property: IProperty;
};

export function PropertyCard({ property }: PropertyCardProps) {
  const displayImage =
    property.images?.[0] ||
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className="group rounded-2xl overflow-hidden border border-[#e4e4e4] dark:border-[#2e3440] bg-white dark:bg-[#232733] transition-all hover:shadow-xl flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          unoptimized
          src={displayImage}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {property.category?.name && (
          <Badge className="absolute top-3 left-3 bg-black/70 text-white backdrop-blur-xs font-bold text-[10px] uppercase">
            {property.category.name}
          </Badge>
        )}
        {/* {property.avgRating != null && property.avgRating > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white dark:bg-[#1a1d24] text-[#222222] dark:text-white px-2 py-1 rounded-lg text-xs font-bold shadow-xs">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span>{property.avgRating.toFixed(1)}</span>
          </div>
        )} */}
        {!property.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge className="bg-rose-500 text-white font-bold text-xs px-3 py-1">
              Not Available
            </Badge>
          </div>
        )}
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
          {property.landlord?.name && (
            <p className="text-[11px] text-gray-400 mt-1">
              by {property.landlord.name}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700/80">
            {property.amenities?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {property.amenities.slice(0, 2).map((amenity) => (
                  <Badge
                    key={amenity}
                    variant="secondary"
                    className="text-[10px] font-semibold bg-[#f7f7f7] dark:bg-[#1a1d24] text-gray-600 dark:text-slate-300 border border-[#e4e4e4] dark:border-[#2e3440]"
                  >
                    {amenity}
                  </Badge>
                ))}
                {property.amenities.length > 2 && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-semibold bg-[#f7f7f7] dark:bg-[#1a1d24] text-gray-600 dark:text-slate-300 border border-[#e4e4e4] dark:border-[#2e3440]"
                  >
                    +{property.amenities.length - 2}
                  </Badge>
                )}
              </div>
            )}
            <div className="text-right ml-auto">
              <span className="text-base font-black text-[#CFA190]">
                ${property.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-400 block font-normal">
                / month
              </span>
            </div>
          </div>

          <Link href={`/properties/${property.id}`} className="block">
            <Button className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs py-4 cursor-pointer gap-2">
              View Details
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

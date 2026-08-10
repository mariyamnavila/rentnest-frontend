'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Star,
  ArrowLeft,
  CheckCircle,
  Mail,
  Phone,
  Send,
  Building2,
  Sparkles,
  UserCheck,
  Check,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import type { IProperty } from '@/lib/types';

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type PropertyDetailProps = {
  property: IProperty;
};

export function PropertyDetail({ property }: PropertyDetailProps) {
  const { role } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);

  const images =
    property.images?.length > 0
      ? property.images
      : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'];

  const reviews = property.reviews || [];

  // Compute average rating dynamically from reviews array
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 max-w-7xl py-8 font-sans"
    >

      {/* Top Navigation Strip */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-gray-500 dark:text-slate-400 hover:text-[#CFA190] transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Properties</span>
        </Link>
      </div>

      {/* Header Info Banner */}
      <div className="space-y-3 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-[#fff5f5] dark:bg-[#232733] text-[#CFA190] border border-[#CFA190]/30 font-extrabold text-xs uppercase px-3 py-1">
            {property.propertyType || property.category?.name || 'Rental Unit'}
          </Badge>

          {property.isAvailable ? (
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-extrabold text-xs uppercase px-3 py-1">
              Available Now
            </Badge>
          ) : (
            <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-extrabold text-xs uppercase px-3 py-1">
              Rented Out
            </Badge>
          )}

          {avgRating > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 rounded-full text-xs font-bold ml-auto sm:ml-0">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span>{avgRating.toFixed(1)}</span>
              <span className="text-gray-400 text-[10px]">({reviews.length} reviews)</span>
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#222222] dark:text-white uppercase tracking-tight leading-tight">
          {property.title}
        </h1>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-slate-400">
          <MapPin className="size-4 text-[#CFA190] shrink-0" />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Modern Photo Gallery Showcase */}
      <div className="space-y-3 mb-10">
        {/* Main Display Image */}
        <div className="relative aspect-video md:aspect-21/9 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-[#2a2e39] bg-gray-200 dark:bg-[#2e3440] group">
          <Image
            unoptimized
            src={images[selectedImage]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

          <div className="absolute bottom-4 left-4 z-10">
            <span className="px-3.5 py-1.5 rounded-xl bg-black/70 text-white backdrop-blur-md text-xs font-bold border border-white/20">
              Photo {selectedImage + 1} of {images.length}
            </span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative shrink-0 w-24 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shadow-sm ${selectedImage === idx
                  ? 'border-[#CFA190] scale-105 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
              >
                <Image
                  unoptimized
                  src={img}
                  alt={`${property.title} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">

          {/* Specs Bar Showing Real Data Only */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-3xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm text-center">
            <div className="p-3.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
              <Building2 className="size-5 text-[#CFA190] mx-auto mb-1" />
              <span className="text-[10px] font-extrabold text-gray-400 block uppercase">Property Type</span>
              <span className="text-xs font-black text-[#222222] dark:text-white capitalize">{property.propertyType || property.category?.name || 'Rental Unit'}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
              <MapPin className="size-5 text-[#CFA190] mx-auto mb-1" />
              <span className="text-[10px] font-extrabold text-gray-400 block uppercase">Location</span>
              <span className="text-xs font-black text-[#222222] dark:text-white truncate block">{property.location}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] col-span-2 sm:col-span-1">
              <Check className="size-5 text-[#CFA190] mx-auto mb-1" />
              <span className="text-[10px] font-extrabold text-gray-400 block uppercase">Amenities</span>
              <span className="text-xs font-black text-[#222222] dark:text-white">{property.amenities?.length || 0} Features</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-4">
              <Sparkles className="size-4 text-[#CFA190]" />
              <h2 className="text-base font-black uppercase tracking-wider text-[#222222] dark:text-white">
                About This Property
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Real Amenities Grid */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-4">
                <CheckCircle className="size-4 text-[#CFA190]" />
                <h2 className="text-base font-black uppercase tracking-wider text-[#222222] dark:text-white">
                  Included Amenities
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="p-3 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/20 flex items-center gap-2.5"
                  >
                    <CheckCircle className="size-4 text-[#CFA190] shrink-0" />
                    <span className="text-xs font-bold text-[#222222] dark:text-slate-200 capitalize truncate">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real Landlord Info Card */}
          {property.landlord && (
            <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="size-4 text-[#CFA190]" />
                  <h2 className="text-base font-black uppercase tracking-wider text-[#222222] dark:text-white">
                    Property Listed By
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[#CFA190] text-white flex items-center justify-center text-xl font-black shrink-0 shadow-md">
                  {property.landlord.name?.[0]?.toUpperCase() || 'L'}
                </div>
                <div className="min-w-0 space-y-1">
                  <h3 className="text-base font-extrabold text-[#222222] dark:text-white truncate">
                    {property.landlord.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail className="size-3.5 text-[#CFA190]" /> {property.landlord.email}
                    </span>
                    {property.landlord.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="size-3.5 text-[#CFA190]" /> {property.landlord.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SWIPER JS REVIEWS CAROUSEL SECTION */}
          <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-[#CFA190]" />
                <h2 className="text-base font-black uppercase tracking-wider text-[#222222] dark:text-white">
                  Tenant Reviews
                </h2>
              </div>

              {avgRating > 0 && (
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-900/40">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-black text-[#222222] dark:text-white">
                    {avgRating.toFixed(1)}
                  </span>
                  <span className="text-gray-400 text-[10px]">({reviews.length} reviews)</span>
                </div>
              )}
            </div>

            {reviews.length > 0 ? (
              <div className="relative">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: Math.min(2, reviews.length),
                    },
                  }}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  className="w-full pb-10 rounded-2xl cursor-grab active:cursor-grabbing"
                >
                  {reviews.map((review) => (
                    <SwiperSlide key={review.id} className="h-auto">
                      <div className="p-6 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] space-y-4 h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-2xl bg-[#CFA190] text-white flex items-center justify-center text-sm font-black shrink-0 shadow-sm">
                              {review.tenant?.name?.[0]?.toUpperCase() || 'T'}
                            </div>
                            <div className="min-w-0">
                              <span className="text-sm font-extrabold text-[#222222] dark:text-white block truncate">
                                {review.tenant?.name || 'Verified Tenant'}
                              </span>
                              {review.createdAt && (
                                <span className="text-[10px] text-gray-400 block truncate">
                                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 bg-white dark:bg-[#1a1d24] px-2 py-1 rounded-xl border border-[#e4e4e4] dark:border-[#2e3440] shrink-0">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3 ${i < review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-300 dark:text-gray-600'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed italic line-clamp-4">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className="text-center py-8 space-y-2">
                <Star className="size-8 text-gray-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400">
                  No tenant reviews yet for this listing.
                </p>
                <p className="text-[11px] text-gray-400">
                  Be the first tenant to submit a rental application and review!
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">

            <div className="bg-white dark:bg-[#1a1d24] rounded-3xl border-2 border-[#CFA190]/40 p-6 sm:p-8 shadow-xl space-y-6">

              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-[#CFA190] uppercase tracking-wider block">Monthly Rent</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#222222] dark:text-white">
                    ${property.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-gray-400">/ month</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/20 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-gray-600 dark:text-slate-300">
                  <span>Billing Cycle</span>
                  <span className="font-bold text-[#222222] dark:text-white">Monthly</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-slate-300">
                  <span>Payment Model</span>
                  <span className="font-bold text-[#CFA190]">One-Time Stripe Checkout</span>
                </div>
              </div>

              {property.isAvailable ? (
                role === 'LANDLORD' || role === 'ADMIN' ? (
                  <Button disabled className="w-full rounded-2xl py-6 font-bold text-sm gap-2 cursor-not-allowed opacity-60 text-black">
                    <Send className="size-4" />
                    <span>Request to Rent</span>
                    <span className="text-[10px] ml-1">(Tenant Only)</span>
                  </Button>
                ) : (
                  <Link href={`/tenant-dashboard/requests/new?propertyId=${property.id}`} className="block">
                    <Button className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl py-6 cursor-pointer text-sm gap-2 shadow-lg transition-transform hover:-translate-y-0.5">
                      <Send className="size-4" />
                      <span>Request to Rent</span>
                    </Button>
                  </Link>
                )
              ) : (
                <Button disabled className="w-full rounded-2xl py-6 font-bold text-sm">
                  Currently Unavailable
                </Button>
              )}

              <p className="text-[11px] text-center text-gray-400">
                🔒 You won’t be charged until the landlord approves your lease application.
              </p>

            </div>

          </div>
        </aside>

      </div>
    </motion.div>
  );
}

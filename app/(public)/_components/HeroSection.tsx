'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, Building2, ShieldCheck, PlusCircle, Home } from 'lucide-react';
import Link from 'next/link';
import { AnimatedHeading } from './AnimatedHeading';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    title: 'Modern Luxury Living Room',
    subtitle: 'Spacious interiors crafted for comfort and style',
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    title: 'Beachfront Villa Suite',
    subtitle: 'Panoramic ocean views and premium amenities',
  },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-10 lg:py-16 bg-linear-to-b from-slate-50 via-white to-slate-50 dark:from-[#14171d] dark:via-[#1a1d24] dark:to-[#14171d] overflow-hidden font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Multi-Role Heading & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
              <Building2 className="size-3.5" />
              <span>All-In-One Rental Marketplace</span>
            </div>

            <AnimatedHeading
              as="h1"
              text="FIND, LIST & MANAGE RENTALS WITH EASE"
              highlightText="RENTALS"
              align="responsive"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase font-sans"
            />

            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Whether you are a tenant searching for a dream home, a landlord managing property listings and requests, or an administrator overseeing platform health — RentNest connects everyone effortlessly.
            </p>

            {/* Direct Multi-Role CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/properties">
                <Button className="w-full sm:w-auto bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl px-7 py-6 text-sm sm:text-base gap-2 cursor-pointer shadow-lg transition-transform hover:-translate-y-0.5">
                  <Search className="size-5" />
                  <span>Browse Rentals</span>
                </Button>
              </Link>

              <Link href="/register?role=LANDLORD">
                <Button variant="outline" className="w-full sm:w-auto rounded-xl px-7 py-6 text-sm sm:text-base font-bold border-[#CFA190] text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] gap-2">
                  <PlusCircle className="size-5" />
                  <span>List Your Property</span>
                </Button>
              </Link>
            </div>

            {/* Role Feature Badges */}
            {/* Role Feature Badges */}
            <div className="pt-4 border-t border-gray-200 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center max-w-md mx-auto lg:mx-0">
              <div className="p-2 rounded-xl bg-white dark:bg-[#1a1d24] border border-gray-100 dark:border-slate-800 shadow-xs">
                <Home className="size-4 text-[#CFA190] mx-auto mb-1" />
                <span className="text-[11px] font-extrabold text-[#222222] dark:text-slate-200 block uppercase">Tenants</span>
                <span className="text-[9px] text-gray-500 block">Find & Rent</span>
              </div>

              <div className="p-2 rounded-xl bg-white dark:bg-[#1a1d24] border border-gray-100 dark:border-slate-800 shadow-xs">
                <Building2 className="size-4 text-[#CFA190] mx-auto mb-1" />
                <span className="text-[11px] font-extrabold text-[#222222] dark:text-slate-200 block uppercase">Landlords</span>
                <span className="text-[9px] text-gray-500 block">List & Manage</span>
              </div>

              <div className="p-2 rounded-xl bg-white dark:bg-[#1a1d24] border border-gray-100 dark:border-slate-800 shadow-xs">
                <ShieldCheck className="size-4 text-[#CFA190] mx-auto mb-1" />
                <span className="text-[11px] font-extrabold text-[#222222] dark:text-slate-200 block uppercase">Verified</span>
                <span className="text-[9px] text-gray-500 block">Secure Leases</span>
              </div>
            </div>
          </div>

          {/* Right Column: Square Room Image Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#2a2e39] group">

              {/* Image Slideshow Stack */}
              {heroImages.map((img, index) => {
                const isActive = index === currentImageIndex;
                return (
                  <div
                    key={img.url}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                  >
                    <Image
                      unoptimized
                      src={img.url}
                      alt={img.title}
                      fill
                      priority={index === 0}
                      className={`object-cover transition-transform duration-5000 ease-out ${isActive ? 'scale-110' : 'scale-100'
                        }`}
                    />
                  </div>
                );
              })}

              {/* Single Dark Vignette Overlay */}
              <div className="absolute inset-0 z-15 bg-linear-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />

              {/* Middle Center Text Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center text-white pointer-events-none">
                <div
                  key={currentImageIndex}
                  className="space-y-2 max-w-xs animate-in fade-in zoom-in-95 duration-700"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-[#CFA190]/90 text-white text-[11px] font-extrabold tracking-widest uppercase shadow-md backdrop-blur-xs">
                    Featured Room
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md">
                    {heroImages[currentImageIndex].title}
                  </h3>
                  <p className="text-xs text-slate-200 drop-shadow-sm line-clamp-2">
                    {heroImages[currentImageIndex].subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Indicators */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-2">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentImageIndex
                      ? 'w-6 bg-[#CFA190]'
                      : 'w-2 bg-white/60 hover:bg-white'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
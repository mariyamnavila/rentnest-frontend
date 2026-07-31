'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Building2 } from 'lucide-react';
import Link from 'next/link';

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
    <section className="relative py-10 lg:py-16 bg-linear-to-b from-slate-50 via-white to-slate-50 dark:from-[#14171d] dark:via-[#1a1d24] dark:to-[#14171d] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Search */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
              <Building2 className="size-3.5" />
              <span>Premium Property Rentals</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#222222] dark:text-white tracking-tight leading-tight uppercase font-sans">
              FIND YOUR <span className="text-[#CFA190]">DREAM HOME</span> WITH EASE
            </h1>

            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Discover verified rental properties, luxury apartments, and cozy family homes tailored to your lifestyle. Simple, secure, and hassle-free.
            </p>

            {/* Quick Search Widget */}
            {/* <div className="p-3 bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl max-w-lg mx-auto lg:mx-0 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#232733] border border-gray-200 dark:border-slate-700">
                  <MapPin className="size-4 text-[#CFA190] shrink-0" />
                  <input
                    type="text"
                    placeholder="Location / City..."
                    className="w-full text-xs font-semibold bg-transparent focus:outline-none text-[#222222] dark:text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#232733] border border-gray-200 dark:border-slate-700">
                  <Building2 className="size-4 text-[#CFA190] shrink-0" />
                  <select className="w-full text-xs font-semibold bg-transparent focus:outline-none text-[#222222] dark:text-white">
                    <option value="">All Property Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>
              </div>

              <Link href="/properties">
                <Button className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl gap-2 py-5 cursor-pointer shadow-md">
                  <Search className="size-4" />
                  <span>Search Available Rentals</span>
                </Button>
              </Link>
            </div> */}
          

          {/* Direct CTA Alternate Layout */}

<div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
  <Link href="/properties">
    <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl px-8 py-6 text-base gap-2 cursor-pointer shadow-lg transition-transform hover:-translate-y-0.5">
      <Search className="size-5" />
      <span>Explore Properties</span>
    </Button>
  </Link>
  
  <Link href="/about">
    <Button variant="outline" className="rounded-xl px-8 py-6 text-base font-semibold border-gray-300 dark:border-slate-700">
      Learn More
    </Button>
  </Link>
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
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <Image
                      unoptimized
                      src={img.url}
                      alt={img.title}
                      fill
                      priority={index === 0}
                      className={`object-cover transition-transform duration-5000 ease-out ${
                        isActive ? 'scale-110' : 'scale-100'
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
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentImageIndex
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
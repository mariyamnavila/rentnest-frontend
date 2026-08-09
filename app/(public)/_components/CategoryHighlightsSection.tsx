'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, Home, Building, Hotel, Warehouse } from 'lucide-react';

const categories = [
  {
    id: 'e16d10eb-a2e2-44df-9100-a0ce85231647',
    name: 'Modern Apartments',
    count: '12 Listings',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    icon: Building2,
    desc: 'Urban apartments with premium amenities & prime locations.',
  },
  {
    id: '1a503d52-8557-46f0-8741-db1dc588d478',
    name: 'Family Houses',
    count: '8 Listings',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
    icon: Home,
    desc: 'Spacious multi-bedroom homes with gardens and garages.',
  },
  {
    id: 'fceddd1c-466d-4bcd-bbd1-b55c40fafebb',
    name: 'Studios & Lofts',
    count: '5 Listings',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    icon: Building,
    desc: 'Cozy open-plan studios designed for young professionals.',
  },
  {
    id: 'luxury-villas',
    name: 'Luxury Villas',
    count: '6 Listings',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
    icon: Hotel,
    desc: 'Private gated villas with swimming pools & ocean views.',
  },
  {
    id: 'commercial-spaces',
    name: 'Commercial Offices',
    count: '4 Listings',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    icon: Warehouse,
    desc: 'Turnkey retail & office spaces in central business hubs.',
  },
];

export function CategoryHighlightsSection() {
  return (
    <section className="py-16 bg-white dark:bg-[#1a1d24] border-t border-[#e4e4e4] dark:border-[#2e3440] font-sans">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
              Explore Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
              POPULAR PROPERTY <span className="text-[#CFA190]">CATEGORIES</span>
            </h2>
          </div>

          <Link href="/properties">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-[#CFA190] hover:underline cursor-pointer group">
              <span>View All Categories</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/properties?categoryId=${cat.id}`} className="group block h-full">
                  <div className="relative rounded-3xl overflow-hidden border border-[#e4e4e4] dark:border-[#2e3440] bg-white dark:bg-[#14171d] shadow-xs group-hover:shadow-xl group-hover:border-[#CFA190]/50 transition-all h-full flex flex-col justify-between">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        unoptimized
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#1a1d24]/90 backdrop-blur-xs text-[10px] font-black text-[#222222] dark:text-white uppercase shadow-sm">
                        {cat.count}
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-[#CFA190] text-white flex items-center justify-center shadow-md">
                          <Icon className="size-4" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#222222] dark:text-white uppercase group-hover:text-[#CFA190] transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-snug mt-1">
                          {cat.desc}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center gap-1 text-[11px] font-extrabold text-[#CFA190] group-hover:translate-x-1 transition-transform">
                        <span>Explore Category</span>
                        <ArrowRight className="size-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

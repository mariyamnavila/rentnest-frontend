'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MessageSquareQuote, ShieldCheck, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Emily Davis',
    role: 'Tenant (Rented in Downtown)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=400&q=80',
    property: 'Sunset Luxury Loft',
    rating: 5,
    comment: 'Finding an apartment through RentNest was incredibly fast. The virtual tour photos were 100% accurate, and digital rent payment via Stripe was seamless!',
  },
  {
    name: 'David Miller',
    role: 'Landlord (5 Properties Listed)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=400&q=80',
    property: 'Grand Vista Apartments',
    rating: 5,
    comment: 'As a property owner, managing incoming tenant applications with the Landlord Portal has saved me hours of paperwork every week. Highly recommended!',
  },
  {
    name: 'Sophia Patel',
    role: 'Tenant (Rented Family Villa)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&crop=faces&w=400&q=80',
    property: 'Oakridge Suburb Family House',
    rating: 5,
    comment: 'Clear communication with the landlord and zero hidden fees. Being able to leave verified reviews gives great peace of mind.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white dark:bg-[#1a1d24] border-t border-[#e4e4e4] dark:border-[#2e3440] font-sans">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            Verified Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            WHAT OUR <span className="text-[#CFA190]">COMMUNITY</span> SAYS
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="bg-[#f7f7f7] dark:bg-[#14171d] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl shadow-xs hover:border-[#CFA190]/50 transition-all h-full flex flex-col justify-between">
                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 italic leading-relaxed">
                      &quot;{t.comment}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#e4e4e4] dark:border-[#2e3440] flex items-center gap-3">
                    <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0 border-2 border-[#CFA190]">
                      <Image
                        unoptimized
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs sm:text-sm font-black text-[#222222] dark:text-white uppercase truncate">
                          {t.name}
                        </h3>
                        <ShieldCheck className="size-3.5 text-[#CFA190] shrink-0" />
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 truncate">
                        {t.role}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-[#CFA190] font-semibold truncate mt-0.5">
                        <MapPin className="size-3 shrink-0" />
                        <span className="truncate">{t.property}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

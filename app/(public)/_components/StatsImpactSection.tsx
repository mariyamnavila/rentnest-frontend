'use client';

import { motion } from 'framer-motion';
import { Building2, Users, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { AnimatedHeading } from './AnimatedHeading';

const stats = [
  {
    number: '1,250+',
    label: 'Verified Rentals Listed',
    sub: 'Properties across top metropolitan areas',
    icon: Building2,
  },
  {
    number: '8,900+',
    label: 'Happy Tenants Served',
    sub: 'Successful monthly rentals & leases',
    icon: Users,
  },
  {
    number: '480+',
    label: 'Trusted Landlords',
    sub: 'Verified property managers & owners',
    icon: ShieldCheck,
  },
  {
    number: '4.9 / 5',
    label: 'Average Rating',
    sub: 'Based on 2,400+ verified tenant reviews',
    icon: Star,
  },
];

export function StatsImpactSection() {
  return (
    <section className="py-16 bg-linear-to-br from-[#1a1d24] via-[#14171d] to-[#1a1d24] text-white font-sans overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            Platform Impact
          </span>
          <AnimatedHeading
            text="TRUSTED BY THOUSANDS NATIONWIDE"
            highlightText="NATIONWIDE"
            className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white justify-center"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-[#232733]/80 border border-[#2a2e39] shadow-xl text-center space-y-3 relative group hover:border-[#CFA190]/50 transition-all"
              >
                <div className="h-12 w-12 rounded-2xl bg-[#CFA190]/10 border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Icon className="size-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                    {stat.number}
                  </h3>
                  <p className="text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {stat.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

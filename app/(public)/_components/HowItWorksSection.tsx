'use client';

import { Search, FileText, CheckCircle, Upload, UserCheck, CreditCard } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-[#f7f7f7] dark:bg-[#14171d] border-t border-[#e4e4e4] dark:border-[#2e3440] font-sans">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            THREE STEPS TO YOUR <span className="text-[#CFA190]">NEW LEASE</span>
          </h2>
        </div>

        {/* 3 Step Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-[#1a1d24] p-6 rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm space-y-4 relative">
            <span className="text-4xl font-black text-[#CFA190]/20 absolute top-4 right-5">01</span>
            <div className="h-12 w-12 rounded-xl bg-[#fff5f5] dark:bg-[#232733] text-[#CFA190] flex items-center justify-center font-bold">
              <Search className="size-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#222222] dark:text-white uppercase">1. Search & Filter</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              Explore verified listings by city, monthly price range, property type, and desired move-in dates.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-[#1a1d24] p-6 rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm space-y-4 relative">
            <span className="text-4xl font-black text-[#CFA190]/20 absolute top-4 right-5">02</span>
            <div className="h-12 w-12 rounded-xl bg-[#fff5f5] dark:bg-[#232733] text-[#CFA190] flex items-center justify-center font-bold">
              <FileText className="size-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#222222] dark:text-white uppercase">2. Submit Application</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              Tenants submit rental requests directly to landlords, who review details in their centralized application inbox.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-[#1a1d24] p-6 rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm space-y-4 relative">
            <span className="text-4xl font-black text-[#CFA190]/20 absolute top-4 right-5">03</span>
            <div className="h-12 w-12 rounded-xl bg-[#fff5f5] dark:bg-[#232733] text-[#CFA190] flex items-center justify-center font-bold">
              <CreditCard className="size-6" />
            </div>
            <h3 className="font-extrabold text-base text-[#222222] dark:text-white uppercase">3. Approve & Checkout</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              Once approved by the landlord, tenants complete secure checkout via Stripe to confirm their rental agreement.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
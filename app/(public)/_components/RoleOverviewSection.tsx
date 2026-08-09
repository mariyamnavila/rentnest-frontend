'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { KeyRound, Building2, Search, PlusCircle, ArrowRight, Sparkles, DollarSign, CreditCard, Filter, BadgeCheck, FolderPlus, UserCheck, ToggleRight, TrendingUp } from 'lucide-react';
import { AnimatedHeading } from './AnimatedHeading';

export function RoleOverviewSection() {
  const [activeTab, setActiveTab] = useState<'tenant' | 'landlord'>('tenant');

  return (
    <section className="py-16 bg-[#FBEFE9] dark:bg-[#14171d] border-y border-[#e4e4e4] dark:border-[#2e3440] font-sans">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            Designed For You
          </span>
          <AnimatedHeading
            text="HOW RENTNEST WORKS FOR YOU"
            highlightText="RENTNEST"
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight"
          />
        </div>

        {/* Interactive Tabs Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm gap-2">
            <button
              onClick={() => setActiveTab('tenant')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'tenant'
                  ? 'bg-[#CFA190] text-white shadow-md'
                  : 'text-gray-600 dark:text-slate-300 hover:text-[#CFA190]'
              }`}
            >
              <KeyRound className="size-4" />
              <span>For Tenants</span>
            </button>

            <button
              onClick={() => setActiveTab('landlord')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'landlord'
                  ? 'bg-[#CFA190] text-white shadow-md'
                  : 'text-gray-600 dark:text-slate-300 hover:text-[#CFA190]'
              }`}
            >
              <Building2 className="size-4" />
              <span>For Landlords</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl p-6 sm:p-10 shadow-xl transition-all duration-300">
          {activeTab === 'tenant' ? (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
                  <span>Tenant Experience</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white leading-snug">
                  Discover Your Ideal Home with Transparent Monthly Rates
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  Browse verified rental property listings, submit rental requests, and complete secure one-time payments upon approval.
                </p>
              </div>

              {/* Centered Large Icon Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Feature 1 */}
                <div className="p-5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-center space-y-2.5">
                  <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#1a1d24] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center shadow-xs">
                    <DollarSign className="size-7" />
                  </div>
                  <span className="text-xs font-black text-[#222222] dark:text-white block uppercase tracking-wide">Monthly Rates</span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 block leading-tight">Clear pricing listed per month ($/month)</span>
                </div>

                {/* Feature 2 */}
                <div className="p-5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-center space-y-2.5">
                  <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#1a1d24] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center shadow-xs">
                    <CreditCard className="size-7" />
                  </div>
                  <span className="text-xs font-black text-[#222222] dark:text-white block uppercase tracking-wide">One-Time Checkout</span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 block leading-tight">Pay securely via Stripe once approved</span>
                </div>

                {/* Feature 3 */}
                <div className="p-5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-center space-y-2.5">
                  <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#1a1d24] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center shadow-xs">
                    <Filter className="size-7" />
                  </div>
                  <span className="text-xs font-black text-[#222222] dark:text-white block uppercase tracking-wide">Real-time Search</span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 block leading-tight">Filter by location, price, and amenities</span>
                </div>

                {/* Feature 4 */}
                <div className="p-5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-center space-y-2.5">
                  <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#1a1d24] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center shadow-xs">
                    <BadgeCheck className="size-7" />
                  </div>
                  <span className="text-xs font-black text-[#222222] dark:text-white block uppercase tracking-wide">Verified Reviews</span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 block leading-tight">Leave ratings after rental completion</span>
                </div>

              </div>

              <div className="text-center pt-2">
                <Link href="/properties">
                  <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs sm:text-sm px-8 py-5 gap-2 cursor-pointer shadow-md">
                    <Search className="size-4" />
                    <span>Browse Monthly Rentals</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
                  <span>Landlord Portal</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white leading-snug">
                  List Properties & Manage Rental Applications Effortlessly
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  Post rental units with custom monthly pricing ($/month), review incoming tenant requests, and approve or reject applications with 1 click.
                </p>
              </div>

              {/* Centered Large Icon Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Feature 1 */}
                <div className="p-5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-center space-y-2.5">
                  <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#1a1d24] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center shadow-xs">
                    <FolderPlus className="size-7" />
                  </div>
                  <span className="text-xs font-black text-[#222222] dark:text-white block uppercase tracking-wide">Property CRUD</span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 block leading-tight">Add, edit, or remove property listings</span>
                </div>

                {/* Feature 2 */}
                <div className="p-5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-center space-y-2.5">
                  <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#1a1d24] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center shadow-xs">
                    <UserCheck className="size-7" />
                  </div>
                  <span className="text-xs font-black text-[#222222] dark:text-white block uppercase tracking-wide">Application Inbox</span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 block leading-tight">Approve or reject tenant applications</span>
                </div>

                {/* Feature 3 */}
                <div className="p-5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-center space-y-2.5">
                  <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#1a1d24] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center shadow-xs">
                    <ToggleRight className="size-7" />
                  </div>
                  <span className="text-xs font-black text-[#222222] dark:text-white block uppercase tracking-wide">Availability Toggle</span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 block leading-tight">Set properties as available or rented</span>
                </div>

                {/* Feature 4 */}
                <div className="p-5 rounded-2xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-center space-y-2.5">
                  <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#1a1d24] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center shadow-xs">
                    <TrendingUp className="size-7" />
                  </div>
                  <span className="text-xs font-black text-[#222222] dark:text-white block uppercase tracking-wide">Earnings Overview</span>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400 block leading-tight">Track active leases & rental income</span>
                </div>

              </div>

              <div className="text-center pt-2">
                <Link href="/register">
                  <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs sm:text-sm px-8 py-5 gap-2 cursor-pointer shadow-md">
                    <PlusCircle className="size-4" />
                    <span>Submit Property Listing</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
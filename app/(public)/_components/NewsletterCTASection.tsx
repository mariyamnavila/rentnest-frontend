'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Send, CheckCircle2, Building2, Search } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterCTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
    toast.success('Thank you for subscribing to RentNest property alerts!');
  };

  return (
    <section className="py-16 bg-[#f7f7f7] dark:bg-[#14171d] border-t border-[#e4e4e4] dark:border-[#2e3440] font-sans">
      <div className="container mx-auto px-4 space-y-12">

        {/* Newsletter Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#fff5f5] via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#232733] dark:to-[#1a1d24] border border-[#CFA190]/30 p-8 md:p-12 shadow-lg"
        >
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-[#CFA190]/10 border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center mx-auto mb-2">
              <Mail className="size-6" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#222222] dark:text-white uppercase tracking-tight font-sans">
              GET NEW LISTING <span className="text-[#CFA190]">ALERTS</span> FIRST
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed font-sans">
              Subscribe to receive weekly updates on new property additions, rental market trends, and exclusive landlord offers.
            </p>

            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-in zoom-in-95">
                <CheckCircle2 className="size-5 text-emerald-500" />
                <span>You are subscribed! We will keep you updated with top rental listings.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] bg-white dark:bg-[#14171d] py-5 text-sm"
                />
                <Button type="submit" className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl px-6 py-5 cursor-pointer text-sm gap-2 shrink-0">
                  <Send className="size-4" />
                  <span>Subscribe</span>
                </Button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Dual Role Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Tenant CTA */}
          <div className="p-8 rounded-3xl bg-linear-to-br from-[#1a1d24] to-[#232733] text-white border border-[#2e3440] shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#CFA190] px-2.5 py-1 rounded bg-[#CFA190]/10 border border-[#CFA190]/30 inline-block">
                FOR TENANTS
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                Looking for Your Next Home?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filter verified apartments, studios, and houses. Submit rental applications online and pay rent securely with Stripe.
              </p>
            </div>
            <Link href="/properties">
              <Button className="w-full sm:w-auto bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl py-5 px-6 text-xs gap-2 cursor-pointer shadow-md">
                <Search className="size-4" />
                <span>Explore Available Properties</span>
              </Button>
            </Link>
          </div>

          {/* Landlord CTA */}
          <div className="p-8 rounded-3xl bg-linear-to-br from-[#fff5f5] via-white to-[#fff5f5] dark:from-[#1a1d24] dark:to-[#14171d] text-[#222222] dark:text-white border border-[#CFA190]/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#CFA190] px-2.5 py-1 rounded bg-[#CFA190]/10 border border-[#CFA190]/30 inline-block">
                FOR LANDLORDS
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-[#222222] dark:text-white">
                Have Property to Rent Out?
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                List your rental properties to thousands of verified tenants. Manage incoming applications and collect rent hassle-free.
              </p>
            </div>
            <Link href="/register?role=LANDLORD">
              <Button variant="outline" className="w-full sm:w-auto border-[#CFA190] text-[#CFA190] hover:bg-[#CFA190] hover:text-white dark:hover:bg-[#CFA190] dark:hover:text-white font-bold rounded-xl py-5 px-6 text-xs gap-2 cursor-pointer">
                <Building2 className="size-4" />
                <span>Register as Landlord</span>
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

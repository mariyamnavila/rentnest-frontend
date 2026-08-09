'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnimatedHeading } from './AnimatedHeading';

const faqs = [
  {
    q: 'How does RentNest verify rental property listings?',
    a: 'All property listings uploaded by landlords undergo an automated checks and admin review process to confirm ownership details and eliminate scam listings.',
  },
  {
    q: 'How are monthly rental payments processed?',
    a: 'Tenants pay securely through Stripe once their application is approved by the landlord. Payment receipts and booking confirmations are generated immediately.',
  },
  {
    q: 'Can landlords reject or approve incoming rental requests?',
    a: 'Yes, landlords have full access to an Application Inbox where they can review applicant details and approve or reject rental requests with a single click.',
  },
  {
    q: 'Are there hidden fees for tenants browsing properties?',
    a: 'No, browsing listings is 100% free for tenants. You only pay the listed monthly rental rate during the checkout process.',
  },
];

export function FAQSection() {
  return (
    <section className="py-16 bg-white dark:bg-[#1a1d24] border-t border-[#e4e4e4] dark:border-[#2e3440] font-sans">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            Questions & Answers
          </span>
          <AnimatedHeading
            text="FREQUENTLY ASKED QUESTIONS"
            highlightText="QUESTIONS"
            className="text-2xl sm:text-3xl font-black uppercase tracking-tight justify-center"
          />
        </div>

        {/* Shadcn Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] rounded-2xl px-5"
            >
              <AccordionTrigger className="font-extrabold text-sm sm:text-base text-[#222222] dark:text-white hover:no-underline text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}
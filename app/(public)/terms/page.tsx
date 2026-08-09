import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, FileText, Lock, Scale, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service & Privacy Policy - RentNest',
  description: 'Review RentNest terms of service, privacy policy, landlord responsibilities, and tenant privacy safeguards.',
};

import { AnimatedPageWrapper } from '../_components/AnimatedPageWrapper';

import { AnimatedHeading } from '../_components/AnimatedHeading';

export default function TermsPage() {
  return (
    <AnimatedPageWrapper className="space-y-12 py-8 font-sans container mx-auto px-4 max-w-4xl">
      {/* Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff5f5] dark:bg-[#232733] px-3.5 py-1.5 border border-[#CFA190]/30 text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
          <Scale className="size-4" />
          <span>LEGAL & GOVERNANCE</span>
        </div>

        <AnimatedHeading
          as="h1"
          text="TERMS OF SERVICE & PRIVACY"
          highlightText="PRIVACY"
          align="center"
          className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans"
        />

        <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed font-sans">
          Last Updated: February 2026. Please read our platform terms, tenant guidelines, and data protection commitments carefully.
        </p>
      </section>

      {/* Main Content Cards */}
      <div className="space-y-8">
        {/* Section 1: Terms of Service */}
        <Card className="bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl shadow-xs">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#e4e4e4] dark:border-[#2e3440] pb-4">
              <FileText className="size-6 text-[#CFA190]" />
              <h2 className="text-xl font-black text-[#222222] dark:text-white uppercase">
                1. Platform Terms of Service
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              <p>
                Welcome to RentNest. By accessing or using our marketplace platform, you agree to comply with and be bound by these Terms of Service. RentNest serves as an online intermediary connecting property owners (Landlords) and prospective tenants (Tenants).
              </p>
              <p>
                <strong>User Eligibility:</strong> You must be at least 18 years of age to register an account, create property listings, or submit rental applications. Account credentials must remain confidential and accurate.
              </p>
              <p>
                <strong>Prohibited Conduct:</strong> Users agree not to post fraudulent listings, misrepresent property details, attempt unauthorised access, or engage in discriminatory practices in violation of Fair Housing guidelines.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Privacy Policy & Data Security */}
        <Card className="bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl shadow-xs">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#e4e4e4] dark:border-[#2e3440] pb-4">
              <Lock className="size-6 text-[#CFA190]" />
              <h2 className="text-xl font-black text-[#222222] dark:text-white uppercase">
                2. Privacy Policy & Security
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              <p>
                Your privacy is paramount. We collect personal information (such as name, email, phone number, and payment credentials) exclusively to facilitate authentication, property verification, and secure Stripe payment processing.
              </p>
              <p>
                <strong>Data Encryption:</strong> All sensitive data transmitted through RentNest is protected using industry-standard SSL/TLS encryption. JWT authentication tokens are stored safely in HTTP-only cookies.
              </p>
              <p>
                <strong>Third-Party Sharing:</strong> We do not sell or rent user data to third parties. Financial transactions are securely processed via Stripe in accordance with PCI-DSS compliance standards.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Landlord & Tenant Guidelines */}
        <Card className="bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl shadow-xs">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#e4e4e4] dark:border-[#2e3440] pb-4">
              <UserCheck className="size-6 text-[#CFA190]" />
              <h2 className="text-xl font-black text-[#222222] dark:text-white uppercase">
                3. Landlord & Tenant Guidelines
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>Landlord Obligations:</strong> Landlords are responsible for providing truthful property specs, maintaining habitable premises, honoring approved rental agreements, and respecting tenant privacy rights during occupancy.
              </p>
              <p>
                <strong>Tenant Obligations:</strong> Tenants agree to submit verified personal details, pay monthly rent on schedule via RentNest payment links, and abide by property rules set forth in lease agreements.
              </p>
              <p>
                <strong>Reviews & Ratings:</strong> Review content must accurately reflect genuine tenant stays. Abusive, defamatory, or fraudulent review entries will be moderated and removed by platform administrators.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Refund & Cancellation */}
        <Card className="bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl shadow-xs">
          <CardContent className="p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#e4e4e4] dark:border-[#2e3440] pb-4">
              <ShieldCheck className="size-6 text-[#CFA190]" />
              <h2 className="text-xl font-black text-[#222222] dark:text-white uppercase">
                4. Payments & Cancellation Policy
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              <p>
                Rental request payments are executed through verified Stripe Checkout. In the event of a rejected application or lease cancellation prior to check-in, refunds are processed back to the original payment method according to property cancellation terms.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedPageWrapper>
  );
}

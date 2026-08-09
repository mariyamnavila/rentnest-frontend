import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from '../_components/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Contact Us - RentNest',
  description: 'Have questions or need assistance with your rental application? Get in touch with RentNest support team.',
};

const contactInfo = [
  {
    title: 'Customer Support',
    detail: 'support@rentnest.com',
    sub: 'Quick responses within 24 hours',
    icon: Mail,
  },
  {
    title: 'Direct Phone',
    detail: '+1 (800) 555-RENT',
    sub: 'Toll-free Mon-Fri 9am-6pm EST',
    icon: Phone,
  },
  {
    title: 'Headquarters',
    detail: '123 Innovation Way, Suite 400',
    sub: 'San Francisco, CA 94107',
    icon: MapPin,
  },
  {
    title: 'Operating Hours',
    detail: 'Monday – Friday: 9:00 AM – 6:00 PM',
    sub: 'Weekend emergency support active',
    icon: Clock,
  },
];

import { AnimatedPageWrapper } from '../_components/AnimatedPageWrapper';
import { AnimatedHeading } from '../_components/AnimatedHeading';

export default function ContactPage() {
  return (
    <AnimatedPageWrapper className="space-y-12 py-8 font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff5f5] dark:bg-[#232733] px-3.5 py-1.5 border border-[#CFA190]/30 text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
          <MessageCircle className="size-4" />
          <span>WE&apos;RE HERE TO HELP</span>
        </div>

        <AnimatedHeading
          as="h1"
          text="GET IN TOUCH WITH US"
          highlightText="TOUCH"
          align="center"
          className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans"
        />

        <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed font-sans">
          Have questions about a property listing, lease agreement, or payment issue? Send us a message and our support team will reach out promptly.
        </p>
      </section>

      {/* Info Cards Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <Card key={info.title} className="bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl shadow-xs">
                <CardContent className="p-6 space-y-2">
                  <div className="h-10 w-10 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center mb-1">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-sm font-black text-[#222222] dark:text-white uppercase">{info.title}</h3>
                  <p className="text-xs font-bold text-[#CFA190] truncate">{info.detail}</p>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">{info.sub}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Form + Map/FAQ Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
            <div className="space-y-1">
              <AnimatedHeading
                text="Send Us a Message"
                highlightText="Message"
                align="left"
                className="text-xl font-black uppercase tracking-tight"
              />
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Fill out the form below and we will get back to you within 24 hours.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* Location & Quick FAQ Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <Card className="bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl shadow-xs overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-base font-black text-[#222222] dark:text-white uppercase flex items-center gap-2">
                  <MapPin className="size-4 text-[#CFA190]" />
                  Visit Our Headquarters
                </h3>

                <div className="aspect-video rounded-2xl bg-linear-to-br from-[#fff5f5] to-[#f7f7f7] dark:from-[#232733] dark:to-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] p-4 flex flex-col justify-center items-center text-center space-y-2">
                  <MapPin className="size-8 text-[#CFA190] animate-bounce" />
                  <p className="text-xs font-black text-[#222222] dark:text-white uppercase">San Francisco HQ</p>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">123 Innovation Way, Suite 400, CA 94107</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support Tips Card */}
            <Card className="bg-linear-to-br from-[#fff5f5] via-white to-white dark:from-[#232733] dark:via-[#1a1d24] dark:to-[#1a1d24] border-[#CFA190]/30 rounded-3xl shadow-xs">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-base font-black text-[#222222] dark:text-white uppercase flex items-center gap-2">
                  <HelpCircle className="size-4 text-[#CFA190]" />
                  Quick Help Tips
                </h3>
                <ul className="space-y-2 text-xs text-gray-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#CFA190] font-black">•</span>
                    <span>For rental status inquiries, check your <strong>Tenant Dashboard</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#CFA190] font-black">•</span>
                    <span>For payment receipts, visit your <strong>Payment History</strong> tab.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#CFA190] font-black">•</span>
                    <span>For property managers, access your <strong>Landlord Portal</strong> for instant inbox management.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </AnimatedPageWrapper>
  );
}

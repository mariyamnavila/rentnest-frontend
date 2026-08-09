import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Building2,
  Users,
  ShieldCheck,
  Award,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe,
  Lock,
} from 'lucide-react';

export const metadata = {
  title: 'About Us - RentNest',
  description: 'Learn about RentNest\'s mission, core values, platform stats, and team behind the modern rental property marketplace.',
};

const stats = [
  { label: 'Verified Properties', value: '1,200+', icon: Building2 },
  { label: 'Happy Tenants', value: '8,500+', icon: Users },
  { label: 'Active Landlords', value: '450+', icon: ShieldCheck },
  { label: 'Cities Covered', value: '25+', icon: Globe },
];

const values = [
  {
    title: 'Trust & Transparency',
    description: 'Verified listings, upfront pricing, and clear lease agreements with zero hidden charges.',
    icon: ShieldCheck,
  },
  {
    title: 'Seamless Renting',
    description: 'Digital applications, direct landlord communication, and instant online payment workflows.',
    icon: Sparkles,
  },
  {
    title: 'Security First',
    description: 'Bank-grade encrypted Stripe payments and role-based authentication guarding user privacy.',
    icon: Lock,
  },
  {
    title: 'Community Driven',
    description: 'Fostering long-term positive relationships between tenants, property owners, and managers.',
    icon: HeartHandshake,
  },
];

const team = [
  {
    name: 'Sarah Jenkins',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: '10+ years in PropTech innovation, passionate about modernizing urban rental experiences.',
  },
  {
    name: 'Marcus Vance',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Ex-Silicon Valley product leader focused on intuitive UX and automated lease management.',
  },
  {
    name: 'Elena Rostova',
    role: 'Lead Trust & Safety',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Ensuring 100% verified landlord credentials and transparent tenant background safeguards.',
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16 py-8 font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white via-white to-[#fff5f5] dark:from-[#14171d] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] p-8 md:p-14 shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fff5f5] dark:bg-[#232733] px-3.5 py-1.5 border border-[#CFA190]/30 text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
              <Award className="size-4" />
              <span>About RentNest</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#222222] dark:text-white uppercase tracking-tight leading-tight font-sans">
              REDEFINING HOW PEOPLE <span className="text-[#CFA190]">FIND & LEASE</span> HOMES
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-relaxed font-sans">
              RentNest is a next-generation rental property marketplace built to bridge the gap between tenants and landlords. We combine modern technology, verified property data, and secure digital workflows to make finding, booking, and managing rental homes effortless.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/properties">
                <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl px-6 py-6 text-sm gap-2 shadow-md cursor-pointer">
                  <span>Browse Properties</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-[#e4e4e4] dark:border-[#2e3440] text-[#222222] dark:text-slate-200 hover:text-[#CFA190] dark:hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] font-bold rounded-2xl px-6 py-6 text-sm cursor-pointer">
                  <span>Get in Touch</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl shadow-xs">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="h-12 w-12 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center mx-auto mb-2">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Our Mission & Story */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#CFA190]">
                OUR MISSION & VISION
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
                Empowering Tenants and Property Owners Worldwide
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed">
              Finding a home should be exciting, not stressful. Traditional rental channels are often cluttered with outdated listings, hidden broker fees, and slow communication. RentNest was created to transform this journey into a seamless, digital-first experience.
            </p>

            <div className="space-y-3">
              {[
                '100% Verified Property Listings with High-Res Media',
                'Role-Based Dedicated Dashboards for Tenants, Landlords & Admins',
                'Integrated Stripe Payments with Instant Receipts & Receipts History',
                'Transparent Review System Built on Verified Stay History',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-[#CFA190] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-[#222222] dark:text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-[#e4e4e4] dark:border-[#2e3440] shadow-xl">
            <Image
              unoptimized
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
              alt="Modern apartment interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#CFA190]">
            WHAT GUIDES US
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            Our Core Values
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            We hold ourselves to the highest standards of safety, usability, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <Card key={v.title} className="bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl shadow-xs hover:border-[#CFA190]/50 transition-all">
                <CardContent className="p-6 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-black text-[#222222] dark:text-white uppercase">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    {v.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#CFA190]">
            BEHIND RENTNEST
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            Meet Our Leadership Team
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Dedicated professionals committed to simplifying property rentals for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="bg-white dark:bg-[#1a1d24] border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl overflow-hidden shadow-xs group pt-0">
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  unoptimized
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-black text-[#222222] dark:text-white uppercase">{member.name}</h3>
                <p className="text-xs font-bold text-[#CFA190] uppercase tracking-wider">{member.role}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed pt-1">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

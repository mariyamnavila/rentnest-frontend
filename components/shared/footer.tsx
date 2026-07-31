import Link from "next/link";
import { Building2, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#1a1d24] text-slate-300 border-t border-[#2a2e39] font-sans">
      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 p-1 bg-white sm:h-10 sm:w-10 rounded-xl flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="RentNest Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase">
                RENT<span className="text-[#CFA190]">NEST</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Discover why property seekers choose RentNest for their rental journey. Experience seamless property browsing, landlord connections, and secure rentals.
            </p>
          </div>

          {/* House Types */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-4 border-b border-[#CFA190]/40 pb-2 inline-block">
              House Types
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/properties?type=apartment" className="hover:text-[#CFA190] transition-colors flex items-center justify-between">
                  <span>Apartment</span>
                  <span className="text-[10px] bg-[#232733] px-2 py-0.5 rounded text-[#CFA190] font-bold">(12)</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=house" className="hover:text-[#CFA190] transition-colors flex items-center justify-between">
                  <span>Family House</span>
                  <span className="text-[10px] bg-[#232733] px-2 py-0.5 rounded text-slate-400 font-bold">(8)</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=studio" className="hover:text-[#CFA190] transition-colors flex items-center justify-between">
                  <span>Studio & Loft</span>
                  <span className="text-[10px] bg-[#232733] px-2 py-0.5 rounded text-[#CFA190] font-bold">(5)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Roles & Dashboards */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-4 border-b border-[#CFA190]/40 pb-2 inline-block">
              Platform Roles
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/register?role=TENANT" className="hover:text-[#CFA190] transition-colors">
                  Tenant Registration
                </Link>
              </li>
              <li>
                <Link href="/register?role=LANDLORD" className="hover:text-[#CFA190] transition-colors">
                  Landlord Portal
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-[#CFA190] transition-colors">
                  Admin Moderation
                </Link>
              </li>
              <li>
                <Link href="/dashboard/tenant" className="hover:text-[#CFA190] transition-colors">
                  Tenant Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-wider uppercase mb-4 border-b border-[#CFA190]/40 pb-2 inline-block">
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-[#CFA190] transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#CFA190] transition-colors">Browse Rentals</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#CFA190] transition-colors">Sign In</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#CFA190] transition-colors">Create Account</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-12 pt-8 border-t border-[#2a2e39] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-[#CFA190] shrink-0" />
            <span>Central Business District, Downtown</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 text-[#CFA190] shrink-0" />
            <span>+1 (800) RENT-NEST (24/7 Support)</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-[#CFA190] shrink-0" />
            <span>support@rentnest.com</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-[#2a2e39]/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} RentNest Rentals Marketplace. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/properties" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

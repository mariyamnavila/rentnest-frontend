'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, LogOut, LayoutDashboard, Menu, X, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { logout } from '@/service/logOut';


const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Rentals', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const { user, role = 'TENANT' } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const isLoggedIn = !!user;
  const name = user?.name || "User";
  const email = user?.email || "";

  const getDashboardPath = () => {
    if (role === "ADMIN") return "/admin-dashboard";
    if (role === "LANDLORD") return "/landlord-dashboard";
    return "/tenant-dashboard";
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("User Logged Out Successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || "RN";

  return (
    <header className="sticky top-0 z-50 shadow-xs font-sans">
      {/* Main Header Container */}
      <div className="bg-white dark:bg-[#1a1d24] border-b border-[#e4e4e4] dark:border-[#2a2e39]">
        <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="RentNest Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#222222] dark:text-white uppercase font-sans leading-none">
                RENT<span className="text-[#CFA190]">NEST</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">
                Rentals Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-bold text-[#222222] dark:text-slate-200 hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] transition-colors text-sm px-3.5"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-[#e4e4e4] dark:border-[#2e3440] bg-[#f7f7f7] dark:bg-[#232733] p-1.5 sm:pr-3 hover:bg-[#fff5f5] focus:outline-none transition-all cursor-pointer shadow-xs"
                >
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 overflow-hidden rounded-full bg-[#CFA190] text-white font-bold items-center justify-center text-xs shadow-inner">
                    {user?.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={name}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#222222] dark:text-slate-100 hidden sm:inline-block max-w-25 md:max-w-35 truncate">
                    {name}
                  </span>
                  <ChevronDown className="size-3.5 sm:size-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 sm:w-60 rounded-xl border border-[#e4e4e4] dark:border-[#2e3440] bg-white dark:bg-[#1a1d24] p-2 shadow-2xl ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-2"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="p-2.5 sm:p-3 border-b border-[#e4e4e4] dark:border-[#2e3440]">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs sm:text-sm font-bold truncate text-[#222222] dark:text-slate-100">{name}</p>
                        <span className="inline-flex items-center rounded-md bg-[#fff5f5] px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold text-[#CFA190] uppercase tracking-wider border border-[#CFA190]/20">
                          {role}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">{email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={getDashboardPath()}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-lg hover:bg-[#fff5f5] dark:hover:bg-[#232733] text-[#222222] dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        <LayoutDashboard className="size-4 text-[#CFA190]" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href={`${getDashboardPath()}/profile`}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-lg hover:bg-[#f7f7f7] dark:hover:bg-[#232733] text-[#222222] dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        <User className="size-4 text-gray-500" />
                        <span>Profile</span>
                      </Link>
                    </div>

                    <div className="border-t border-[#e4e4e4] dark:border-[#2e3440] pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-bold rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      >
                        <LogOut className="size-4" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Hide top navbar buttons on mobile (< lg), show only in drawer on small screens */
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-bold text-sm text-[#222222] dark:text-slate-200 hover:text-[#CFA190] px-3">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="font-bold text-sm bg-[#CFA190] hover:bg-[#C08E82] text-white shadow-xs rounded-lg px-5 cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile & Tablet Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-[#e4e4e4] dark:border-[#2e3440] text-[#222222] dark:text-white hover:bg-[#f7f7f7] dark:hover:bg-[#232733] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-white dark:bg-[#1a1d24] border-b border-[#e4e4e4] dark:border-[#2e3440] shadow-xl z-40 animate-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {/* Nav links */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm sm:text-base font-bold text-[#222222] dark:text-slate-200 hover:bg-[#fff5f5] dark:hover:bg-[#232733] hover:text-[#CFA190] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Actions / Profile Links */}
            {isLoggedIn ? (
              <div className="pt-3 border-t border-[#e4e4e4] dark:border-[#2e3440] space-y-2">
                <div className="px-3 py-1.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#222222] dark:text-white">{name}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#fff5f5] text-[#CFA190] uppercase border border-[#CFA190]/20">
                    {role}
                  </span>
                </div>
                <Link
                  href={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold text-[#222222] dark:text-slate-200 hover:bg-[#fff5f5] dark:hover:bg-[#232733] transition-colors"
                >
                  <LayoutDashboard className="size-4 text-[#CFA190]" />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-[#e4e4e4] dark:border-[#2e3440] grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center text-xs sm:text-sm font-bold">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-center text-xs sm:text-sm font-bold bg-[#CFA190] text-white hover:bg-[#C08E82]">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

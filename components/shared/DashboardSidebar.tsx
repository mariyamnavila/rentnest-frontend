'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LogOut,
  Menu,
  X,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/service/logOut';
import { sidebarMenuItems } from '@/app/(dashboardGroup)/_config/sidebarMenuItems';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { ThemeToggle } from './ThemeToggle';

export function DashboardSidebar() {
  const queryClient = useQueryClient();
  const { user, role = 'TENANT' } = useAuth();
  const userName = user?.name || 'User Account';
  const userEmail = user?.email || 'user@rentnest.com';
  const profileImage = user?.profileImage;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


  // Profile link
  const profileHref = '/profile';

  // Get navigation items from config
  const navItems = sidebarMenuItems[role] || sidebarMenuItems.TENANT;

  const handleLogout = async () => {
    try {

      await logout();
      toast.success("User Logged Out Successfully");

      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      {/* Mobile Top Header with Hamburger Toggle */}
      <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-[#1a1d24] border-b border-[#e4e4e4] dark:border-[#2e3440] px-4 h-16 flex items-center justify-between font-sans">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 p-1 bg-white rounded-xl flex items-center justify-center">
            <Image src="/logo.png" alt="RentNest" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <span className="text-lg font-black tracking-tight text-[#222222] dark:text-white uppercase">
            RENT<span className="text-[#CFA190]">NEST</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#222222] dark:text-white"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Overlay Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
        />
      )}

      {/* Sidebar Navigation Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-[#1a1d24] border-r border-[#e4e4e4] dark:border-[#2e3440] flex flex-col justify-between transition-transform duration-300 font-sans ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        {/* Top Header & Brand */}
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-2xl bg-[#fff5f5] border border-[#CFA190]/30 p-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image src="/logo.png" alt="RentNest" width={36} height={36} className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#222222] dark:text-white uppercase leading-none">
                  RENT<span className="text-[#CFA190]">NEST</span>
                </span>
                <span className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest mt-0.5">
                  Marketplace
                </span>
              </div>
            </Link>

            <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="size-5" />
            </button>
          </div>

          <div className="px-3 py-2 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <UserCheck className="size-4 text-[#CFA190] shrink-0" />
              <span className="text-xs font-black uppercase text-[#222222] dark:text-white truncate">
                {role === 'LANDLORD' ? 'Landlord Portal' : role === 'ADMIN' ? 'Admin Portal' : 'Tenant Portal'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <ThemeToggle className="size-7" />
              <Badge className="bg-[#CFA190] text-white text-[9px] font-extrabold px-2 py-0.5 uppercase">
                {role}
              </Badge>
            </div>
          </div>

          {/* Nav Links List */}
          <nav className="space-y-1 pt-2">
            {navItems.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${isActive
                    ? 'bg-[#CFA190] text-white shadow-md'
                    : 'text-gray-600 dark:text-slate-300 hover:bg-[#fff5f5] dark:hover:bg-[#232733] hover:text-[#CFA190]'
                    }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Strip with Clickable Role-Based Profile Link & Avatar Image Fallback */}
        <div className="p-4 border-t border-[#e4e4e4] dark:border-[#2e3440] space-y-3">
          <Link
            href={profileHref}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-2 py-1.5 rounded-2xl hover:bg-[#fff5f5] dark:hover:bg-[#232733] transition-colors group cursor-pointer"
          >
            <div className="h-9 w-9 rounded-xl bg-[#CFA190] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-sm group-hover:scale-105 transition-transform overflow-hidden relative">
              {profileImage ? (
                <Image
                  unoptimized
                  src={profileImage}
                  alt={userName}
                  fill
                  className="object-cover"
                />
              ) : (
                userName[0]?.toUpperCase() || 'U'
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-extrabold text-[#222222] dark:text-white truncate">
                {userName}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {userEmail}
              </p>
            </div>
          </Link>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full rounded-xl border-[#e4e4e4] dark:border-[#2e3440] text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold gap-2 py-4 cursor-pointer"
          >
            <LogOut className="size-4" />
            <span>Log Out</span>
          </Button>
        </div>
      </aside>
    </>
  );
}

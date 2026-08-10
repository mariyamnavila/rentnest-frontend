'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, User, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/service/logOut';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { ThemeToggle } from './ThemeToggle';

export function DashboardNavbar() {
  const queryClient = useQueryClient();
  const { user, role = 'TENANT' } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = user?.name || 'User Account';
  const userEmail = user?.email || 'user@rentnest.com';
  const profileImage = user?.profileImage;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("User Logged Out Successfully");
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const portalName = role === 'ADMIN' ? 'Admin Portal' : role === 'LANDLORD' ? 'Landlord Portal' : 'Tenant Portal';
  const dashboardHref = role === 'ADMIN' ? '/admin-dashboard' : role === 'LANDLORD' ? '/landlord-dashboard' : '/tenant-dashboard';

  return (
    <header className="hidden lg:flex sticky top-0 z-30 w-full bg-white/80 dark:bg-[#1a1d24]/80 backdrop-blur-md border-b border-[#e4e4e4] dark:border-[#2e3440] h-16 items-center justify-between px-8 font-sans">
      {/* Left side: Portal Label */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-black uppercase text-[#CFA190] bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/20 px-3 py-1 rounded-full tracking-wider">
          {portalName}
        </span>
      </div>

      {/* Right side: Actions & Profile Dropdown */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <ThemeToggle className="size-8" />



        {/* Profile Dropdown Trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-2xl hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors group cursor-pointer"
          >
            <div className="h-8 w-8 rounded-xl bg-[#CFA190] text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs overflow-hidden relative group-hover:scale-105 transition-transform">
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
            <span className="text-xs font-extrabold text-[#222222] dark:text-white max-w-24 truncate">
              {userName}
            </span>
            <ChevronDown className={`size-3.5 text-gray-400 group-hover:text-[#CFA190] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Absolute Dropdown Panel */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-lg py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-[#e4e4e4] dark:border-[#2e3440] mb-1">
                <p className="text-xs font-black text-[#222222] dark:text-white truncate">{userName}</p>
                <p className="text-[10px] text-gray-400 truncate">{userEmail}</p>
              </div>

              <Link
                href="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-gray-600 dark:text-slate-300 hover:bg-[#fff5f5] dark:hover:bg-[#232733] hover:text-[#CFA190] transition-colors cursor-pointer"
              >
                <User className="size-4 text-gray-400" />
                <span>My Profile</span>
              </Link>

              <Link
                href={dashboardHref}
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-gray-600 dark:text-slate-300 hover:bg-[#fff5f5] dark:hover:bg-[#232733] hover:text-[#CFA190] transition-colors cursor-pointer"
              >
                <LayoutDashboard className="size-4 text-gray-400" />
                <span>Dashboard Overview</span>
              </Link>

              <div className="h-px bg-[#e4e4e4] dark:bg-[#2e3440] my-1" />

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  handleLogout();
                }}
                className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
              >
                <LogOut className="size-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

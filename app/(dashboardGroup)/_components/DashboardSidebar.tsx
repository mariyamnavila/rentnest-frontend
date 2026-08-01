'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarMenuItems } from '../_config/sidebarMenuItems';
import type { UserRole } from '@/lib/types';

type DashboardSidebarProps = {
  role: UserRole;
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const items = sidebarMenuItems[role] || [];

  return (
    <aside className="lg:w-56 shrink-0">
      <nav className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] p-3">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                isActive
                  ? 'bg-[#fff5f5] dark:bg-[#232733] text-[#CFA190]'
                  : 'text-gray-600 dark:text-slate-300 hover:bg-[#fff5f5] dark:hover:bg-[#232733] hover:text-[#CFA190]'
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

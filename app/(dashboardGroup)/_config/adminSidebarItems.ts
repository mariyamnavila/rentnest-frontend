import { ISidebarItem } from '@/lib/types';
import { LayoutDashboard, Users, Building2, Layers } from 'lucide-react';

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: 'Overview',
    href: '/admin-dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Manage Users',
    href: '/admin-dashboard/users',
    icon: Users,
  },
  {
    label: 'All Listings',
    href: '/admin-dashboard/properties',
    icon: Building2,
  },
  {
    label: 'Categories',
    href: '/admin-dashboard/categories',
    icon: Layers,
  },
];

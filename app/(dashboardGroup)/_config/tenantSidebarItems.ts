import { ISidebarItem } from '@/lib/types';
import { CreditCard, FileText, Home, LayoutDashboard, Star } from 'lucide-react';

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: 'Overview',
    href: '/tenant-dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Rental Requests',
    href: '/tenant-dashboard/requests',
    icon: FileText,
  },
  {
    label: 'Payment History',
    href: '/tenant-dashboard/payments',
    icon: CreditCard,
  },
  {
    label: 'My Reviews',
    href: '/tenant-dashboard/reviews',
    icon: Star,
  },
  {
    label: 'Explore Rentals',
    href: '/properties',
    icon: Home,
  },
];

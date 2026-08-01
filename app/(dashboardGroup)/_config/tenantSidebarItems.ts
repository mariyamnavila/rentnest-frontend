import { ISidebarItem } from '@/lib/types';
import { ClipboardPen, CreditCard, FileText, Home, LayoutDashboard } from 'lucide-react';

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
    label: 'Explore Rentals',
    href: '/properties',
    icon: Home,
  },
];

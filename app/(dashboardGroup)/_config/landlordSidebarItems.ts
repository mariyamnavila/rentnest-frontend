import { ISidebarItem } from '@/lib/types';
import { LayoutDashboard, Building2, ClipboardList } from 'lucide-react';

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/landlord-dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Properties',
    href: '/landlord-dashboard/properties',
    icon: Building2,
  },
  {
    label: 'Requests',
    href: '/landlord-dashboard/requests',
    icon: ClipboardList,
  },
];

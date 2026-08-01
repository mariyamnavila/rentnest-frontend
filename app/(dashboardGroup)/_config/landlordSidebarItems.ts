import { ISidebarItem } from '@/lib/types';
import { LayoutDashboard, Building2, PlusCircle, FileText } from 'lucide-react';

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: 'Overview',
    href: '/landlord-dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Properties',
    href: '/landlord-dashboard/properties',
    icon: Building2,
  },
  {
    label: 'Add Property',
    href: '/landlord-dashboard/properties/new',
    icon: PlusCircle,
  },
  {
    label: 'Tenant Requests',
    href: '/landlord-dashboard/requests',
    icon: FileText,
  },
];

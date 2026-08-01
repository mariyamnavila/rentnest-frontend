import { ISidebarItem } from '@/lib/types';
import { LayoutDashboard, Users, Building2, ClipboardList } from 'lucide-react';

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/admin-dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: '/admin-dashboard/users',
    icon: Users,
  },
  {
    label: 'Properties',
    href: '/admin-dashboard/properties',
    icon: Building2,
  },
  {
    label: 'All Requests',
    href: '/admin-dashboard/requests',
    icon: ClipboardList,
  },
];

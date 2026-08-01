import { ISidebarItem } from '@/lib/types';
import { ClipboardPen, Home } from 'lucide-react';

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/tenant-dashboard',
    icon: Home,
  },
  {
    label: 'My Requests',
    href: '/tenant-dashboard/requests',
    icon: ClipboardPen,
  },
];

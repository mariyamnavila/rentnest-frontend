'use server';

import { cookies } from 'next/headers';
import type { IProperty } from '@/lib/types';

export type LandlordStats = {
  totalProperties: number;
  totalRequests: number;
  pending: number;
  approved: number;
  active: number;
  completed: number;
  totalEarnings: number;
};

export async function getLandlordStats(): Promise<{ success: boolean; data: LandlordStats | null }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: null };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/stats`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: null };

    return { success: true, data: result.data };
  } catch {
    return { success: false, data: null };
  }
}

export async function getLandlordProperties(): Promise<{ success: boolean; data: IProperty[] }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [] };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: [] };

    return { success: true, data: result.data || [] };
  } catch {
    return { success: false, data: [] };
  }
}

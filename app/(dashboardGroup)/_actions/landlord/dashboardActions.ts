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

export type LandlordMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function getLandlordProperties(
  search?: string,
  page?: number,
  limit?: number,
  categoryId?: string,
  isAvailable?: string,
  sortBy?: string
): Promise<{ success: boolean; data: IProperty[]; meta: LandlordMeta | null }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [], meta: null };

  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (categoryId) params.set('categoryId', categoryId);
    if (isAvailable) params.set('isAvailable', isAvailable);
    if (sortBy) params.set('sortBy', sortBy);

    const url = `${process.env.BACKEND_API_URL}/api/landlord/properties${params.toString() ? `?${params.toString()}` : ''}`;

    const res = await fetch(url, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: [], meta: null };

    return { success: true, data: result.data || [], meta: result.meta || null };
  } catch {
    return { success: false, data: [], meta: null };
  }
}

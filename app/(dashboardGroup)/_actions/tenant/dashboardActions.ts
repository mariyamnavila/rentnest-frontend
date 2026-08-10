'use server';

import { cookies } from 'next/headers';
import { IRentalRequest, IPayment } from '@/lib/types';

export type TenantMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TenantRentalsResponse = {
  success: boolean;
  data: IRentalRequest[];
  meta: TenantMeta | null;
};

export type TenantPaymentsResponse = {
  success: boolean;
  data: IPayment[];
};

export type RentalStats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  active: number;
  completed: number;
  totalSpent: number;
};

export type RentalStatsResponse = {
  success: boolean;
  data: RentalStats;
};

export async function getMyRentals(
  search?: string,
  page?: number,
  limit?: number,
  status?: string,
  sortBy?: string
): Promise<TenantRentalsResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, data: [], meta: null };
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (status) params.set('status', status);
    if (sortBy) params.set('sortBy', sortBy);

    const url = `${process.env.BACKEND_API_URL}/api/rentals${params.toString() ? `?${params.toString()}` : ''}`;

    const res = await fetch(url, {
      headers: {
        Cookie: `accessToken=${accessToken}`
      },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, data: [], meta: null };
    }

    return { success: true, data: result.data || [], meta: result.meta || null };
  } catch {
    return { success: false, data: [], meta: null };
  }
}

export async function getMyPayments(): Promise<TenantPaymentsResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
      headers: {
        Cookie: `accessToken=${accessToken}`
      },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, data: [] };
    }

    return { success: true, data: result.data || [] };
  } catch {
    return { success: false, data: [] };
  }
}

export async function getRentalStats(): Promise<RentalStatsResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      data: { total: 0, pending: 0, approved: 0, rejected: 0, active: 0, completed: 0, totalSpent: 0 },
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/stats`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        data: { total: 0, pending: 0, approved: 0, rejected: 0, active: 0, completed: 0, totalSpent: 0 },
      };
    }

    return { success: true, data: result.data };
  } catch {
    return {
      success: false,
      data: { total: 0, pending: 0, approved: 0, rejected: 0, active: 0, completed: 0, totalSpent: 0 },
    };
  }
}

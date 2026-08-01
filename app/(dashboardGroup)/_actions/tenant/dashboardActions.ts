'use server';

import { cookies } from 'next/headers';
import { IRentalRequest, IPayment } from '@/lib/types';

export type TenantRentalsResponse = {
  success: boolean;
  data: IRentalRequest[];
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

export async function getMyRentals(): Promise<TenantRentalsResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
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

'use server';

import { cookies } from 'next/headers';
import type { IRentalRequest } from '@/lib/types';

import type { LandlordMeta } from './dashboardActions';

export async function getLandlordRequests(
  search?: string,
  page?: number,
  limit?: number,
  status?: string,
  sortBy?: string
): Promise<{ success: boolean; data: IRentalRequest[]; meta: LandlordMeta | null }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [], meta: null };

  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (status) params.set('status', status);
    if (sortBy) params.set('sortBy', sortBy);

    const url = `${process.env.BACKEND_API_URL}/api/landlord/requests${params.toString() ? `?${params.toString()}` : ''}`;

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

export type LandlordRequestActionState = {
  success: boolean;
  message: string;
};

export async function updateRequestStatus(
  rentalRequestId: string,
  status: 'APPROVED' | 'REJECTED'
): Promise<LandlordRequestActionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, message: 'You must be logged in.' };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests/${rentalRequestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status }),
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      return { success: false, message: result.message || 'Failed to update request.' };
    }

    return { success: true, message: `Request ${status.toLowerCase()} successfully.` };
  } catch {
    return { success: false, message: 'Unable to connect to the server.' };
  }
}

export async function completeRequest(
  rentalRequestId: string
): Promise<LandlordRequestActionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, message: 'You must be logged in.' };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests/${rentalRequestId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${accessToken}`,
      },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      return { success: false, message: result.message || 'Failed to complete request.' };
    }

    return { success: true, message: 'Rental marked as completed.' };
  } catch {
    return { success: false, message: 'Unable to connect to the server.' };
  }
}

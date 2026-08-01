'use server';

import { cookies } from 'next/headers';
import type { IRentalRequest } from '@/lib/types';

export async function getLandlordRequests(): Promise<{ success: boolean; data: IRentalRequest[] }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [] };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests`, {
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

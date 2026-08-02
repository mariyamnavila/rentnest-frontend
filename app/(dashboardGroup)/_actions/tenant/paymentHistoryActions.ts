'use server';

import { cookies } from 'next/headers';
import type { IPayment } from '@/lib/types';

export async function getMyPayments(): Promise<{ success: boolean; data: IPayment[] }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
      headers: { Cookie: `accessToken=${accessToken}` },
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

export type PaymentDetail = IPayment & {
  rentalRequest?: {
    id: string;
    propertyId: string;
    status: string;
    startDate: string;
    endDate: string;
    property?: { id: string; title: string; location: string; price: number; images: string[] };
  };
  tenant?: { id: string; name: string; email: string };
};

export async function getPaymentDetail(paymentId: string): Promise<{ success: boolean; data: PaymentDetail | null }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: null };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${paymentId}`, {
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

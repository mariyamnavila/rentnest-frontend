'use server';

import { cookies } from 'next/headers';
import type { IPayment } from '@/lib/types';
import { AppError, ErrorType, handleApiError, handleNetworkError } from '@/lib/errors';

export type PaymentResult = {
  success: boolean;
  data: IPayment[];
  error?: AppError;
};

export async function getMyPayments(): Promise<PaymentResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, data: [], error: { type: ErrorType.UNAUTHORIZED, message: 'Please log in to view payments.' } };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, data: [], error: handleApiError(res, result) };
    }

    return { success: true, data: result.data || [] };
  } catch {
    return { success: false, data: [], error: handleNetworkError() };
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

export async function getPaymentDetail(paymentId: string): Promise<{ success: boolean; data: PaymentDetail | null; error?: AppError }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, data: null, error: { type: ErrorType.UNAUTHORIZED, message: 'Please log in to view payment details.' } };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${paymentId}`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      return { success: false, data: null, error: handleApiError(res, result) };
    }

    return { success: true, data: result.data };
  } catch {
    return { success: false, data: null, error: handleNetworkError() };
  }
}

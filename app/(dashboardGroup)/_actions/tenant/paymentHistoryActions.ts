'use server';

import { cookies } from 'next/headers';
import type { IPayment } from '@/lib/types';
import { AppError, ErrorType, handleApiError, handleNetworkError } from '@/lib/errors';

export type PaymentMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaymentResult = {
  success: boolean;
  data: IPayment[];
  meta: PaymentMeta | null;
  error?: AppError;
};

export async function getMyPayments(
  search?: string,
  page?: number,
  limit?: number,
  status?: string,
  sortBy?: string
): Promise<PaymentResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, data: [], meta: null, error: { type: ErrorType.UNAUTHORIZED, message: 'Please log in to view payments.' } };
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (status) params.set('status', status);
    if (sortBy) params.set('sortBy', sortBy);

    const url = `${process.env.BACKEND_API_URL}/api/payments${params.toString() ? `?${params.toString()}` : ''}`;

    const res = await fetch(url, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, data: [], meta: null, error: handleApiError(res, result) };
    }

    return { success: true, data: result.data || [], meta: result.meta || null };
  } catch {
    return { success: false, data: [], meta: null, error: handleNetworkError() };
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

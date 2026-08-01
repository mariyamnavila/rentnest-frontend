'use server';

import { cookies } from 'next/headers';

export type PaymentState = {
  success: boolean;
  message: string;
  checkoutUrl?: string;
};

export async function createCheckoutSession(
  rentalRequestId: string
): Promise<PaymentState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      message: 'You must be logged in to make a payment.',
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ rentalRequestId }),
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Failed to initiate payment.',
      };
    }

    return {
      success: true,
      message: 'Redirecting to Stripe checkout...',
      checkoutUrl: result.data.checkoutUrl,
    };
  } catch {
    return {
      success: false,
      message: 'Unable to connect to the server.',
    };
  }
}

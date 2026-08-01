'use server';

import { cookies } from 'next/headers';

export type RentalDetailData = {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  message: string | null;
  createdAt: string;
  tenantId: string;
  propertyId: string;
  property?: {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    amenities: string[];
    images: string[];
    isAvailable: boolean;
    category?: { id: string; name: string };
    landlord?: { id: string; name: string; email: string; phone?: string };
  };
  tenant?: { id: string; name: string; email: string };
  payments?: {
    id: string;
    amount: number;
    method: string;
    status: string;
    paidAt: string | null;
  }[];
};

export type RentalDetailResponse = {
  success: boolean;
  data: RentalDetailData | null;
};

export async function getRentalDetail(id: string): Promise<RentalDetailResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, data: null };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, data: null };
    }

    return { success: true, data: result.data };
  } catch {
    return { success: false, data: null };
  }
}

'use server';

import { cookies } from 'next/headers';
import { reviewSchema } from '../../_schemas/tenant/reviewSchema';
import type { IMyReview } from '@/lib/types';
import z from 'zod';

export type ReviewState = {
  success: boolean;
  message: string;
  errors?: {
    propertyId?: string[];
    rating?: string[];
    comment?: string[];
  };
};

export async function submitReview(
  prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'You must be logged in to submit a review.' };
  }

  const raw = {
    propertyId: formData.get('propertyId') as string,
    rating: Number(formData.get('rating')),
    comment: (formData.get('comment') as string) || undefined,
  };

  const validated = reviewSchema.safeParse(raw);

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);

    return {
      success: false,
      message: 'Validation failed',
      errors: {
        propertyId: tree.properties?.propertyId?.errors[0] ? [tree.properties.propertyId.errors[0]] : undefined,
        rating: tree.properties?.rating?.errors[0] ? [tree.properties.rating.errors[0]] : undefined,
        comment: tree.properties?.comment?.errors[0] ? [tree.properties.comment.errors[0]] : undefined,
      },
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${accessToken}`,
      },
      credentials: 'include',
      body: JSON.stringify(validated.data),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message || 'Failed to submit review.' };
    }

    return { success: true, message: 'Review submitted successfully!' };
  } catch {
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export type ReviewsMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ReviewsResult = {
  success: boolean;
  data: IMyReview[];
  meta: ReviewsMeta | null;
};

export async function getMyReviews(
  search?: string,
  page?: number,
  limit?: number,
  rating?: number,
  sortBy?: string
): Promise<ReviewsResult> {
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
    if (rating) params.set('rating', String(rating));
    if (sortBy) params.set('sortBy', sortBy);

    const url = `${process.env.BACKEND_API_URL}/api/reviews${params.toString() ? `?${params.toString()}` : ''}`;

    const res = await fetch(url, {
      headers: { Cookie: `accessToken=${accessToken}` },
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

'use server';

import { cookies } from 'next/headers';
import { reviewSchema } from '../../_schemas/tenant/reviewSchema';
import z from 'zod';

export type ReviewState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitReview(
  prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const values = {
    propertyId: formData.get('propertyId') as string,
    rating: Number(formData.get('rating')),
    comment: (formData.get('comment') as string) || undefined,
  };

  const validated = reviewSchema.safeParse(values);

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);
    const errors: Record<string, string> = {};
    for (const [key, value] of Object.entries(tree.properties || {})) {
      const val = value as { errors?: string[] };
      if (val.errors?.length) errors[key] = val.errors[0];
    }
    return { success: false, message: 'Please fix the validation errors.', errors };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'You must be logged in to submit a review.' };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(validated.data),
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message || 'Failed to submit review.' };
    }

    return { success: true, message: 'Review submitted successfully!' };
  } catch {
    return { success: false, message: 'Unable to connect to the server.' };
  }
}

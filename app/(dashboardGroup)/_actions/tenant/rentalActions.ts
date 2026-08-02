'use server';

import { cookies } from 'next/headers';
import { rentalRequestSchema } from '../../_schemas/tenant/rentalRequestSchema';
import { rentalUpdateSchema } from '../../_schemas/tenant/rentalUpdateSchema';
import z from 'zod';

export type RentalRequestState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function createRentalRequest(
  prevState: RentalRequestState,
  formData: FormData
): Promise<RentalRequestState> {
  const values = {
    propertyId: formData.get('propertyId') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    message: (formData.get('message') as string) || undefined,
  };

  const validated = rentalRequestSchema.safeParse(values);

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);

    const errors = {
      propertyId: tree.properties?.propertyId?.errors[0],
      startDate: tree.properties?.startDate?.errors[0],
      endDate: tree.properties?.endDate?.errors[0],
      message: tree.properties?.message?.errors[0],
    };

    return {
      success: false,
      message: 'Please fix the validation errors.',
      errors: errors as Record<string, string>,
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      message: 'You must be logged in to submit a rental request.',
    };
  }

  try {
    const payload = {
      propertyId: validated.data.propertyId,
      startDate: validated.data.startDate,
      endDate: validated.data.endDate,
      message: validated.data.message,
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Failed to submit rental request.',
      };
    }

    return {
      success: true,
      message: 'Rental request submitted successfully!',
    };
  } catch {
    return {
      success: false,
      message: 'Unable to connect to the server.',
    };
  }
}

export async function updateRentalRequest(
  rentalId: string,
  prevState: RentalRequestState,
  formData: FormData
): Promise<RentalRequestState> {
  const values = {
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    message: (formData.get('message') as string) || undefined,
  };

  const validated = rentalUpdateSchema.safeParse(values);

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);

    const errors = {
      startDate: tree.properties?.startDate?.errors[0],
      endDate: tree.properties?.endDate?.errors[0],
      message: tree.properties?.message?.errors[0],
    };

    return {
      success: false,
      message: 'Please fix the validation errors.',
      errors: errors as Record<string, string>,
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      message: 'You must be logged in to update a rental request.',
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${rentalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({
        startDate: validated.data.startDate,
        endDate: validated.data.endDate,
        message: validated.data.message,
      }),
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Failed to update rental request.',
      };
    }

    return {
      success: true,
      message: 'Rental request updated successfully!',
    };
  } catch {
    return {
      success: false,
      message: 'Unable to connect to the server.',
    };
  }
}

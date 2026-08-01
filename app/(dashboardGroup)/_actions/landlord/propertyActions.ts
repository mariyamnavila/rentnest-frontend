'use server';

import { cookies } from 'next/headers';
import { createPropertySchema } from '../../_schemas/landlord/createPropertySchema';
import z from 'zod';

export type CreatePropertyState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  propertyId?: string;
};

export type PropertyActionState = {
  success: boolean;
  message: string;
};

export async function createProperty(
  prevState: CreatePropertyState,
  formData: FormData
): Promise<CreatePropertyState> {
  const rawAmenities = formData.get('amenities') as string;
  const rawImages = formData.get('images') as string;

  const values = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    location: formData.get('location') as string,
    price: Number(formData.get('price')),
    categoryId: formData.get('categoryId') as string,
    amenities: rawAmenities ? rawAmenities.split(',').map((a) => a.trim()).filter(Boolean) : [],
    images: rawImages ? rawImages.split('\n').map((i) => i.trim()).filter(Boolean) : [],
  };

  const validated = createPropertySchema.safeParse(values);

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);

    const errors: Record<string, string> = {};
    for (const [key, value] of Object.entries(tree.properties || {})) {
      const val = value as { errors?: string[] };
      if (val.errors?.length) errors[key] = val.errors[0];
    }

    return {
      success: false,
      message: 'Please fix the validation errors.',
      errors,
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      message: 'You must be logged in to create a property.',
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
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
      return {
        success: false,
        message: result.message || 'Failed to create property.',
      };
    }

    return {
      success: true,
      message: 'Property created successfully!',
      propertyId: result.data.id,
    };
  } catch {
    return {
      success: false,
      message: 'Unable to connect to the server.',
    };
  }
}

export async function deleteProperty(propertyId: string): Promise<PropertyActionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'You must be logged in.' };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`, {
      method: 'DELETE',
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message || 'Failed to delete property.' };
    }

    return { success: true, message: 'Property deleted successfully.' };
  } catch {
    return { success: false, message: 'Unable to connect to the server.' };
  }
}

export async function togglePropertyAvailability(
  propertyId: string,
  isAvailable: boolean
): Promise<PropertyActionState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { success: false, message: 'You must be logged in.' };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}/availability`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ isAvailable }),
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, message: result.message || 'Failed to update availability.' };
    }

    return { success: true, message: `Property marked as ${isAvailable ? 'available' : 'unavailable'}.` };
  } catch {
    return { success: false, message: 'Unable to connect to the server.' };
  }
}

'use server';

import { cookies } from 'next/headers';

export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string | null;
  profileImage?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export async function getProfile(): Promise<{ success: boolean; data: ProfileUser | null }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: null };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
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

export async function updateProfile(data: { name?: string; phone?: string; profileImage?: string }): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, message: 'Not authenticated' };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Cookie: `accessToken=${accessToken}` },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, message: result.message || 'Failed to update profile' };

    return { success: true, message: 'Profile updated successfully' };
  } catch {
    return { success: false, message: 'An error occurred' };
  }
}

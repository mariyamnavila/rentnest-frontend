'use server';

import { cookies } from 'next/headers';

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  profileImage?: string | null;
  phone?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminStats = {
  totalUsers: number;
  totalTenants: number;
  totalLandlords: number;
  totalProperties: number;
  totalRentals: number;
  bannedUsers: number;
};

export async function getAllUsers(): Promise<{ success: boolean; data: AdminUser[] }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [] };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: [] };

    return { success: true, data: result.data || [] };
  } catch {
    return { success: false, data: [] };
  }
}

export async function toggleUserStatus(userId: string, currentStatus: string): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, message: 'Not authenticated' };

  const newStatus = currentStatus === 'BANNED' ? 'ACTIVE' : 'BANNED';

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      return { success: false, message: result.message || 'Failed to update user' };
    }

    return { success: true, message: `User ${newStatus === 'BANNED' ? 'banned' : 'unbanned'} successfully` };
  } catch {
    return { success: false, message: 'An error occurred' };
  }
}

export async function getAllProperties(): Promise<{ success: boolean; data: { total: number; available: number } }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: { total: 0, available: 0 } };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: { total: 0, available: 0 } };

    const properties = result.data || [];
    return {
      success: true,
      data: {
        total: properties.length,
        available: properties.filter((p: { isAvailable: boolean }) => p.isAvailable).length,
      },
    };
  } catch {
    return { success: false, data: { total: 0, available: 0 } };
  }
}

export async function getAllRentals(): Promise<{ success: boolean; data: { total: number; pending: number; approved: number; active: number } }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: { total: 0, pending: 0, approved: 0, active: 0 } };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: { total: 0, pending: 0, approved: 0, active: 0 } };

    const rentals = result.data || [];
    return {
      success: true,
      data: {
        total: rentals.length,
        pending: rentals.filter((r: { status: string }) => r.status === 'PENDING').length,
        approved: rentals.filter((r: { status: string }) => r.status === 'APPROVED').length,
        active: rentals.filter((r: { status: string }) => r.status === 'ACTIVE').length,
      },
    };
  } catch {
    return { success: false, data: { total: 0, pending: 0, approved: 0, active: 0 } };
  }
}

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
  activeUsers: number;
  bannedUsers: number;
  totalProperties: number;
  activeRentals: number;
  totalRevenue: number;
};

export type AdminUserMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function getAllUsers(search?: string, page?: number, limit?: number): Promise<{ success: boolean; data: AdminUser[]; meta: AdminUserMeta | null }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [], meta: null };

  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));

    const url = `${process.env.BACKEND_API_URL}/api/admin/users${params.toString() ? `?${params.toString()}` : ''}`;

    const res = await fetch(url, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: [], meta: null };

    return { success: true, data: result.data || [], meta: result.meta || null };
  } catch {
    return { success: false, data: [], meta: null };
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

export async function getAdminStats(): Promise<{ success: boolean; data: AdminStats | null }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: null };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/stats`, {
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

import type { IProperty, IRentalRequest } from '@/lib/types';

export type AdminProperty = IProperty;
export type AdminRental = IRentalRequest;

export async function getAdminProperties(
  search?: string,
  page?: number,
  limit?: number,
  categoryId?: string,
  isAvailable?: string,
  sortBy?: string
): Promise<{ success: boolean; data: AdminProperty[]; meta: AdminUserMeta | null }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [], meta: null };

  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (categoryId) params.set('categoryId', categoryId);
    if (isAvailable) params.set('isAvailable', isAvailable);
    if (sortBy) params.set('sortBy', sortBy);

    const url = `${process.env.BACKEND_API_URL}/api/admin/properties${params.toString() ? `?${params.toString()}` : ''}`;

    const res = await fetch(url, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: [], meta: null };

    return { success: true, data: result.data || [], meta: result.meta || null };
  } catch {
    return { success: false, data: [], meta: null };
  }
}

export async function getAdminRentals(
  search?: string,
  page?: number,
  limit?: number,
  status?: string,
  sortBy?: string
): Promise<{ success: boolean; data: AdminRental[]; meta: AdminUserMeta | null }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [], meta: null };

  try {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (page) params.set('page', String(page));
    if (limit) params.set('limit', String(limit));
    if (status) params.set('status', status);
    if (sortBy) params.set('sortBy', sortBy);

    const url = `${process.env.BACKEND_API_URL}/api/admin/rentals${params.toString() ? `?${params.toString()}` : ''}`;

    const res = await fetch(url, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: [], meta: null };

    return { success: true, data: result.data || [], meta: result.meta || null };
  } catch {
    return { success: false, data: [], meta: null };
  }
}

export type AdminCategory = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function getCategories(): Promise<{ success: boolean; data: AdminCategory[] }> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, { cache: 'no-store' });
    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, data: [] };
    return { success: true, data: result.data || [] };
  } catch {
    return { success: false, data: [] };
  }
}

export async function createCategory(name: string): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken) return { success: false, message: 'Not authenticated' };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: `accessToken=${accessToken}` },
      body: JSON.stringify({ name }),
    });
    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, message: result.message || 'Failed to create' };
    return { success: true, message: 'Category created' };
  } catch {
    return { success: false, message: 'An error occurred' };
  }
}

export async function updateCategory(id: string, name: string): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken) return { success: false, message: 'Not authenticated' };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Cookie: `accessToken=${accessToken}` },
      body: JSON.stringify({ name }),
    });
    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, message: result.message || 'Failed to update' };
    return { success: true, message: 'Category updated' };
  } catch {
    return { success: false, message: 'An error occurred' };
  }
}

export async function deleteCategory(id: string): Promise<{ success: boolean; message: string }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken) return { success: false, message: 'Not authenticated' };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories/${id}`, {
      method: 'DELETE',
      headers: { Cookie: `accessToken=${accessToken}` },
    });
    const result = await res.json();
    if (!res.ok || !result.success) return { success: false, message: result.message || 'Failed to delete' };
    return { success: true, message: 'Category deleted' };
  } catch {
    return { success: false, message: 'An error occurred' };
  }
}

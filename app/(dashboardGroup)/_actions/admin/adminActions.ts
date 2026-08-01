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

export type AdminProperty = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  landlordId: string;
  categoryId: string;
  category?: { id: string; name: string };
  landlord?: { id: string; name: string; email: string };
  reviews?: { id: string; rating: number }[];
  createdAt?: string;
};

export type AdminRental = {
  id: string;
  propertyId: string;
  tenantId: string;
  status: string;
  startDate: string;
  endDate: string;
  message?: string | null;
  createdAt?: string;
  tenant?: { id: string; name: string; email: string };
  property?: { id: string; title: string; price: number; location: string; images: string[]; landlord?: { name: string } };
  payments?: { id: string; amount: number; status: string }[];
};

export async function getAdminProperties(): Promise<{ success: boolean; data: AdminProperty[] }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [] };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties`, {
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

export async function getAdminRentals(): Promise<{ success: boolean; data: AdminRental[] }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return { success: false, data: [] };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
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

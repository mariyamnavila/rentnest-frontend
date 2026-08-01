'use server';

import { IProperty, ICategory } from '@/lib/types';

export type PropertyQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type PropertyMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PropertyResponse = {
  success: boolean;
  message: string;
  data: IProperty[];
  meta: PropertyMeta;
};

export type CategoryResponse = {
  success: boolean;
  message: string;
  data: ICategory[];
};

export type SinglePropertyResponse = {
  success: boolean;
  message: string;
  data: IProperty | null;
};

export async function getProperties(query: PropertyQuery): Promise<PropertyResponse> {
  const params = new URLSearchParams();

  if (query.page) params.set('page', query.page);
  if (query.limit) params.set('limit', query.limit);
  if (query.searchTerm) params.set('searchTerm', query.searchTerm);
  if (query.location) params.set('location', query.location);
  if (query.minPrice) params.set('minPrice', query.minPrice);
  if (query.maxPrice) params.set('maxPrice', query.maxPrice);
  if (query.categoryId) params.set('categoryId', query.categoryId);
  if (query.sortBy) params.set('sortBy', query.sortBy);
  if (query.sortOrder) params.set('sortOrder', query.sortOrder);

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
      { cache: 'no-store' }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Failed to fetch properties.',
        data: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
      };
    }

    return {
      success: true,
      message: result.message || 'Properties fetched successfully.',
      data: result.data || [],
      meta: result.meta || { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  } catch {
    return {
      success: false,
      message: 'Unable to connect to the server.',
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }
}

export async function getCategories(): Promise<CategoryResponse> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/categories`,
      { cache: 'no-store' }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Failed to fetch categories.',
        data: [],
      };
    }

    return {
      success: true,
      message: result.message || 'Categories fetched successfully.',
      data: result.data || [],
    };
  } catch {
    return {
      success: false,
      message: 'Unable to connect to the server.',
      data: [],
    };
  }
}

export async function getPropertyById(id: string): Promise<SinglePropertyResponse> {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties/${id}`,
      { cache: 'no-store' }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Property not found.',
        data: null,
      };
    }

    return {
      success: true,
      message: result.message || 'Property fetched successfully.',
      data: result.data || null,
    };
  } catch {
    return {
      success: false,
      message: 'Unable to connect to the server.',
      data: null,
    };
  }
}

import { z } from 'zod';

export const createPropertySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title is too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description is too long'),
  location: z.string().min(3, 'Location is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  categoryId: z.string().min(1, 'Category is required'),
  amenities: z.array(z.string()).min(1, 'Select at least one amenity'),
  images: z.array(z.string().url('Each image must be a valid URL')).min(1, 'Add at least one image URL'),
});

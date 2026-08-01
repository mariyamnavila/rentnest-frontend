import { z } from 'zod';

export const reviewSchema = z.object({
  propertyId: z.string().min(1, 'Property ID is required'),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  comment: z.string().max(500, 'Comment is too long').optional(),
});

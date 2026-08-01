import { z } from 'zod';

export const rentalUpdateSchema = z
  .object({
    startDate: z.string().min(1, 'Move-in date is required'),
    endDate: z.string().min(1, 'Move-out date is required'),
    message: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.endDate) > new Date(data.startDate);
      }
      return true;
    },
    {
      message: 'Move-out date must be after move-in date',
      path: ['endDate'],
    }
  );

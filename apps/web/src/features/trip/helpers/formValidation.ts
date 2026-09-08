import { z } from 'zod';

export type TTripFormValues = z.infer<typeof tripSchema>;
export const MAX_TRIP_IMAGES = 5;

export const tripSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long').max(100, 'Title is to long'),
  description: z.string().max(350, 'Description is to long').optional(),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  status: z.enum(['PLANNING', 'COMPLETED'], {
    required_error: 'Status is required',
  }),
  images: z.array(z.instanceof(File)).max(5, `Maximum ${MAX_TRIP_IMAGES} images allowed`).default([]),
});

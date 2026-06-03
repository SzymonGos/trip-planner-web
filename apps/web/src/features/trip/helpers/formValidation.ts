import { z } from 'zod';

export const tripSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long').max(100, 'Title is to long'),
  description: z.string().max(350, 'Description is to long').optional(),
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  status: z.enum(['planning', 'completed'], {
    required_error: 'Status is required',
  }),
  images: z
    .array(
      z.union([
        z.instanceof(File),
        z.object({
          id: z.string(),
          image: z.object({
            id: z.string(),
            filename: z.string(),
          }),
        }),
      ]),
    )
    .max(5, 'Maximum 5 images allowed')
    .optional(),
});

import { z } from 'zod';

export const userSettingsSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters long').max(15, 'Username is too long'),
  email: z.string().email('Invalid email address'),
  profileImage: z.instanceof(File).optional(),
});

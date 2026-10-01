import { z } from 'zod';

export const PhoneSchema = z.string()
  .trim()
  .min(10, 'Phone number must be at least 10 characters')
  .max(20, 'Phone number too long')
  .refine((val) => {
    // If it starts with +91, strictly validate India format
    if (val.startsWith('+91')) {
      const numeric = val.replace(/\D/g, '');
      return numeric.length === 12 && /^(91)[6-9]\d{9}$/.test(numeric);
    }
    // Otherwise general E.164-ish check
    return /^\+?[1-9]\d{1,14}$/.test(val.replace(/[\s-]/g, ''));
  }, 'Invalid phone number format');

export const BookingRequestSchema = z.object({
  roomTypeSlug: z.string().trim().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  adults: z.number().int().min(1).max(10),
  children: z.number().int().min(0).max(10),
  guestName: z.string().trim().min(2).max(100),
  guestEmail: z.string().trim().email().max(255),
  guestPhone: PhoneSchema,
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

import { describe, it, expect } from 'vitest';
import { PhoneSchema, BookingRequestSchema } from '../src/lib/schema';

describe('Zod Schemas', () => {
  it('should strictly validate +91 phone numbers', () => {
    expect(PhoneSchema.safeParse('+91 99290-40000').success).toBe(true);
    expect(PhoneSchema.safeParse('+91 59290-40000').success).toBe(false); // starts with 5
    expect(PhoneSchema.safeParse('+9199290400001').success).toBe(false); // too long
  });

  it('should loosely validate international numbers', () => {
    expect(PhoneSchema.safeParse('+1 555-0123').success).toBe(true);
    expect(PhoneSchema.safeParse('+44 20 7123 1234').success).toBe(true);
  });

  it('should trim string inputs', () => {
    const res = BookingRequestSchema.safeParse({
      roomTypeSlug: ' deluxe ',
      checkIn: '2026-11-01',
      checkOut: '2026-11-05',
      adults: 2,
      children: 0,
      guestName: '  John Doe  ',
      guestEmail: ' john@example.com ',
      guestPhone: '+91 99290 40000'
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.roomTypeSlug).toBe('deluxe');
      expect(res.data.guestName).toBe('John Doe');
      expect(res.data.guestEmail).toBe('john@example.com');
    }
  });
});

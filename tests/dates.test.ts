import { describe, it, expect } from 'vitest';
import { isValidBookingDateRange } from '../src/lib/dates';

describe('Date Utilities (IST)', () => {
  it('should validate valid date ranges', () => {
    // Assuming today is 2026-10-02
    const checkIn = '2026-11-01';
    const checkOut = '2026-11-02';
    expect(isValidBookingDateRange(checkIn, checkOut)).toBe(true);
  });

  it('should reject check-out before or on check-in', () => {
    expect(isValidBookingDateRange('2026-11-01', '2026-11-01')).toBe(false);
    expect(isValidBookingDateRange('2026-11-02', '2026-11-01')).toBe(false);
  });
});

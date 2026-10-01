import { describe, it, expect } from 'vitest';
import { buildWhatsAppMessage } from '../src/lib/whatsapp';

describe('buildWhatsAppMessage', () => {
  it('should encode a basic inquiry', () => {
    const url = buildWhatsAppMessage({
      roomType: 'Deluxe Room',
    });
    expect(url).toContain('https://wa.me/919929040000');
    expect(url).toContain('text=Hello!%20I%20am%20interested%20in%20the%20Deluxe%20Room');
  });

  it('should encode all fields including dates and guests', () => {
    const url = buildWhatsAppMessage({
      roomType: 'Super Deluxe',
      checkIn: '2026-11-01',
      checkOut: '2026-11-05',
      adults: 2,
      children: 1
    });
    expect(url).toContain('text=Hello!%20I%20am%20interested%20in%20the%20Super%20Deluxe');
    expect(url).toContain('Check-in%3A%202026-11-01');
    expect(url).toContain('Check-out%3A%202026-11-05');
    expect(url).toContain('Guests%3A%202%20Adults%2C%201%20Children');
  });

  it('should limit string lengths to prevent abuse', () => {
    const longRoom = 'A'.repeat(500);
    const url = buildWhatsAppMessage({ roomType: longRoom });
    const encodedA = encodeURIComponent('A'.repeat(100)); // Should truncate
    expect(url).toContain(encodedA);
    expect(url.length).toBeLessThan(1000);
  });
});

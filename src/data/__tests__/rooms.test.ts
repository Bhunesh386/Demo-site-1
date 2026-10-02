import { describe, it, expect } from 'vitest';
import { rooms } from '../rooms';

describe('rooms mock data', () => {
  it('exports an array of rooms with the correct structure', () => {
    expect(Array.isArray(rooms)).toBe(true);
    expect(rooms.length).toBeGreaterThan(0);
    
    rooms.forEach(room => {
      expect(room).toHaveProperty('id');
      expect(typeof room.id).toBe('string');
      
      expect(room).toHaveProperty('name');
      expect(typeof room.name).toBe('string');
      
      expect(room).toHaveProperty('pricePerNight');
      expect(typeof room.pricePerNight).toBe('number');
      
      expect(room).toHaveProperty('capacity');
      expect(typeof room.capacity.adults).toBe('number');
      expect(typeof room.capacity.children).toBe('number');
      
      expect(room).toHaveProperty('image');
      expect(typeof room.image).toBe('string');
      
      expect(room).toHaveProperty('amenities');
      expect(Array.isArray(room.amenities)).toBe(true);
    });
  });
});

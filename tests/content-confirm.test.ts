import { describe, it, expect } from 'vitest';
import { rooms } from '../src/content/rooms';
import { siteConfig } from '../src/config/site';

// Helper to recursively search for [CONFIRM]
function hasConfirmFlag(obj: unknown): boolean {
  if (typeof obj === 'string') return obj.includes('[CONFIRM]');
  if (Array.isArray(obj)) return obj.some(hasConfirmFlag);
  if (obj !== null && typeof obj === 'object') {
    return Object.values(obj).some(hasConfirmFlag);
  }
  return false;
}

describe('Content Confirm Flags', () => {
  it('should not contain unresolved [CONFIRM] flags in production', () => {
    const isProd = process.env.NODE_ENV === 'production' || process.env.CI_ENV === 'production';
    
    if (isProd) {
      expect(hasConfirmFlag(rooms)).toBe(false);
      expect(hasConfirmFlag(siteConfig)).toBe(false);
    } else {
      // In dev/test, just assert it runs and maybe logs a warning
      expect(true).toBe(true);
    }
  });
});

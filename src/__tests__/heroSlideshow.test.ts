import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getWrappedIndex, shouldAutoAdvance } from '../utils/slideshowLogic';

describe('HeroSlideshow Logic', () => {
  describe('getWrappedIndex', () => {
    it('wraps around to the end when going previous from 0', () => {
      expect(getWrappedIndex(-1, 5)).toBe(4);
    });

    it('wraps around to the start when going next from the last index', () => {
      expect(getWrappedIndex(5, 5)).toBe(0);
    });

    it('returns the correct index for normal progression', () => {
      expect(getWrappedIndex(2, 5)).toBe(2);
      expect(getWrappedIndex(3, 5)).toBe(3);
    });

    it('handles multiple wrap-arounds', () => {
      expect(getWrappedIndex(-6, 5)).toBe(4);
      expect(getWrappedIndex(11, 5)).toBe(1);
    });

    it('returns 0 if total is 0 or less', () => {
      expect(getWrappedIndex(1, 0)).toBe(0);
      expect(getWrappedIndex(1, -1)).toBe(0);
    });
  });

  describe('shouldAutoAdvance (Autoplay pause/resume and reduced-motion)', () => {
    it('returns true when visible, not paused, normal motion, and multiple slides', () => {
      expect(shouldAutoAdvance(true, false, false, 5)).toBe(true);
    });

    it('returns false when paused', () => {
      expect(shouldAutoAdvance(true, true, false, 5)).toBe(false);
    });

    it('returns false when not visible', () => {
      expect(shouldAutoAdvance(false, false, false, 5)).toBe(false);
    });

    it('returns false when reduced-motion is preferred', () => {
      expect(shouldAutoAdvance(true, false, true, 5)).toBe(false);
    });

    it('returns false when there is only 1 slide', () => {
      expect(shouldAutoAdvance(true, false, false, 1)).toBe(false);
    });

    it('returns false when there are 0 slides', () => {
      expect(shouldAutoAdvance(true, false, false, 0)).toBe(false);
    });
  });
});

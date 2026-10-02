export function getWrappedIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export function shouldAutoAdvance(
  isVisible: boolean,
  isPaused: boolean,
  isReducedMotion: boolean,
  totalSlides: number
): boolean {
  if (!isVisible) return false;
  if (isPaused) return false;
  if (isReducedMotion) return false;
  if (totalSlides <= 1) return false;
  return true;
}

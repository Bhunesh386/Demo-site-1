import { test, expect } from '@playwright/test';

const pagesToCheck = [
  '/',
  '/about',
  '/rooms',
  '/rooms/deluxe',
  '/rooms/super-deluxe',
  '/rooms/ratnawali-royal-suite',
  '/contact'
];

for (const path of pagesToCheck) {
  test(`images are visible and loaded on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const brokenImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .filter(img => {
          if (img.width > 0 && img.width < 50) return false;
          
          const style = window.getComputedStyle(img);
          const parentStyle = window.getComputedStyle(img.parentElement || document.body);
          
          if (style.opacity === '0' && parentStyle.opacity === '0') return true;
          if (style.visibility === 'hidden') return true;
          if (parentStyle.height === '0px' && style.position === 'absolute') return true;
          if (img.naturalWidth === 0) return true;
          
          return false;
        })
        .map(img => img.src);
    });

    expect(brokenImages).toEqual([]);
  });
}

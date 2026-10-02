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
    // Wait for network and any initial gallery setup
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const images = page.locator('img');
    const count = await images.count();
    
    // Evaluate images inside the page context
    const brokenImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .filter(img => {
          // ignore tracking pixels or tiny icons if any (width < 50)
          if (img.width > 0 && img.width < 50) return false;
          
          const style = window.getComputedStyle(img);
          const parentStyle = window.getComputedStyle(img.parentElement || document.body);
          
          // Check for opacity 0 on image or parent, visibility hidden, or 0 height on parent if fill
          if (style.opacity === '0' && parentStyle.opacity === '0') return true;
          if (style.visibility === 'hidden') return true;
          
          // Check if parent collapsed (height 0) while img is absolute
          if (parentStyle.height === '0px' && style.position === 'absolute') return true;
          
          // Check if naturalWidth is 0 (failed to load)
          if (img.naturalWidth === 0) return true;
          
          return false;
        })
        .map(img => img.src);
    });

    expect(brokenImages).toEqual([]);
  });
}

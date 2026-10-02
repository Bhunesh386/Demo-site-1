import { test, expect } from '@playwright/test';

test.describe('Hero Slideshow', () => {
  test('Home page loads, slide 1 headline visible', async ({ page }) => {
    await page.goto('/');
    
    const slide1Headline = page.getByRole('heading', { name: 'A Quiet Sanctuary.' });
    await expect(slide1Headline).toBeVisible();
  });

  test('Slide advances after interval', async ({ page }) => {
    // Note: page.clock is not available in Playwright 1.42.0, so we wait real time
    await page.goto('/');
    
    const slide1Headline = page.getByRole('heading', { name: 'A Quiet Sanctuary.' });
    await expect(slide1Headline).toBeVisible();
    
    const slide2Headline = page.getByRole('heading', { name: 'Heritage Woven in Stone.' });
    
    // Wait for the interval (6000ms) + buffer
    await page.waitForTimeout(6500);
    
    await expect(slide2Headline).toBeVisible();
  });

  test('Clicking dot 2 changes to slide 2', async ({ page }) => {
    await page.goto('/');
    
    const slide2Headline = page.getByRole('heading', { name: 'Heritage Woven in Stone.' });
    const dot2 = page.getByRole('button', { name: 'Go to slide 2' });
    
    await dot2.click();
    await expect(slide2Headline).toBeVisible();
  });

  test('Prev/Next buttons work', async ({ page }) => {
    await page.goto('/');
    
    const nextBtn = page.getByRole('button', { name: 'Next slide' });
    const prevBtn = page.getByRole('button', { name: 'Previous slide' });
    
    const slide2Headline = page.getByRole('heading', { name: 'Heritage Woven in Stone.' });
    const lastSlideHeadline = page.getByRole('heading', { name: 'Culinary Traditions Kept Alive.' });
    
    // Click Next -> should be on slide 2
    await nextBtn.click();
    await expect(slide2Headline).toBeVisible();
    
    // Click Prev -> should be on slide 1
    await prevBtn.click();
    const slide1Headline = page.getByRole('heading', { name: 'A Quiet Sanctuary.' });
    await expect(slide1Headline).toBeVisible();
    
    // Click Prev again -> should wrap around to the last slide (slide 5)
    await prevBtn.click();
    await expect(lastSlideHeadline).toBeVisible();
  });

  test('With reducedMotion: reduce — no autoplay', async ({ page }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    
    const slide1Headline = page.getByRole('heading', { name: 'A Quiet Sanctuary.' });
    await expect(slide1Headline).toBeVisible();
    
    // Wait for the interval (6000ms) + buffer
    await page.waitForTimeout(6500);
    
    // Slide 1 should still be visible because autoplay is disabled
    await expect(slide1Headline).toBeVisible();
    
    const slide2Headline = page.getByRole('heading', { name: 'Heritage Woven in Stone.' });
    await expect(slide2Headline).not.toBeVisible();
  });
});

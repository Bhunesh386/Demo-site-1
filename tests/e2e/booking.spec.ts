import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test('should navigate to room and display booking widget', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Check Hero CTA
    await expect(page.locator('text=Check Availability')).toBeVisible();

    // Go to Deluxe room page
    await page.goto('/rooms/deluxe');
    
    // Check Widget is loaded
    await expect(page.locator('text=Request Reservation')).toBeVisible();
    await expect(page.locator('text=Continue to WhatsApp')).toBeVisible();
  });
});

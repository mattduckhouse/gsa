import { test, expect } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('/Wearables/Points/UserDetails?id=1&PartnerId=1');
});

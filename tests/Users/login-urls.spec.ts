import { test, expect } from '@playwright/test';
import { gotoUsers, runSearch } from './helpers';

test.describe('Users – Show Login URLs Toggle', () => {

  test('Login Url and Iframe Url columns are hidden by default', async ({ page }) => {
    await gotoUsers(page);
    await runSearch(page);

    const headerRow = page.locator('table[aria-label="User list"] thead tr');

    // The column headers exist in the DOM but their parent <th> should not be visible
    // DataTables sets display:none on hidden column headers
    const loginUrlHeader   = headerRow.locator('th', { hasText: 'Login Url' });
    const iframeUrlHeader  = headerRow.locator('th', { hasText: 'Iframe Url' });

    await expect(loginUrlHeader).not.toBeVisible();
    await expect(iframeUrlHeader).not.toBeVisible();
  });

  test('Checking Show Login Urls makes both URL columns visible', async ({ page }) => {
    await gotoUsers(page);
    await runSearch(page);

    await page.locator('#ShowLogins').check();

    const headerRow = page.locator('table[aria-label="User list"] thead tr');
    await expect(headerRow.locator('th', { hasText: 'Login Url' })).toBeVisible();
    await expect(headerRow.locator('th', { hasText: 'Iframe Url' })).toBeVisible();
  });

  test('Unchecking Show Login Urls hides both URL columns again', async ({ page }) => {
    await gotoUsers(page);
    await runSearch(page);

    // Enable…
    await page.locator('#ShowLogins').check();

    const headerRow = page.locator('table[aria-label="User list"] thead tr');
    await expect(headerRow.locator('th', { hasText: 'Login Url' })).toBeVisible();

    // …then disable
    await page.locator('#ShowLogins').uncheck();

    await expect(headerRow.locator('th', { hasText: 'Login Url' })).not.toBeVisible();
    await expect(headerRow.locator('th', { hasText: 'Iframe Url' })).not.toBeVisible();
  });

});

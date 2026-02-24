import { test, expect } from '@playwright/test';
import { gotoUsers, PARTNER_ID } from './helpers';

test.describe('Users – Action Buttons Navigation', () => {

  test('Add user button navigates to EditUser with Id=-1', async ({ page }) => {
    await gotoUsers(page);

    await page.locator('.add-user-btn').click();

    await page.waitForURL(url => url.pathname.includes('EditUser'), { timeout: 10000 });
    expect(page.url()).toContain('Id=-1');
    expect(page.url()).toContain(`PartnerId=${PARTNER_ID}`);
  });

  test('Import users button navigates to ImportUsers page', async ({ page }) => {
    await gotoUsers(page);

    await page.locator('.import-users-btn').click();

    await page.waitForURL(url => url.pathname.includes('ImportUsers'), { timeout: 10000 });
    expect(page.url()).toContain(`PartnerId=${PARTNER_ID}`);
  });

  test('Import Points button navigates to ImportUsers with points=true', async ({ page }) => {
    await gotoUsers(page);

    await page.locator('.import-points-btn').click();

    await page.waitForURL(url => url.pathname.includes('ImportUsers'), { timeout: 10000 });
    expect(page.url()).toContain('points=true');
    expect(page.url()).toContain(`PartnerId=${PARTNER_ID}`);
  });

  test('Export button triggers an Excel file download', async ({ page }) => {
    await gotoUsers(page);

    // Perform a search first so the table has data to export
    await page.locator('#search-button').click();
    await page.waitForTimeout(2000); // allow DataTable to populate

    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 15000 }),
      page.locator('#exportButton').click(),
    ]);

    expect(download.suggestedFilename()).toMatch(/Users.*\.xlsx$/i);
  });

});

import { test, expect } from '@playwright/test';
import { gotoUsers, runSearch, PARTNER_ID } from './helpers';

test.describe('Users – Results Table', () => {

  test('Empty search returns rows in the table', async ({ page }) => {
    await gotoUsers(page);
    await runSearch(page);

    const tbody = page.locator('table[aria-label="User list"] tbody');
    const rows = tbody.locator('tr');
    await expect(rows.first()).toBeVisible({ timeout: 15000 });
  });

  test('Searching by email filters the results', async ({ page }) => {
    await gotoUsers(page);

    // First do an empty search to get some rows, then grab the first email
    await runSearch(page);
    const firstEmailCell = page.locator('table[aria-label="User list"] tbody tr').first()
                                .locator('td').nth(3);
    const emailText = await firstEmailCell.textContent();
    if (!emailText) {
      test.skip(); // no data available — skip rather than fail
      return;
    }

    // Now search for that email
    const partial = emailText.substring(0, Math.min(5, emailText.length));
    await page.locator('#emailAddress').fill(partial);
    await runSearch(page);

    const tbody = page.locator('table[aria-label="User list"] tbody');
    const rows = tbody.locator('tr');
    await expect(rows.first()).toBeVisible({ timeout: 15000 });
    // All visible email cells should contain the search term
    const emailCells = rows.locator('td').nth(3);
    const count = await rows.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const cellText = await rows.nth(i).locator('td').nth(3).textContent();
      expect(cellText?.toLowerCase()).toContain(partial.toLowerCase());
    }
  });

  test('User name in results is a link to EditUser', async ({ page }) => {
    await gotoUsers(page);
    await runSearch(page);

    // The Name column (index 1) renders an <a> pointing to EditUser
    const firstNameLink = page.locator('table[aria-label="User list"] tbody tr').first()
                               .locator('td').nth(1).locator('a');
    await expect(firstNameLink).toBeVisible({ timeout: 15000 });

    const href = await firstNameLink.getAttribute('href');
    expect(href).toContain('EditUser');
  });

  test('Clicking a user name navigates to EditUser', async ({ page }) => {
    await gotoUsers(page);
    await runSearch(page);

    const firstNameLink = page.locator('table[aria-label="User list"] tbody tr').first()
                               .locator('td').nth(1).locator('a');
    await firstNameLink.waitFor({ timeout: 15000 });
    await firstNameLink.click();

    await page.waitForURL(url => url.pathname.includes('EditUser'), { timeout: 10000 });
    expect(page.url()).toContain('id=');
    expect(page.url()).toContain(`PartnerId=${PARTNER_ID}`);
  });

  test('Per-row Options dropdown contains "Edit user"', async ({ page }) => {
    await gotoUsers(page);
    await runSearch(page);

    // Click the "..." dropdown button in the first result row
    const firstRow = page.locator('table[aria-label="User list"] tbody tr').first();
    await firstRow.waitFor({ timeout: 15000 });
    await firstRow.locator('button[data-bs-toggle="dropdown"]').click();

    const editItem = firstRow.locator('.dropdown-item', { hasText: 'Edit user' });
    await expect(editItem).toBeVisible();
  });

  test('Clicking "Edit user" in the Options dropdown navigates to EditUser', async ({ page }) => {
    await gotoUsers(page);
    await runSearch(page);

    const firstRow = page.locator('table[aria-label="User list"] tbody tr').first();
    await firstRow.waitFor({ timeout: 15000 });
    await firstRow.locator('button[data-bs-toggle="dropdown"]').click();

    await firstRow.locator('.dropdown-item', { hasText: 'Edit user' }).click();

    await page.waitForURL(url => url.pathname.includes('EditUser'), { timeout: 10000 });
    expect(page.url()).toContain(`PartnerId=${PARTNER_ID}`);
  });

});

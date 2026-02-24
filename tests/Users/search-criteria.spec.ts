import { test, expect } from '@playwright/test';
import { gotoUsers, runSearch } from './helpers';

test.describe('Users – Search Criteria Controls', () => {

  test('Email address field accepts typed input', async ({ page }) => {
    await gotoUsers(page);

    const email = page.locator('#emailAddress');
    await email.fill('test@example.com');

    await expect(email).toHaveValue('test@example.com');
  });

  test('Clicking Search button triggers a DataTable reload', async ({ page }) => {
    await gotoUsers(page);

    // Intercept the AJAX POST to UsersAjax to confirm it is called
    const searchRequest = page.waitForRequest(req =>
      req.url().includes('UsersAjax') && req.method() === 'POST',
      { timeout: 10000 }
    );

    await page.locator('#search-button').click();

    await searchRequest; // resolves if the AJAX call fires
  });

  test('Pressing Enter in the email field triggers a search', async ({ page }) => {
    await gotoUsers(page);

    const searchRequest = page.waitForRequest(req =>
      req.url().includes('UsersAjax') && req.method() === 'POST',
      { timeout: 10000 }
    );

    await page.locator('#emailAddress').fill('anything');
    await page.locator('#emailAddress').press('Enter');

    await searchRequest;
  });

  test('Status dropdown has the expected options', async ({ page }) => {
    await gotoUsers(page);

    const status = page.locator('#status');
    await expect(status).toBeVisible();

    const options = status.locator('option');
    await expect(options.filter({ hasText: /^All$/ })).toHaveCount(1);
    await expect(options.filter({ hasText: /^Active$/ })).toHaveCount(1);
    await expect(options.filter({ hasText: /^Inactive$/ })).toHaveCount(1);
  });

  test('Limit dropdown has the expected four options', async ({ page }) => {
    await gotoUsers(page);

    const limit = page.locator('#recordLimit');
    await expect(limit).toBeVisible();

    const options = limit.locator('option');
    await expect(options.filter({ hasText: '1,000' })).toHaveCount(1);
    await expect(options.filter({ hasText: '5,000' })).toHaveCount(1);
    await expect(options.filter({ hasText: '10,000' })).toHaveCount(1);
    await expect(options.filter({ hasText: 'All' })).toHaveCount(1);
  });

  test('Search button is labelled "Search"', async ({ page }) => {
    await gotoUsers(page);

    await expect(page.locator('#search-button')).toHaveText('Search');
  });

});

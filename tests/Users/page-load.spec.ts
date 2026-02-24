import { test, expect } from '@playwright/test';
import { gotoUsers, PARTNER_ID } from './helpers';

test.describe('Users – Page Load', () => {

  test('Page loads and does not redirect to login', async ({ page }) => {
    await gotoUsers(page);

    await expect(page).not.toHaveURL(/login/i);
  });

  test('Heading includes the partner name', async ({ page }) => {
    await gotoUsers(page);

    // Heading format is "Users : <PartnerName>"
    const heading = page.getByRole('heading', { level: 3 });
    await expect(heading).toContainText('Users');
  });

  test('Partner-scoped page hides the partner dropdown', async ({ page }) => {
    await gotoUsers(page);

    // When a PartnerId is provided the partner <select> is replaced with a hidden input
    await expect(page.locator('select#partnerId')).toHaveCount(0);
  });

  test('Action buttons are visible in partner-scoped mode', async ({ page }) => {
    await gotoUsers(page);

    await expect(page.locator('.add-user-btn')).toBeVisible();
    await expect(page.locator('.import-users-btn')).toBeVisible();
    await expect(page.locator('.import-points-btn')).toBeVisible();
    await expect(page.locator('#exportButton')).toBeVisible();
  });

  test('DataTable is rendered with expected column headers', async ({ page }) => {
    await gotoUsers(page);

    const table = page.locator('table[aria-label="User list"]');
    await expect(table).toBeVisible();

    const headerRow = table.locator('thead tr');
    await expect(headerRow).toContainText('Name');
    await expect(headerRow).toContainText('Email');
    await expect(headerRow).toContainText('Status');
    await expect(headerRow).toContainText('Level');
    await expect(headerRow).toContainText('Last Login');
    await expect(headerRow).toContainText('Options');
  });

  test('Search criteria card is visible with correct heading', async ({ page }) => {
    await gotoUsers(page);

    const card = page.locator('.card-header').filter({ hasText: 'User search criteria' });
    await expect(card).toBeVisible();
  });

});

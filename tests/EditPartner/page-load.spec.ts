import { test, expect } from '@playwright/test';
import { PARTNER_ID, EDIT_PARTNER_URL, gotoEditPartner } from './helpers';

test.describe('Details page – Page Load & Navigation', () => {

  test('Details link is the 2nd sidebar item and navigates correctly', async ({ page }) => {
    await page.goto(`/Partners/Dashboard?PartnerId=${PARTNER_ID}`);

    const navSection = page.locator('.navbar-nav');
    await expect(navSection).toBeVisible();

    // The 2nd nav-link inside the Current partner section is "Details"
    const detailsLink = navSection.getByRole('link', { name: 'Details' });
    await expect(detailsLink).toBeVisible();

    await detailsLink.click();

    await expect(page).toHaveURL(new RegExp(`/Partners/EditPartner\\?PartnerId=${PARTNER_ID}`));
    await expect(page.getByRole('heading', { level: 3 })).toContainText('Edit partner:');
  });

  test('Page renders with all expected tabs', async ({ page }) => {
    await gotoEditPartner(page);

    const tabs = ['Main', 'Levels', 'Socials', 'I18N', 'Level Mapping', 'Options', 'Integrations', 'AI Search/Meta', 'AI Swim Lanes'];
    for (const tab of tabs) {
      await expect(page.getByRole('link', { name: tab, exact: true })).toBeVisible();
    }

    // Main tab is active by default
    await expect(page.locator('#tab-main')).toHaveClass(/show active/);
  });

  test('Save, Cancel, Clone Partner and Clone Points buttons are present', async ({ page }) => {
    await gotoEditPartner(page);

    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clone Partner' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clone Points from Another Partner' })).toBeVisible();
  });

});

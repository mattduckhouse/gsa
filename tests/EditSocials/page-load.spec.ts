import { test, expect } from '@playwright/test';
import { gotoEditSocials, PARTNER_ID } from './helpers';

test.describe('Social Media – Page Load', () => {

  test('Page loads with correct heading', async ({ page }) => {
    await gotoEditSocials(page);

    await expect(page).not.toHaveURL(/login/i);
    await expect(page.getByRole('heading', { level: 3 })).toContainText('Edit partner:');
  });

  test('All six social media fields are visible', async ({ page }) => {
    await gotoEditSocials(page);

    await expect(page.locator('input[name="SocialFacebook"]')).toBeVisible();
    await expect(page.locator('input[name="SocialInstagram"]')).toBeVisible();
    await expect(page.locator('input[name="SocialTiktok"]')).toBeVisible();
    await expect(page.locator('input[name="SocialLinkedIn"]')).toBeVisible();
    await expect(page.locator('input[name="SocialTwitter"]')).toBeVisible();
    await expect(page.locator('input[name="SocialYoutube"]')).toBeVisible();
  });

  test('Save and Cancel buttons are present', async ({ page }) => {
    await gotoEditSocials(page);

    await expect(page.locator('#saveButton')).toBeVisible();
    await expect(page.locator('#cancelButton')).toBeVisible();
  });

});

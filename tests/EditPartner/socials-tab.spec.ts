import { test, expect } from '@playwright/test';
import { gotoEditPartner, clickTab } from './helpers';

test.describe('Details page – Socials Tab', () => {

  test('Social media fields are visible', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Socials');

    await expect(page.locator('input[name="SocialFacebook"]')).toBeVisible();
    await expect(page.locator('input[name="SocialInstagram"]')).toBeVisible();
    await expect(page.locator('input[name="SocialTiktok"]')).toBeVisible();
    await expect(page.locator('input[name="SocialLinkedIn"]')).toBeVisible();
    await expect(page.locator('input[name="SocialTwitter"]')).toBeVisible();
    await expect(page.locator('input[name="SocialYoutube"]')).toBeVisible();
  });

  test('Social media URL fields accept and save values', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Socials');

    const fbInput = page.locator('input[name="SocialFacebook"]');
    const testUrl = 'https://facebook.com/test-e2e-partner';
    await fbInput.fill(testUrl);
    await expect(fbInput).toHaveValue(testUrl);

    await page.locator('#saveButton').click();
    await expect(page.locator('body')).not.toContainText('An error occurred');

    // Verify value persisted after reload
    await gotoEditPartner(page);
    await clickTab(page, 'Socials');
    await expect(page.locator('input[name="SocialFacebook"]')).toHaveValue(testUrl);
  });

});

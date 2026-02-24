import { test, expect } from '@playwright/test';
import { gotoEditSocials, PARTNER_ID } from './helpers';

test.describe('Social Media – Save Behaviour', () => {

  test('Saving valid URLs redirects to Dashboard', async ({ page }) => {
    await gotoEditSocials(page);

    await page.locator('input[name="SocialFacebook"]').fill('https://facebook.com/test-partner');
    await page.locator('input[name="SocialInstagram"]').fill('https://instagram.com/test-partner');

    await page.locator('#saveButton').click();

    await expect(page).toHaveURL(new RegExp(`/Partners/Dashboard\\?PartnerId=${PARTNER_ID}`));
  });

  test('Saved Facebook and Instagram URLs persist after reload', async ({ page }) => {
    await gotoEditSocials(page);

    await page.locator('input[name="SocialFacebook"]').fill('https://facebook.com/test-partner');
    await page.locator('input[name="SocialInstagram"]').fill('https://instagram.com/test-partner');
    await page.locator('#saveButton').click();

    await page.waitForURL(/Dashboard/);
    await gotoEditSocials(page);

    await expect(page.locator('input[name="SocialFacebook"]')).toHaveValue('https://facebook.com/test-partner');
    await expect(page.locator('input[name="SocialInstagram"]')).toHaveValue('https://instagram.com/test-partner');
  });

  test('Saving all six social fields persists all values', async ({ page }) => {
    await gotoEditSocials(page);

    const fields = [
      { name: 'SocialFacebook',  value: 'https://facebook.com/all-test' },
      { name: 'SocialInstagram', value: 'https://instagram.com/all-test' },
      { name: 'SocialTiktok',    value: 'https://tiktok.com/@all-test' },
      { name: 'SocialLinkedIn',  value: 'https://linkedin.com/company/all-test' },
      { name: 'SocialTwitter',   value: 'https://x.com/all-test' },
      { name: 'SocialYoutube',   value: 'https://youtube.com/@all-test' },
    ];

    for (const field of fields) {
      await page.locator(`input[name="${field.name}"]`).fill(field.value);
    }

    await page.locator('#saveButton').click();
    await page.waitForURL(/Dashboard/);

    await gotoEditSocials(page);

    for (const field of fields) {
      await expect(page.locator(`input[name="${field.name}"]`)).toHaveValue(field.value);
    }
  });

});

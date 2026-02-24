import { test, expect } from '@playwright/test';
import { gotoEditSocials } from './helpers';

test.describe('Social Media – Field Interactions', () => {

  test('Each field accepts free-text input', async ({ page }) => {
    await gotoEditSocials(page);

    const fields = [
      { name: 'SocialFacebook',  value: 'https://facebook.com/test' },
      { name: 'SocialInstagram', value: 'https://instagram.com/test' },
      { name: 'SocialTiktok',    value: 'https://tiktok.com/@test' },
      { name: 'SocialLinkedIn',  value: 'https://linkedin.com/company/test' },
      { name: 'SocialTwitter',   value: 'https://x.com/test' },
      { name: 'SocialYoutube',   value: 'https://youtube.com/@test' },
    ];

    for (const field of fields) {
      const input = page.locator(`input[name="${field.name}"]`);
      await expect(input).toBeEnabled();
      await input.fill(field.value);
      await expect(input).toHaveValue(field.value);
    }
  });

  test('Fields can be cleared and saved empty', async ({ page }) => {
    await gotoEditSocials(page);

    const fbInput = page.locator('input[name="SocialFacebook"]');
    await fbInput.fill('');
    await expect(fbInput).toHaveValue('');

    await page.locator('#saveButton').click();

    // After save the page redirects to Dashboard then we navigate back
    await page.waitForURL(/Dashboard/);
    await gotoEditSocials(page);

    await expect(page.locator('input[name="SocialFacebook"]')).toHaveValue('');
  });

  test('Existing social media values are pre-populated after a save', async ({ page }) => {
    await gotoEditSocials(page);

    // Seed a known value
    await page.locator('input[name="SocialFacebook"]').fill('https://facebook.com/prepopulate-check');
    await page.locator('#saveButton').click();
    await page.waitForURL(/Dashboard/);

    // Navigate back – field should carry the saved value
    await gotoEditSocials(page);
    await expect(page.locator('input[name="SocialFacebook"]')).toHaveValue('https://facebook.com/prepopulate-check');
  });

});

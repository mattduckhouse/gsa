import { test, expect } from '@playwright/test';
import { gotoEditSocials, EDIT_SOCIALS_URL, PARTNER_ID } from './helpers';

test.describe('Social Media – Cancel Behaviour', () => {

  test('Cancel button navigates away without saving', async ({ page }) => {
    await gotoEditSocials(page);

    // Record the current Facebook value so we can verify it does NOT change
    const originalValue = await page.locator('input[name="SocialFacebook"]').inputValue();
    const unsavedValue = 'https://facebook.com/UNSAVED-CANCEL-TEST';

    await page.locator('input[name="SocialFacebook"]').fill(unsavedValue);
    await page.locator('#cancelButton').click();

    // Should have navigated away
    await expect(page).not.toHaveURL(new RegExp(EDIT_SOCIALS_URL.replace('?', '\\?')));

    // Navigating back should show the original value, not the unsaved one
    await gotoEditSocials(page);
    await expect(page.locator('input[name="SocialFacebook"]')).not.toHaveValue(unsavedValue);
    await expect(page.locator('input[name="SocialFacebook"]')).toHaveValue(originalValue);
  });

});

test.describe('Social Media – Navigation', () => {

  test('Social media sidebar link navigates to the correct page', async ({ page }) => {
    await page.goto(`/Partners/Dashboard?PartnerId=${PARTNER_ID}`);

    const socialLink = page.getByRole('link', { name: 'Social media', exact: true });
    await expect(socialLink).toBeVisible();

    await socialLink.click();

    await expect(page).toHaveURL(new RegExp(`/Partners/EditSocials\\?PartnerId=${PARTNER_ID}`));
    await expect(page.getByRole('heading', { level: 3 })).toContainText('Edit partner:');
  });

});

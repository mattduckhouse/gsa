import { test, expect } from '@playwright/test';
import { gotoEditPartner, PARTNER_ID } from './helpers';

test.describe('Details page – Main Tab', () => {

  test('Main tab fields are pre-populated for an existing partner', async ({ page }) => {
    await gotoEditPartner(page);

    // Organisation name
    await expect(page.locator('#PartnerName')).not.toBeEmpty();

    // API key is read-only and populated
    const apiKeyInput = page.locator('input[name="ApiKey"]');
    await expect(apiKeyInput).not.toBeEmpty();
    await expect(apiKeyInput).toHaveAttribute('readonly');

    // Copy button is beside the API key
    await expect(page.locator('.copy-api-key-btn')).toBeVisible();

    // Dropdowns have a selected value
    await expect(page.locator('#countryId')).not.toHaveValue('');
    await expect(page.locator('#currency')).not.toHaveValue('');
    await expect(page.locator('#status')).not.toHaveValue('');
  });

  test('Organisation name is required – empty submission shows validation', async ({ page }) => {
    await gotoEditPartner(page);

    await page.locator('#PartnerName').fill('');
    await page.locator('#saveButton').click();

    // HTML5 required validation: the field should be invalid
    const isInvalid = await page.locator('#PartnerName').evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBe(true);

    // Still on the same page (no redirect)
    await expect(page).toHaveURL(new RegExp(`/Partners/EditPartner\\?PartnerId=${PARTNER_ID}`));
  });

  test('Maintenance Mode checkbox can be toggled', async ({ page }) => {
    await gotoEditPartner(page);

    const checkbox = page.locator('#MaintenceMode');
    const initialState = await checkbox.isChecked();

    await checkbox.click();

    await expect(checkbox).toBeChecked({ checked: !initialState });
  });

  test('API key copy button is clickable', async ({ page }) => {
    await gotoEditPartner(page);

    const copyBtn = page.locator('.copy-api-key-btn');
    await expect(copyBtn).toBeVisible();
    // Clicking should not throw or navigate away
    await copyBtn.click();
    await expect(page).toHaveURL(new RegExp(`/Partners/EditPartner\\?PartnerId=${PARTNER_ID}`));
  });

  test('Valid form submission on Main tab saves changes', async ({ page }) => {
    await gotoEditPartner(page);

    const emailInput = page.locator('input[name="ContactUsEmail"]');
    await emailInput.fill('test-support@example.com');

    await page.locator('#saveButton').click();

    // Should not show an error page
    await expect(page.locator('body')).not.toContainText('An error occurred');
    await expect(page.locator('body')).not.toContainText('500');
  });

});

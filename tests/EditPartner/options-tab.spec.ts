import { test, expect } from '@playwright/test';
import { gotoEditPartner, clickTab } from './helpers';

test.describe('Details page – Options Tab', () => {

  test('Options tab shows Core Settings, Display Options and Layout Configuration cards', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Options');

    await expect(page.locator('#tab-options')).toHaveClass(/show active/);

    await expect(page.locator('.card-title').filter({ hasText: 'Core Settings' })).toBeVisible();
    await expect(page.locator('.card-title').filter({ hasText: 'Display Options' })).toBeVisible();
    await expect(page.locator('.card-title').filter({ hasText: 'Layout Configuration' })).toBeVisible();
  });

  test('Status Swim Lane Position dropdown has the expected options', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Options');

    const dropdown = page.locator('#StaticsSwimLane');
    await expect(dropdown).toBeVisible();

    const options = await dropdown.locator('option').allTextContents();
    expect(options).toContain('First Line');
    expect(options).toContain('After Hot Offers');
    expect(options).toContain('After New Offers');
    expect(options).toContain('After Most Popular');
    expect(options).toContain('After Favorites Line');
    expect(options).toContain('After All Cats (bottom)');
  });

  test('Display Options checkboxes are present', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Options');

    await expect(page.locator('#OptionHideNewOffers')).toBeVisible();
    await expect(page.locator('#OptionHideNewOffersLane')).toBeVisible();
    await expect(page.locator('#OptionHideFavourites')).toBeVisible();
    await expect(page.locator('#OptionHideSearch')).toBeVisible();
    await expect(page.locator('#OptionHideCategories')).toBeVisible();
  });

  test('Hot offers and featured rewards dropdowns are present in Layout Configuration', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Options');

    await expect(page.locator('#option_PartnerControlsHotOffers')).toBeVisible();
    await expect(page.locator('#option_PartnerControlsFeatured')).toBeVisible();
  });

});

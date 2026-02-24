import { test, expect } from '@playwright/test';
import { gotoEditPartner } from './helpers';

test.describe('Details page – Clone Partner Modal', () => {

  test('Clone Partner button opens the Clone Partner modal', async ({ page }) => {
    await gotoEditPartner(page);

    await page.locator('#clonePartner').click();

    const modal = page.locator('#ClonePartnerModal');
    await expect(modal).toBeVisible();
    await expect(modal.locator('.modal-title')).toHaveText('Clone Partner');

    // Inputs inside the modal
    await expect(modal.locator('#newPartnerName')).toBeVisible();
    await expect(modal.locator('#IncludeUsers')).toBeVisible();
    await expect(modal.locator('#newColourTick')).toBeVisible();

    // Footer buttons
    await expect(modal.getByRole('button', { name: 'Clone' })).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Clone To Test' })).toBeVisible();
  });

  test('Clone Partner modal closes when Close is clicked', async ({ page }) => {
    await gotoEditPartner(page);

    await page.locator('#clonePartner').click();
    await expect(page.locator('#ClonePartnerModal')).toBeVisible();

    await page.locator('#ClonePartnerModal').getByRole('button', { name: 'Close' }).click();

    await expect(page.locator('#ClonePartnerModal')).not.toBeVisible();
  });

  test('Clone Partner modal – Include Users checkbox can be toggled', async ({ page }) => {
    await gotoEditPartner(page);
    await page.locator('#clonePartner').click();

    const includeUsers = page.locator('#IncludeUsers');
    const before = await includeUsers.isChecked();
    await includeUsers.click();
    await expect(includeUsers).toBeChecked({ checked: !before });
  });

  test('Clone Points modal opens via Clone Points from Another Partner button', async ({ page }) => {
    await gotoEditPartner(page);

    await page.locator('#clonePoints').click();

    const modal = page.locator('#ClonePointsModal');
    await expect(modal).toBeVisible();
    await expect(modal.locator('.modal-title')).toHaveText('Clone Points From Another Partner');
    await expect(modal.locator('#AllPartners')).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Clone' })).toBeVisible();
  });

});

import { test, expect } from '@playwright/test';
import { gotoEditPartner, clickTab } from './helpers';

test.describe('Details page – Levels Tab', () => {

  test('Member level checkboxes reflect current configuration', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Levels');

    await expect(page.locator('#tab-levels')).toHaveClass(/show active/);

    // There should be at least one member level checkbox visible
    const checkboxes = page.locator('#tab-levels input[type="checkbox"][name="MemberLevels"]');
    await expect(checkboxes.first()).toBeVisible();
    expect(await checkboxes.count()).toBeGreaterThan(0);
  });

  test('Toggling a member level and saving persists the change', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Levels');

    const firstCheckbox = page.locator('#tab-levels input[type="checkbox"][name="MemberLevels"]').first();
    const stateBefore = await firstCheckbox.isChecked();

    await firstCheckbox.click();
    await expect(firstCheckbox).toBeChecked({ checked: !stateBefore });

    await page.locator('#saveButton').click();
    await expect(page.locator('body')).not.toContainText('An error occurred');

    // Reload and verify the checkbox state was persisted
    await gotoEditPartner(page);
    await clickTab(page, 'Levels');
    const reloadedCheckbox = page.locator('#tab-levels input[type="checkbox"][name="MemberLevels"]').first();
    await expect(reloadedCheckbox).toBeChecked({ checked: !stateBefore });

    // Restore original state
    await reloadedCheckbox.click();
    await page.locator('#saveButton').click();
  });

});

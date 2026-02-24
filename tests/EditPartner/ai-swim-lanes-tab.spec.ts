import { test, expect } from '@playwright/test';
import { gotoEditPartner, clickTab } from './helpers';

test.describe('Details page – AI Swim Lanes Tab', () => {

  test('AI Swim Lanes tab displays all configuration fields', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'AI Swim Lanes');

    await expect(page.locator('#tab-aiswim')).toHaveClass(/show active/);

    await expect(page.locator('#AiSwimLanesActive')).toBeVisible();
    await expect(page.locator('input[name="MaxNumberOfSwimLanes"]')).toBeVisible();
    await expect(page.locator('input[name="MaxNumberOfItemsPerSwimLane"]')).toBeVisible();
    await expect(page.locator('input[name="DaysToRefresh"]')).toBeVisible();
    await expect(page.locator('#RefreshOnEveryLogin')).toBeVisible();
    await expect(page.locator('#UseSurveys')).toBeVisible();
    await expect(page.locator('#UseUserActivity')).toBeVisible();
  });

  test('Active checkbox can be toggled', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'AI Swim Lanes');

    const activeCheckbox = page.locator('#AiSwimLanesActive');
    const before = await activeCheckbox.isChecked();
    await activeCheckbox.click();
    await expect(activeCheckbox).toBeChecked({ checked: !before });
  });

  test('AI Swim Lanes settings can be updated and saved', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'AI Swim Lanes');

    await page.locator('#AiSwimLanesActive').check();
    await page.locator('input[name="MaxNumberOfSwimLanes"]').fill('3');
    await page.locator('input[name="MaxNumberOfItemsPerSwimLane"]').fill('5');
    await page.locator('input[name="DaysToRefresh"]').fill('14');

    await page.locator('#saveButton').click();
    await expect(page.locator('body')).not.toContainText('An error occurred');

    // Reload and verify persisted values
    await gotoEditPartner(page);
    await clickTab(page, 'AI Swim Lanes');

    await expect(page.locator('#AiSwimLanesActive')).toBeChecked();
    await expect(page.locator('input[name="MaxNumberOfSwimLanes"]')).toHaveValue('3');
    await expect(page.locator('input[name="MaxNumberOfItemsPerSwimLane"]')).toHaveValue('5');
    await expect(page.locator('input[name="DaysToRefresh"]')).toHaveValue('14');
  });

  test('Use Surveys and Use User Activity checkboxes are individually toggleable', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'AI Swim Lanes');

    const useSurveys = page.locator('#UseSurveys');
    const useActivity = page.locator('#UseUserActivity');

    const surveysBefore = await useSurveys.isChecked();
    const activityBefore = await useActivity.isChecked();

    await useSurveys.click();
    await useActivity.click();

    await expect(useSurveys).toBeChecked({ checked: !surveysBefore });
    await expect(useActivity).toBeChecked({ checked: !activityBefore });
  });

});

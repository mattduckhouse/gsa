import { test, expect } from '@playwright/test';
import { gotoEditPartner, clickTab } from './helpers';

test.describe('Details page – Tab Navigation', () => {

  test('Clicking each tab shows the correct tab pane', async ({ page }) => {
    await gotoEditPartner(page);

    // Levels tab
    await clickTab(page, 'Levels');
    await expect(page.locator('#tab-levels')).toHaveClass(/show active/);
    await expect(page.locator('#tab-levels')).toContainText('Member levels');

    // Socials tab
    await clickTab(page, 'Socials');
    await expect(page.locator('#tab-socials')).toHaveClass(/show active/);
    await expect(page.locator('input[name="SocialFacebook"]')).toBeVisible();
    await expect(page.locator('input[name="SocialInstagram"]')).toBeVisible();
    await expect(page.locator('input[name="SocialTiktok"]')).toBeVisible();
    await expect(page.locator('input[name="SocialLinkedIn"]')).toBeVisible();
    await expect(page.locator('input[name="SocialTwitter"]')).toBeVisible();
    await expect(page.locator('input[name="SocialYoutube"]')).toBeVisible();

    // I18N tab
    await clickTab(page, 'I18N');
    await expect(page.locator('#tab-i18n')).toHaveClass(/show active/);
    await expect(page.locator('input[name="TranslationApiKey"]')).toBeVisible();

    // Level Mapping tab
    await clickTab(page, 'Level Mapping');
    await expect(page.locator('#tab-levelmapping')).toHaveClass(/show active/);

    // Options tab
    await clickTab(page, 'Options');
    await expect(page.locator('#tab-options')).toHaveClass(/show active/);
    await expect(page.locator('.card-title').filter({ hasText: 'Core Settings' })).toBeVisible();

    // Integrations tab
    await clickTab(page, 'Integrations');
    await expect(page.locator('#tab-integrations')).toHaveClass(/show active/);
    await expect(page.locator('#integrationsAccordion')).toBeVisible();

    // AI Search/Meta tab
    await clickTab(page, 'AI Search/Meta');
    await expect(page.locator('#tab-meta')).toHaveClass(/show active/);
    await expect(page.locator('#MetaDataTable')).toBeVisible();

    // AI Swim Lanes tab
    await clickTab(page, 'AI Swim Lanes');
    await expect(page.locator('#tab-aiswim')).toHaveClass(/show active/);
    await expect(page.locator('#AiSwimLanesActive')).toBeVisible();

    // Back to Main
    await clickTab(page, 'Main');
    await expect(page.locator('#tab-main')).toHaveClass(/show active/);
  });

});

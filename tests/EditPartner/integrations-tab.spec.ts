import { test, expect } from '@playwright/test';
import { gotoEditPartner, clickTab } from './helpers';

test.describe('Details page – Integrations Tab', () => {

  test('Integration accordion items are visible and collapsed by default', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Integrations');

    await expect(page.locator('#integrationsAccordion')).toBeVisible();

    // All accordion panels should be collapsed by default
    await expect(page.locator('#collapsePerfectGym')).not.toHaveClass(/show/);
    await expect(page.locator('#collapseAbcFitness')).not.toHaveClass(/show/);
    await expect(page.locator('#collapsePlaytomic')).not.toHaveClass(/show/);
  });

  test('Perfect Gym accordion expands and collapses', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Integrations');

    const pgToggle = page.locator('[data-bs-target="#collapsePerfectGym"]');
    await pgToggle.click();

    await expect(page.locator('#collapsePerfectGym')).toHaveClass(/show/);
    await expect(page.locator('input[name="PerfectGymBaseUrl"]')).toBeVisible();
    await expect(page.locator('input[name="ClientId"]')).toBeVisible();
    await expect(page.locator('input[name="ClientSecret"]')).toBeVisible();

    // Collapse again
    await pgToggle.click();
    await expect(page.locator('#collapsePerfectGym')).not.toHaveClass(/show/);
  });

  test('Perfect Gym integration credentials can be entered and saved', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Integrations');

    await page.locator('[data-bs-target="#collapsePerfectGym"]').click();
    await expect(page.locator('#collapsePerfectGym')).toHaveClass(/show/);

    await page.locator('input[name="PerfectGymBaseUrl"]').fill('https://api.perfectgym.example.com');
    await page.locator('input[name="ClientId"]').fill('test-client-id');
    await page.locator('input[name="ClientSecret"]').fill('test-client-secret');

    await page.locator('#saveButton').click();
    await expect(page.locator('body')).not.toContainText('An error occurred');
  });

  test('ABC Fitness accordion expands and shows expected fields', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Integrations');

    await page.locator('[data-bs-target="#collapseAbcFitness"]').click();
    await expect(page.locator('#collapseAbcFitness')).toHaveClass(/show/);

    await expect(page.locator('input[name="AbcApiBaseUrl"]')).toBeVisible();
    await expect(page.locator('input[name="AbcClientId"]')).toBeVisible();
    await expect(page.locator('input[name="AbcAppId"]')).toBeVisible();
    await expect(page.locator('input[name="AbcAppKey"]')).toBeVisible();
  });

  test('Playtomic accordion expands and shows expected fields', async ({ page }) => {
    await gotoEditPartner(page);
    await clickTab(page, 'Integrations');

    await page.locator('[data-bs-target="#collapsePlaytomic"]').click();
    await expect(page.locator('#collapsePlaytomic')).toHaveClass(/show/);

    await expect(page.locator('input[name="PlaytomicClientId"]')).toBeVisible();
    await expect(page.locator('input[name="PlaytomicClientSecret"]')).toBeVisible();
    await expect(page.locator('input[name="PlaytomicVenueId"]')).toBeVisible();
  });

});

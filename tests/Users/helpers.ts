import { Page } from '@playwright/test';

export const PARTNER_ID = process.env.TEST_PARTNER_ID ?? '1294237';
export const USERS_URL = `/Users/Index?PartnerId=${PARTNER_ID}`;
export const DASHBOARD_URL = `/Partners/Dashboard?PartnerId=${PARTNER_ID}`;

/**
 * Navigate to the Users index page for the test partner.
 * Visits the Dashboard first to establish the current-partner session context,
 * then navigates directly to the Users index.
 */
export async function gotoUsers(page: Page) {
  await page.goto(DASHBOARD_URL);
  await page.goto(USERS_URL);
  await page.waitForURL(new RegExp('Users/Index'), { timeout: 10000 });
}

/**
 * Click the Search button and wait for the DataTable AJAX request to settle.
 * Waits for the DataTable processing indicator to disappear, or falls back to
 * a short network-idle wait, so that rows have been painted before assertions run.
 */
export async function runSearch(page: Page) {
  await page.locator('#search-button').click();
  // Wait for the DataTable processing overlay to hide (it appears while loading)
  await page.waitForFunction(
    () => {
      const proc = document.querySelector('#users_processing') as HTMLElement | null;
      return !proc || proc.style.display === 'none' || !proc.offsetParent;
    },
    { timeout: 15000 }
  );
}

import { Page } from '@playwright/test';

export const PARTNER_ID = process.env.TEST_PARTNER_ID ?? '1294237';
export const EDIT_SOCIALS_URL = `/Partners/EditSocials?PartnerId=${PARTNER_ID}`;
export const DASHBOARD_URL = `/Partners/Dashboard?PartnerId=${PARTNER_ID}`;

export async function gotoEditSocials(page: Page) {
  // Visit the Dashboard first so the app establishes the current partner context,
  // then navigate to EditSocials (direct navigation redirects back to Dashboard).
  await page.goto(DASHBOARD_URL);
  await page.goto(EDIT_SOCIALS_URL);
  await page.waitForURL(new RegExp('EditSocials'), { timeout: 10000 });
}

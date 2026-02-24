import { Page } from '@playwright/test';

export const PARTNER_ID = process.env.TEST_PARTNER_ID ?? '1294237';
export const EDIT_PARTNER_URL = `/Partners/EditPartner?PartnerId=${PARTNER_ID}`;

export async function gotoEditPartner(page: Page) {
  await page.goto(EDIT_PARTNER_URL);
}

export async function clickTab(page: Page, tabName: string) {
  await page.getByRole('link', { name: tabName, exact: true }).click();
}

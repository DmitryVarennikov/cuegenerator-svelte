import { expect, test } from '@playwright/test';

test('index page expects a counter', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTitle('cues-counter')).toBeVisible();
});
test('save cue to file button is disabled', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('input[type=button]', { hasText: 'Save Cue to file' })).toBeDisabled();
});
test.only('save cue to file button is enabled and disabled again', async ({ page }) => {
  await page.goto('/');
  const saveCueToFileBtn = page.locator('input[type=button]', { hasText: 'Save Cue to file' });

  await page.getByLabel('Performer:').type('performer');
  await expect(saveCueToFileBtn).toBeEnabled();

  // ???
  // await page.getByLabel('Performer:').type(' ');
  // await expect(saveCueToFileBtn).toBeDisabled();
});

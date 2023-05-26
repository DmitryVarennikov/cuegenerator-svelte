import { expect, test } from '@playwright/test';

test('index page expects a counter', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTitle('cues-counter')).toBeVisible();
});

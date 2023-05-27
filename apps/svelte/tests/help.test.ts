import { expect, test } from '@playwright/test';

test('help page expects a table of contents', async ({ page }) => {
  await page.goto('/help');
  await expect(page.getByRole('list')).toBeVisible();
});

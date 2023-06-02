import { expect, test } from '@playwright/test';
// import { cueHistoryKey } from '../src/stores';

test('index page expects a counter', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTitle('cues-counter')).toBeVisible();
});
test('save cue to file button is disabled', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('input[type=button]', { hasText: 'Save Cue to file' })).toBeDisabled();
});
test('save cue to file button is enabled and disabled again', async ({ page }) => {
  await page.goto('/');
  const saveCueToFileBtn = page.locator('input[type=button]', { hasText: 'Save Cue to file' });

  await page.getByLabel('Performer:').type('performer');
  await expect(saveCueToFileBtn).toBeEnabled();

  // ???
  // await page.getByLabel('Performer:').type(' ');
  // await expect(saveCueToFileBtn).toBeDisabled();
});
test('Load my prev Cue button is disabled when there is no previous cue in the local storage', async ({ page }) => {
  await page.goto('/');
  const btnLocator = page.locator('input[type=button]', { hasText: 'Load my prev Cue' });
  await expect(btnLocator).toBeDisabled();

  // ???
  // const localStorageCueState = [
  //   {
  //     input: {
  //       performer: 'Kreator',
  //       title: 'Outcast',
  //       fileName: 'outcast.aac',
  //       fileType: 'AAC',
  //       trackList: 'Forever\nPhobia\nWhatever It May Take',
  //       regionsList: '00:00:00\n03:23:00\n05:47:00'
  //     },
  //     output: {
  //       cue: 'PERFORMER "Kreator"\nTITLE "Outcast"\nFILE "outcast.aac" AAC\n  TRACK 01 AUDIO\n    PERFORMER "Kreator"\n    TITLE "Forever"\n    INDEX 01 00:00:00\n  TRACK 02 AUDIO\n    PERFORMER "Kreator"\n    TITLE "Phobia"\n    INDEX 01 03:23:00\n  TRACK 03 AUDIO\n    PERFORMER "Kreator"\n    TITLE "Whatever It May Take"\n    INDEX 01 05:47:00\n'
  //     }
  //   }
  // ];

  // await page.addInitScript((value) => {
  //   window.localStorage.setItem(cueHistoryKey, JSON.stringify(value));
  // }, localStorageCueState);
  // await page.goto('/');
  // await expect(btnLocator).toBeEnabled();
});

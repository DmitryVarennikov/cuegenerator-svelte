import { describe, it, expect } from 'vitest';
import { replaceFileExt, makeCueFileName } from './utils';

describe('utils', () => {
  describe('replaceFileExt', () => {
    it('replace existing extension', () => {
      const actual = replaceFileExt('my sound file.mp3', '.cue');
      const expected = 'my sound file.cue';
      expect(actual).toBe(expected);
    });
    it('no extension', () => {
      const actual = replaceFileExt('my sound file', '.cue');
      const expected = 'my sound file.cue';
      expect(actual).toBe(expected);
    });
  });

  describe('makeCueFileName', () => {
    it('non-empty sound file name', () => {
      const actual = makeCueFileName('sound file name');
      const expected = 'sound file name.cue';
      expect(actual).toBe(expected);
    });
    it('empty sound file name', () => {
      const actual = makeCueFileName('');
      const expected = 'Untitled.cue';
      expect(actual).toBe(expected);
    });
  });
});

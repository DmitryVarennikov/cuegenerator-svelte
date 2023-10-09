import { writable } from 'svelte/store';
import type { CueState } from './types';

const browser = typeof window !== 'undefined';
export const cueStore = writable<CueState | undefined>(undefined);
// NOTE: exported only for the test purpose, use `cueHistoryStore` instead
export const cueHistoryKey = 'cueHistory';
export function createCueHistoryStore(stackLimit = 10) {
  let initCueState = [];
  if (browser && window.localStorage.getItem(cueHistoryKey))
    initCueState = JSON.parse(localStorage.getItem(cueHistoryKey)!);

  const { subscribe, update } = writable<Array<CueState>>(initCueState);
  return {
    subscribe: (cb: (cueState: CueState | undefined) => void) =>
      subscribe((stack: Array<CueState>) => {
        cb(stack[0]);
        // store updated value in the local storage
        if (browser) window.localStorage.setItem(cueHistoryKey, JSON.stringify(stack));
      }),
    set: (cue: CueState) => update(stack => [cue, ...(stack.length > stackLimit ? stack.slice(0, stackLimit) : stack)])
  };
}
export const cueHistoryStore = createCueHistoryStore();

export const apiCueCounterStore = writable<number>(0);

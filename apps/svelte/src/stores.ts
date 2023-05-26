import { writable } from 'svelte/store';
import type { CueState } from './types';

export const cueStore = writable<CueState | undefined>(undefined);

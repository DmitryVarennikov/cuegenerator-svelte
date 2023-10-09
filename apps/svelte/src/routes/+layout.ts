import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config';

export const ssr = false;
// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;

console.log('App started', { MODE: import.meta.env.MODE });
initializeApp(firebaseConfig);
console.log('Firebase initiated', { firebaseConfig });

import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;

console.log('App init', { MODE: import.meta.env.MODE });
if (import.meta.env.MODE === 'production') {
  const {
    VITE_API_KEY,
    VIET_AUTH_DOMAIN,
    VITE_PROJECT_ID,
    VITE_STORAGE_BUCKET,
    VITE_MESSAGING_SENDER_ID,
    VITE_APP_ID,
    VITE_MEASUREMENT_ID
  } = import.meta.env;
  const config = {
    apiKey: VITE_API_KEY,
    authDomain: VIET_AUTH_DOMAIN,
    projectId: VITE_PROJECT_ID,
    storageBucket: VITE_STORAGE_BUCKET,
    messagingSenderId: VITE_MESSAGING_SENDER_ID,
    appId: VITE_APP_ID,
    measurementId: VITE_MEASUREMENT_ID
  };
  const app = initializeApp(config);
  //   getAnalytics(app);
  console.log('firebase initiated', { config });
} else {
  console.log('firebase skipped');
}

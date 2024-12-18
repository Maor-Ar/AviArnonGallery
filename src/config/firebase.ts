// Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

console.log('Firebase Config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '**exists**' : '**missing**',
})

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Initialize Analytics only in browser environment
let analytics = null
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

// Log initialization status
console.log('Firebase Initialized:', {
  app: !!app,
  db: !!db,
  analytics: !!analytics,
  storage: !!storage,
  projectId: app.options.projectId
})

export { analytics }

// Export the app instance if needed elsewhere
export default app

// Control Panel access key
export const CONTROL_PANEL_ACCESS_KEY = import.meta.env.VITE_CONTROL_PANEL_KEY || 'mock-control-panel-key-123';

// Gallery configuration
export const GALLERY_PAGE_SIZE = 12;

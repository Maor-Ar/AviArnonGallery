// Firebase configuration
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
import { env } from './env'

export const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

// Debug logging
console.log('Environment Variables:', {
  FIREBASE_API_KEY: env.FIREBASE_API_KEY ? 'exists' : 'missing',
  FIREBASE_AUTH_DOMAIN: env.FIREBASE_AUTH_DOMAIN ? 'exists' : 'missing',
  FIREBASE_PROJECT_ID: env.FIREBASE_PROJECT_ID ? 'exists' : 'missing',
  FIREBASE_STORAGE_BUCKET: env.FIREBASE_STORAGE_BUCKET ? 'exists' : 'missing',
  FIREBASE_MESSAGING_SENDER_ID: env.FIREBASE_MESSAGING_SENDER_ID ? 'exists' : 'missing',
  FIREBASE_APP_ID: env.FIREBASE_APP_ID ? 'exists' : 'missing',
  FIREBASE_MEASUREMENT_ID: env.FIREBASE_MEASUREMENT_ID ? 'exists' : 'missing',
  CONTROL_PANEL_KEY: env.CONTROL_PANEL_KEY ? 'exists' : 'missing'
});

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
export const CONTROL_PANEL_ACCESS_KEY = env.CONTROL_PANEL_KEY || 'mock-control-panel-key-123';

// Gallery configuration
export const GALLERY_PAGE_SIZE = 12;

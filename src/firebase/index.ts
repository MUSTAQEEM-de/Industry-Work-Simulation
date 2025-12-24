import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

export * from './provider';
export * from './auth/use-user';

let app: FirebaseApp;

export const initializeFirebase = (): FirebaseApp | null => {
  if (getApps().length > 0) {
    app = getApps()[0];
  } else {
    try {
      app = initializeApp(firebaseConfig);
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }
  return app;
};

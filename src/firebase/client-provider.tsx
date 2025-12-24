'use client';

import {
  initializeFirebase,
  FirebaseProvider,
  FirebaseContext,
} from '@/firebase';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { ReactNode, useMemo } from 'react';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  const context = useMemo(() => {
    const app = initializeFirebase();
    if (!app) {
      return {
        app: null,
        auth: null,
        firestore: null,
      };
    }
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    return {
      app,
      auth,
      firestore,
    };
  }, []);
  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
}

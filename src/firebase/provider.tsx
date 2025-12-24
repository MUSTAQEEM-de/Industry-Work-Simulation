'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { initializeFirebase } from '.';
import { FirebaseClientProvider } from './client-provider';

type FirebaseContextValue = {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
};

export const FirebaseContext = createContext<FirebaseContextValue>({
  app: null,
  auth: null,
  firestore: null,
});

export const useFirebaseApp = () => {
  const { app } = useContext(FirebaseContext);
  return app;
};

export const useAuth = () => {
  const { auth } = useContext(FirebaseContext);
  return auth;
};

export const useFirestore = () => {
  const { firestore } = useContext(FirebaseContext);
  return firestore;
};

type FirebaseProviderProps = {
  children: ReactNode;
};

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  return <FirebaseClientProvider>{children}</FirebaseClientProvider>;
};

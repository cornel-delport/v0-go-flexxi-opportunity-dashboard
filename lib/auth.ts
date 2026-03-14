'use client';

import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ROLES } from '@/lib/roles';

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        authProvider: 'google',
        role: ROLES.PENDING,
        status: 'active',
        organizationId: null,
        teamId: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });
    } else {
      await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
    }

    return user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    return null;
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
}

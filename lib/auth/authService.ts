import { auth } from '@/lib/firebase/client';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { userService } from '@/lib/services/user.service';
import { UserRegistration, UserProfile } from '@/lib/types';

export const authService = {
  async register(user: UserRegistration): Promise<UserProfile> {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    await this.signIn(user);

    return await response.json();
  },

  async signIn(credentials: Pick<UserRegistration, 'email' | 'password'>) {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);

    const idToken = await userCredential.user.getIdToken();

    await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
  },

  async signOut() {
    await signOut(auth);

    await fetch('/api/auth/signout', {
      method: 'POST',
    });
  },
};

import { db } from '@/lib/firebase/client';
import { User, UserProfile } from './user';
import { doc, setDoc } from 'firebase/firestore';

export const userService = {
  async createUser(user: User): Promise<UserProfile> {
    const userRef = doc(db, 'users', user.id);

    await setDoc(userRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  },
};

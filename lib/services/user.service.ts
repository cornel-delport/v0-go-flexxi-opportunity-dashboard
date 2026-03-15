import { FirestoreData } from '../firestore-data-model';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';

class UserService {
  async getUserById(userId: string): Promise<FirestoreData.User | null> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as FirestoreData.User) : null;
  }

  async updateUser(userId: string, updates: Partial<FirestoreData.User>): Promise<FirestoreData.User | null> {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, updates, { merge: true });
    const updatedUserSnap = await getDoc(userRef);
    return updatedUserSnap.exists() ? (updatedUserSnap.data() as FirestoreData.User) : null;
  }

  async deleteUser(userId: string): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
  }

  async createUser(userData: Omit<FirestoreData.User, 'id'>): Promise<FirestoreData.User | null> {
    const userRef = doc(collection(db, 'users'));
    const newUser = { ...userData, id: userRef.id };
    await setDoc(userRef, newUser);
    const createdUserSnap = await getDoc(userRef);
    return createdUserSnap.exists() ? (createdUserSnap.data() as FirestoreData.User) : null;
  }

  async getUserByEmail(email: string): Promise<FirestoreData.User | null> {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    return querySnapshot.docs[0].data() as FirestoreData.User;
  }

  async getAllUsers(): Promise<FirestoreData.User[]> {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map((doc) => doc.data() as FirestoreData.User);
  }
}

export const userService = new UserService();

import { useEffect, useState } from 'react';
import { auth } from '@/lib/auth/firebase'; // Assuming firebase is configured here
import { ROLES } from '@/lib/roles/constants';

// Mock user data, replace with your actual user fetching logic
const mockUser = {
  uid: '123',
  email: 'test@example.com',
  displayName: 'Test User',
  role: ROLES.USER, // default role
};

export const useAuth = () => {
  const [user, setUser] = useState(mockUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

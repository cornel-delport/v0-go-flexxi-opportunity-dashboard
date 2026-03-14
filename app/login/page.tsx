'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signOut } from '@/lib/auth';
import { useSession } from '@/lib/useSession'; // We will create this hook next
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session) {
      router.push('/'); // Redirect to dashboard if already logged in
    }
  }, [session, router]);

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      const idToken = await user.getIdToken();
      await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
        <Button onClick={handleSignIn} className="w-full">Sign in with Google</Button>
      </div>
    </div>
  );
}

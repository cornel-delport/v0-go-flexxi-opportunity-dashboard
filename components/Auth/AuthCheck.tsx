import { useAuth } from '@/lib/hooks/useAuth';
import { ROLES } from '@/lib/roles/constants';
import { ReactNode } from 'react';

export const AuthCheck = ({ children, role = ROLES.USER }: {children: ReactNode, role?: string}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not logged in</div>;
  }

  if (user.role !== role) {
    return <div>Forbidden</div>;
  }

  return <>{children}</>;
};

"""
// lib/roles/withAuthorization.tsx

import { useSession } from "@/lib/useSession";
import { hasPermission, Resource, Action } from "./index";
import { useRouter } from "next/navigation";
import { ComponentType } from 'react';

interface WithAuthorizationProps {
  // You can add any additional props needed by the wrapped component here
}

export function withAuthorization<P extends WithAuthorizationProps>(
  WrappedComponent: ComponentType<P>,
  resource: Resource,
  action: Action
) {
  const WithAuthorization = (props: P) => {
    const user = useSession();
    const router = useRouter();

    if (!user) {
      // User is not logged in or session is loading
      // You might want to show a loading spinner here
      return null; // or a loading component
    }

    if (!hasPermission(user.role, resource, action)) {
      // User does not have the required permission
      // Redirect them to a "forbidden" page or another appropriate page
      router.push("/forbidden");
      return null; // or a forbidden component
    }

    return <WrappedComponent {...props} />;
  };

  // Set a display name for easier debugging
  WithAuthorization.displayName = `WithAuthorization(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthorization;
}

"""
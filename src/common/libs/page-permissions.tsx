'use client';

import { JSX, useEffect, useState, useMemo } from 'react';
import { useAuthStore } from '@/common/store';
import Router from 'next/router';

export default function withPermissionGuard<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
  requiredPermission: string
) {
  const GuardedComponent = (props: P) => {
    const router = Router;
    const user = useAuthStore((s) => s.user);
    const [authorized, setAuthorized] = useState(false);

    const offline = process.env.NEXT_PUBLIC_OFFLINE_MODE === 'true';

    const hasPermission = useMemo(() => {
      if (offline) return true;
      return !!user?.allowedPermissions?.includes(requiredPermission);
    }, [user, requiredPermission, offline]);

    useEffect(() => {
      if (!user) return;

      if (!hasPermission) {
        router.replace('/404');
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    }, [hasPermission, user, router]);

    if (!authorized) return null;

    return <WrappedComponent {...props} />;
  };

  GuardedComponent.displayName = `WithPermissionGuard(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return GuardedComponent;
}

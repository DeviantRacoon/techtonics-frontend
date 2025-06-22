'use client';

import { JSX, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/config/store'; 

export default function withPermissionGuard<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
  requiredPermission: string
) {
  const GuardedComponent = (props: P) => {
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      if (!user) return;
      setAuthorized(true);
    }, [user]);

    if (!authorized) return null;

    return <WrappedComponent {...props} />;
  };

  GuardedComponent.displayName = `WithPermissionGuard(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return GuardedComponent;
}

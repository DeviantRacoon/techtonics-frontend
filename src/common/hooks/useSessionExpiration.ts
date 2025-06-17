import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { clearCurrentUser } from '@/common/store';

import { getCookie, deleteCookie } from '../libs/cookies-services';

const WARNING_THRESHOLD_MS = 15_000;

export function useSessionExpiration() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isRenewalModalOpen, setRenewalModalOpen] = useState(false);

  useEffect(() => {
    const token = getCookie('sessionToken');
    const expiresAtStr = getCookie('sessionExpiresAt');

    if (!token || !expiresAtStr) return;

    const expiresAt = parseInt(expiresAtStr, 10);
    const now = Date.now();
    const remaining = expiresAt - now;

    if (remaining <= 0) {
      handleSessionExpired();
      return;
    }

    const warnDelay = remaining - WARNING_THRESHOLD_MS;

    if (warnDelay > 0) {
      setTimeout(() => {
        setRenewalModalOpen(true);
      }, warnDelay);
    } else {
      setRenewalModalOpen(true);
    }

    const logoutTimer = setTimeout(() => {
      handleSessionExpired();
    }, remaining);

    return () => clearTimeout(logoutTimer);
  }, []);

  const handleSessionExpired = () => {
    console.warn('⚡ Sesión expirada automáticamente');
    deleteCookie('sessionToken');
    deleteCookie('sessionExpiresAt');
    dispatch(clearCurrentUser());
    router.push('/auth');
  };

  const onRenew = useCallback(() => {
    console.log("🔁 Usuario desea renovar sesión");
    setRenewalModalOpen(false);
  }, []);

  const onDismiss = useCallback(() => {
    console.log("❌ Usuario descartó la renovación");
    setRenewalModalOpen(false);
  }, []);

  return {
    isRenewalModalOpen,
    onRenew,
    onDismiss,
  };
}

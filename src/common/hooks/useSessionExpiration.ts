import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

import { getCookie, deleteCookie, setCookie } from "../libs/cookies-services";

import { useAuthStore } from "@/common/store";
// import { refreshToken } from "@/modules/auth/auth.services";

const WARNING_THRESHOLD_MS = 30_000;

export function useSessionExpiration() {
  const token = getCookie("sessionToken");
  const clearUser = useAuthStore((s) => s.clearUser);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);

  const [expiresAt, setExpiresAt] = useState<number>(() => {
    const cookie = getCookie("sessionExpiresAt");
    return cookie ? parseInt(cookie, 10) : 0;
  });

  const handleSessionExpired = useCallback(() => {
    deleteCookie("sessionToken");
    deleteCookie("sessionExpiresAt");
    clearUser();
    router.push("/auth");
  }, [clearUser, router]);

  const clearWatcher = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }
  };

  const setupWatcher = useCallback((nextExpiresAt: number) => {
    if (!nextExpiresAt || isNaN(nextExpiresAt)) return;

    const now = Date.now();
    const delay = nextExpiresAt - now - WARNING_THRESHOLD_MS;

    clearWatcher();

    if (delay <= 0) {
      setIsRenewalModalOpen(true);

      warningTimeoutRef.current = setTimeout(() => {
        handleSessionExpired();
      }, WARNING_THRESHOLD_MS);

      return;
    }

    timeoutRef.current = setTimeout(() => {
      setIsRenewalModalOpen(true);

      warningTimeoutRef.current = setTimeout(() => {
        handleSessionExpired();
      }, WARNING_THRESHOLD_MS);
    }, delay);
  }, []);

  const onRenew = useCallback(async () => {
    try {
      // const {
      //   response: { expiration },
      //   error,
      // }: any = await refreshToken(getCookie("sessionToken")!);

      // if (error) {
      //   handleSessionExpired();
      //   return;
      // }

      // const newExpiresAt = Date.now() + expiration * 1000;

      // setCookie("sessionToken", token!, {
      //   maxAge: newExpiresAt,
      //   secure: true,
      //   sameSite: "Strict",
      // });

      // setCookie("sessionExpiresAt", newExpiresAt.toString(), {
      //   maxAge: newExpiresAt,
      //   secure: true,
      //   sameSite: "Strict",
      // });

      // setExpiresAt(newExpiresAt);
      setIsRenewalModalOpen(false);
    } catch {
      handleSessionExpired();
    }
  }, [handleSessionExpired]);

  const onDismiss = useCallback(() => {
    setIsRenewalModalOpen(false);
    handleSessionExpired();
  }, [handleSessionExpired]);

  useEffect(() => {
    if (!expiresAt || isNaN(expiresAt)) return;
    setupWatcher(expiresAt);

    return () => clearWatcher();
  }, [expiresAt, setupWatcher]);

  return { onRenew, onDismiss, handleSessionExpired, isRenewalModalOpen };
}

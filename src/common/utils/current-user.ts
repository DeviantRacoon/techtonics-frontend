// Config
import { useAuthStore } from '../store';

// Commons
import { IUserLogin } from '../models';
import { setCookie } from '../libs/cookies-services';

export function getCurrentUser(): IUserLogin | null {
  return useAuthStore.getState().user;
};

export function setCurrentUser(userLogged: IUserLogin) {
  const userFormat: IUserLogin = {
    ...userLogged,
    allowedPermissions: userLogged.role.permissions.map((permission) => permission.permissionName),
  };

  const expirationSeconds = 14_400; // 4 hours
  const expiresAt = Date.now() + expirationSeconds * 1000;

  setCookie("sessionToken", userLogged.token, {
    maxAge: expirationSeconds
  });

  setCookie("sessionExpiresAt", expiresAt.toString(), {
    maxAge: expirationSeconds
  });

  useAuthStore.getState().setUser(userFormat);
}

export function clearCurrentUser() {
  setCookie("sessionToken", "", { maxAge: 0 });
};

export function getAllowedActions(method: string): boolean {
  if (process.env.NEXT_PUBLIC_OFFLINE_MODE === 'true') {
    return true;
  }
  if (!getCurrentUser()) return false;
  const { allowedPermissions } = getCurrentUser()!;
  return !!allowedPermissions.includes(method);
};

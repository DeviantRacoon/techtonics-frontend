// Config
import { store } from '@/config/store';

// Commons
import { IUserLogin } from '../models';
import { selectCurrentUser } from '../store';
import { setCookie } from '../libs/cookies-services';
import { setCurrentUser as setCurrentUserRedux } from "@/common/store";

export function getCurrentUser(): IUserLogin | null {
  const state = store.getState();
  const currentUser = selectCurrentUser(state);

  return currentUser;
};

export function setCurrentUser(dispatch: any, userLogged: IUserLogin) {
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

  dispatch(setCurrentUserRedux(userFormat));
}

export function clearCurrentUser() {
  setCookie("sessionToken", "", { maxAge: 0 });
};

export function getAllowedActions(method: string): boolean {
  if (!getCurrentUser()) return false;
  const { allowedPermissions } = getCurrentUser()!;
  return !!allowedPermissions.includes(method);
};

// src/common/utils/session-handlers.ts
'use client';

import { deleteCookie } from '../libs/cookies-services';
import { useAuthStore } from '../store';
import Router from 'next/router';

export function handleSessionExpired() {
  console.warn('Token expirado, cerrando sesión automáticamente');

  deleteCookie('sessionToken');
  deleteCookie('sessionExpiresAt');

  useAuthStore.getState().clearUser();
  Router.push('/auth');
}

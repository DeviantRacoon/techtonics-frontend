// src/common/utils/session-handlers.ts
'use client';

import { deleteCookie } from '../libs/cookies-services';
import { clearCurrentUser as clearReduxUser } from '../store';
import { store } from '@/config/store';
import Router from 'next/router';

export function handleSessionExpired() {
  console.warn('Token expirado, cerrando sesión automáticamente');

  deleteCookie('sessionToken');
  deleteCookie('sessionExpiresAt');

  store.dispatch(clearReduxUser());
  Router.push('/auth');
}

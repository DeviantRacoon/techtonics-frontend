'use client';

import { useRef, useState, useCallback } from 'react';
import Router from 'next/router';
import { SmartInputRef } from '@/common/components';
import { setCurrentUser } from '@/common/utils';
import AuthService from '../infrastructure/auth-service';

const authService = new AuthService();

export function useAuthController() {
  const router = Router;
  const emailRef = useRef<SmartInputRef>(null);
  const passRef = useRef<SmartInputRef>(null);
  const [loading, setLoading] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading('loading');

    const isEmailValid = emailRef.current?.validate() ?? false;
    const isPassValid = passRef.current?.validate() ?? false;

    if (!isEmailValid || !isPassValid) {
      setLoading('idle');
      return;
    }

    const email = emailRef.current?.getValue();
    const password = passRef.current?.getValue();

    const { data, error } = await authService.login(email!, password!);

    if (error) {
      setLoading('error');
      return;
    }

    setCurrentUser(data);
    router.push('/home');
  }, []);

  return {
    emailRef,
    passRef,
    loading,
    handleLogin,
  };
}

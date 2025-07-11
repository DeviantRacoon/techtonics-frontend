'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { SmartButton, SmartInput, ThemedIcon } from '@/common/components';
import { useAuthController } from '../application/useAuthController';

export function AuthView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { emailRef, passRef, loading, handleLogin } = useAuthController();

  return (
    <Paper
      component="form"
      onSubmit={handleLogin}
      elevation={6}
      sx={{
        width: '100%',
        maxWidth: isMobile ? '100vw' : 420,
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        mx: 'auto',
        borderRadius: { xs: 1, sm: 1 },
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Image
          src="/assets/img/logotipo.webp"
          alt="Logotipo"
          width={isMobile ? 150 : 250}
          height={isMobile ? 50 : 100}
          style={{ maxWidth: '100%', height: 'auto' }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Inicia sesión para continuar
        </Typography>
      </Stack>

      <Stack spacing={2} mt={3}>
        <SmartInput
          ref={emailRef}
          required
          label="Correo electrónico"
          placeholder="Escribe tu correo electrónico"
          name="email"
          leftIcon={<ThemedIcon src="/assets/svg/person-circle-outline.svg" alt="correo" width={20} />}
          size="small"
          autoComplete="on"
        />

        <SmartInput
          ref={passRef}
          required
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          name="password"
          type="password"
          leftIcon={<ThemedIcon src="/assets/svg/lock-closed-outline.svg" alt="contraseña" width={20} />}
          size="small"
          autoComplete="on"
        />

        <SmartButton
          label="Iniciar sesión"
          variant="contained"
          type="submit"
          loading={loading === 'loading'}
          fullWidth
        />

        {loading === 'error' && (
          <Typography variant="caption" color="error.main" textAlign="center">
            Credenciales incorrectas
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" textAlign="center">
          ¿Olvidaste tu contraseña?{' '}
          <Link href="/auth/forgot-password">Olvidé mi contraseña</Link>
        </Typography>
      </Stack>
    </Paper>
  );
}

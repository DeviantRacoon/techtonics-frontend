// Libraries
import React, { useRef, useState } from "react";
import Image from "next/image";
import Router from "next/router";

// MUI
import { Stack, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";

// Commons
import { SmartButton, SmartInput, SmartInputRef } from "@/common/components";

// Services
import { forgotPassword } from "@/modules/auth/auth.services";
import AuthLayout from "./_layout";

export default function AuthModule() {
  const router = Router;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const userRef = useRef<SmartInputRef>(null);

  const [loading, setLoading] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("loading");

    const isUserValid = userRef.current?.validate() ?? false;

    if (!isUserValid) {
      setLoading("idle");
      return;
    }

    const user = userRef.current?.getValue();

    const { error } = await forgotPassword(user!);

    if (error) {
      setLoading("error");
      return;
    };

    setLoading("idle");
    router.push("/");
  };

  return (
    <AuthLayout>
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
            alt="Logotipo de Avan"
            width={isMobile ? 150 : 250}
            height={isMobile ? 50 : 100}
            style={{ maxWidth: "100%", height: "auto" }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Ingresa tu correo para restablecer tu contraseña
          </Typography>
        </Stack>

        <Stack spacing={2} mt={3}>
          <SmartInput
            ref={userRef}
            required
            label="Correo"
            placeholder="Escribe tu correo"
            name="email"
            leftIcon={<img src="/assets/svg/person-circle-outline.svg" alt="correo" width="20" />}
            size="small"
          />

          <SmartButton
            label="Recuperar contraseña"
            variant="contained"
            type="submit"
            loading={loading === "loading"}
            fullWidth
          />

        </Stack>
      </Paper>
    </AuthLayout>
  );
}

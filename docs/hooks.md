# Hooks Personalizados

## useAppDispatch y useAppSelector

Versiones tipadas de los hooks de Redux para usar el `AppDispatch` y `RootState` definidos en `src/config/store`.

## useColorMode

Permite alternar entre modo claro y oscuro utilizando `localStorage` para persistir la preferencia y el tema de Material UI.

## useSessionExpiration

Hook que verifica periódicamente si la cookie `sessionExpiresAt` ha expirado y, de ser así, ejecuta `handleSessionExpired()` para cerrar la sesión.

# Middleware de Next.js

El archivo `src/middleware.ts` protege las rutas de la aplicación. Su lógica es la siguiente:

1. Define `PUBLIC_ROUTES` como rutas accesibles sin autenticación (`/` y `/auth`).
2. Si el usuario intenta acceder a otra ruta sin tener la cookie `sessionToken`, se le redirige a `/auth`.
3. Si el usuario ya posee token e intenta navegar a `/auth`, se redirige automáticamente a `/home`.
4. En cualquier otro caso la petición continúa con `NextResponse.next()`.

La configuración de `matcher` excluye rutas estáticas y permite todas las demás.

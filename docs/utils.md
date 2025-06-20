# Utilidades

## current-user

Maneja al usuario autenticado usando el estado de Redux y cookies.

### Funciones
- `getCurrentUser()` – Obtiene el usuario actual desde el estado.
- `setCurrentUser(dispatch, user)` – Guarda el usuario, su token y permisos en cookies y Redux.
- `clearCurrentUser()` – Limpia la cookie de sesión.
- `getAllowedActions(method)` – Verifica si el usuario tiene un permiso específico.

```ts
const user = getCurrentUser()
if (getAllowedActions('user_edit')) {
  // mostrar botón de edición
}
```

## session-handlers

Utilidad para cerrar sesión automáticamente cuando expira el token.
Elimina cookies, limpia Redux y redirige a `/auth`.

## exportToCSV

Convierte un arreglo de objetos a un archivo CSV y dispara su descarga.

```ts
exportToCSV(rows, 'reporte.csv', [ { key: 'name', label: 'Nombre' } ])
```

## constants

Mapea estados (`ACTIVO`, `ELIMINADO`, etc.) a variantes de color de MUI para
usarlas en tablas y componentes de estado.

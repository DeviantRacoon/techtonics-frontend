# Arquitectura de Módulos

Cada módulo sigue un pequeño esquema basado en capas:

```
module/
├─ domain/         → Modelos y tipos de negocio
├─ application/    → Hooks de control (lógica de casos de uso)
├─ infrastructure/ → Servicios de API
└─ ui/             → Componentes de presentación
```

Ejemplo de uso (módulo **user**):

- `domain/user-model.ts` define la interfaz `IUser`.
- `infrastructure/user-service.ts` extiende `BaseService` para realizar peticiones HTTP.
- `application/useUserController.tsx` maneja el estado, llamadas al servicio y notificaciones.
- `application/useUserUI.tsx` controla la apertura de modales y elementos de UI.
- `ui/UserView.tsx` compone la tabla, modales y botones para mostrar la interfaz completa.

Cada módulo exporta su vista principal desde `index.tsx` para ser utilizado en las páginas de Next.js.

# Arquitectura General

En este documento se describe la estructura principal del proyecto y la filosofía seguida para organizar el código. Se tomó inspiración de repositorios como [awesome-architecture-md](https://github.com/noahbald/awesome-architecture-md) para mantener una documentación clara y amigable para nuevos colaboradores.

## Visión global

El frontend está construido con **Next.js**, **TypeScript** y **Material UI**. El código se agrupa bajo el directorio `src/` y se divide en tres grandes bloques:

1. **common/** – Elementos reutilizables en toda la aplicación (componentes, hooks, librerías, utilidades y modelos comunes).
2. **modules/** – Funcionalidades de negocio encapsuladas por dominio.
3. **config/** – Configuración de rutas, tema y store de Redux.

A su vez, cada página dentro de `pages/` consume los módulos y componentes necesarios para renderizar la interfaz.

```
src/
├─ common/
├─ modules/
├─ config/
├─ pages/
└─ styles/
```

## Principios de diseño

- **Separación por dominio**: cada módulo es autosuficiente y contiene todo lo necesario para funcionar (modelos, servicios, hooks y vistas). Esto facilita el mantenimiento y permite escalar de forma modular.
- **Capas bien definidas**: se sigue una estructura basada en capas similar a la Clean Architecture, evitando dependencias circulares y manteniendo la lógica de negocio aislada de la infraestructura.
- **Reutilización**: los componentes y hooks comunes se ubican en `src/common` para que cualquier módulo pueda aprovecharlos sin duplicar código.

## Estructura de un módulo

Cada carpeta dentro de `src/modules` mantiene la siguiente organización:

```
module/
├─ domain/         → Modelos y tipos de negocio
├─ application/    → Hooks de control (casos de uso)
├─ infrastructure/ → Servicios de API o adaptadores
└─ ui/             → Componentes de presentación
```

Un ejemplo completo puede verse en `src/modules/user` donde se gestionan los usuarios del sistema.

- `domain/user-model.ts` define las interfaces `IUser` y tipos relacionados.
- `infrastructure/user-service.ts` extiende `BaseService` para realizar peticiones HTTP.
- `application/useUserController.tsx` se encarga de manejar estado, notificaciones y llamadas al servicio.
- `application/useUserUI.tsx` gestiona la apertura de modales y eventos de interfaz.
- `ui/UserView.tsx` compone tablas, formularios y modales para mostrar la vista final.

Cada módulo exporta su vista principal desde `index.tsx`, la cual es utilizada en las páginas de Next.js correspondientes.

## Componentes y libs comunes

En `src/common` se encuentran piezas reutilizables que simplifican el desarrollo:

- **components/** – Conjunto de componentes de UI (botones inteligentes, tablas, modales, etc.).
- **hooks/** – Hooks personalizados como `useColorMode` o `useSessionExpiration`.
- **libs/** – Servicios genéricos (`api-services`, `base-services`) que abstraen la comunicación con la API.
- **utils/** – Funciones auxiliares para manejo de usuario, sesiones y exportación de datos.

Puedes consultar cada apartado en los documentos dedicados dentro de la carpeta `docs/`.

## Flujo de datos

1. Una página de Next.js importa la vista principal de un módulo.
2. La vista utiliza hooks de `application` para obtener datos y manejar acciones del usuario.
3. Dichos hooks delegan las peticiones a los servicios de `infrastructure`, los cuales consumen las librerías de `common/libs` para comunicarse con la API.
4. El estado global relevante se maneja con Redux y se encuentra configurado en `src/config/store.ts`.

Este flujo asegura que la lógica de negocio permanezca desacoplada de la presentación y que cualquier interacción externa (APIs, almacenamiento) esté confinada a la infraestructura.

## Estilos y temas

El tema global se define en `src/config/theme.ts` y es aplicado mediante `ColorModeProvider`. Se soportan modo claro y oscuro, y los componentes de Material UI respetan la configuración para mantener una apariencia coherente en todo el proyecto.

## Ejecución y desarrollo

- `npm run dev` inicia el servidor de desarrollo con Turbopack.
- `npm run build` genera la versión de producción.
- `npm run start` levanta la aplicación compilada.
- `npm run lint` ejecuta ESLint para mantener la calidad del código.

Para más detalles específicos de componentes, hooks y utilidades, revisa los demás documentos dentro de `docs/`.


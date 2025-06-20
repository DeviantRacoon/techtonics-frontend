# Techtonics Frontend

Este repositorio contiene el frontend base para proyectos de Techtonics. Se ha construido sobre **Next.js**, **TypeScript** y **Material UI** con la finalidad de ofrecer una base sólida, escalable y de rápida adopción. La idea es que cualquier equipo pueda levantar una interfaz profesional en poco tiempo y mantenerla con el mínimo esfuerzo.

## Objetivos del proyecto

- **Facilidad de mantenimiento**: una estructura modular basada en dominios simplifica la incorporación de nuevas funcionalidades.
- **Escalabilidad**: cada módulo es independiente y puede evolucionar sin afectar al resto del sistema.
- **Curva de aprendizaje corta**: se siguen buenas prácticas y el código está acompañado de documentación clara.

## Estructura principal

La mayor parte del código vive dentro de `src/` y se organiza del siguiente modo:

```
src/
├─ common/   # Componentes, hooks y librerías reutilizables
├─ modules/  # Funciones de negocio divididas por dominio
├─ config/   # Configuración global (rutas, tema, store de Redux)
├─ pages/    # Rutas de Next.js
└─ styles/   # Estilos globales
```

Cada módulo dentro de `src/modules` sigue un pequeño esquema en capas (`domain`, `application`, `infrastructure`, `ui`). Puedes conocer más detalles en el archivo [docs/architecture.md](docs/architecture.md).

## Instalación rápida

1. Clona el repositorio y copia `env.EXAMPLE` a `.env` rellenando los valores necesarios.
2. Ejecuta `npm install` para instalar las dependencias.
3. Arranca el entorno de desarrollo con:

```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:3000` por defecto.

## Comandos disponibles

- `npm run dev` &mdash; Levanta el servidor de desarrollo con Turbopack.
- `npm run build` &mdash; Genera la versión optimizada para producción.
- `npm run start` &mdash; Ejecuta la app ya compilada.
- `npm run lint` &mdash; Revisa la calidad del código con ESLint.

## Documentación adicional

En la carpeta `docs/` encontrarás documentos con información específica sobre:

- Estructura de módulos
- Componentes comunes
- Hooks y utilidades
- Middleware de Next.js

Consulta esos archivos para profundizar en cada tema.

## Contribuir

Las contribuciones son bienvenidas. Abre un _pull request_ con una descripción clara de tu cambio. Procura mantener un estilo de código consistente y ejecutar `npm run lint` antes de enviar tu propuesta.

---

Techtonics Frontend está pensado para servir como punto de partida en nuevos proyectos, facilitando un desarrollo ágil sin sacrificar orden ni mantenibilidad.

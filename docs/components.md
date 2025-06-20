# Componentes Comunes

Este proyecto incluye una colección de componentes reutilizables basados en Material UI.
A continuación se describen sus props principales y un ejemplo básico de uso.

## SmartButton

Botón personalizable con indicador de carga.

### Props
- `label` *(string, requerido)*: Texto a mostrar.
- `onClick?` *(function)*: Handler al hacer clic.
- `variant?` *("contained" | "outlined" | "text")*: Estilo MUI. Por defecto `contained`.
- `size?` *("small" | "medium" | "large")*: Tamaño. Por defecto `medium`.
- `type?` *("button" | "submit" | "reset")*: Tipo de botón.
- `fullWidth?` *(boolean)*: Ocupa todo el ancho.
- `disabled?` *(boolean)*: Desactiva el botón.
- `hidden?` *(boolean)*: Oculta el botón visualmente.
- `loading?` *(boolean)*: Muestra spinner.
- `leftIcon?` *(ReactNode)*: Ícono opcional a la izquierda.

```tsx
<SmartButton label="Guardar" onClick={handleSave} leftIcon={<SaveIcon />} />
```

## SmartInput

Campo de texto con validaciones integradas.

### Props Principales
- `name?` *(string)*
- `type?` *(string)*: `text`, `password`, `email`...
- `placeholder?` *(string)*
- `label?` *(string)*
- `required?` *(boolean)*
- `minLength?` *(number)*
- `maxLength?` *(number)*
- `pattern?` *{{ value: RegExp; message?: string }}*
- `leftIcon?` *(ReactNode)*
- `disabled?` *(boolean)*

El componente expone un **ref** (`SmartInputRef`) con métodos `isValid()`, `getValue()` y `validate()`.

```tsx
const inputRef = useRef<SmartInputRef>(null)

<SmartInput ref={inputRef} label="Usuario" required />
```

## SmartSelect

Selector con soporte para selección múltiple y búsquedas.

### Props Principales
- `options` *(Array<{ label:string; value:string }>, requerido)*
- `multiple?` *(boolean)*
- `defaultValue?` *(string | string[])*
- `onChange?` *(function)*
- `maxVisibleTags?` *(number)*: Número de chips visibles antes de mostrar modal.

```tsx
<SmartSelect
  label="Roles"
  options={catalogs.profiles}
  multiple
/>
```

## SmartTable

Tabla avanzada documentada en [README_SmartTable](./README_SmartTable.md). Soporta filtros,
ordenamiento, paginación y acciones por fila.

## Otros Componentes
- `Header`: Encabezado de página con título, descripción e íconos.
- `Modal` y `ModalForm`: Diálogos reutilizables para formularios.
- `ConfirmModal`: Modal de confirmación simple.
- `SmartDatePicker`: Campo de fecha basado en MUI.
- `ToastProvider`: Contexto para mostrar notificaciones.
- `ThemedIcon`: Muestra un ícono SVG con colores adaptados al tema.
- `SmartFileInput`: Campo para subir archivos.

Estos componentes se exportan desde `src/common/components/index.ts`.

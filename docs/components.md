# Componentes Comunes

Este proyecto utiliza una serie de componentes de interfaz construidos sobre **Material UI**. Están pensados para ser reutilizables en cualquier módulo de la aplicación. A continuación se describen sus props más importantes y se dan ejemplos de uso para que un desarrollador externo pueda integrarlos rápidamente.

## SmartButton
Botón con soporte para indicador de carga e iconos.

### Props principales
- `label` *(string, requerido)*: Texto mostrado en el botón y usado para generar el `id`.
- `onClick?` *(function)*: Callback al hacer clic.
- `variant?` *("contained" | "outlined" | "text")*: Estilo visual. Por defecto `contained`.
- `size?` *("small" | "medium" | "large")*: Tamaño del botón.
- `type?` *("button" | "submit" | "reset")*: Tipo de elemento HTML.
- `fullWidth?` *(boolean)*: Ocupa todo el ancho disponible.
- `disabled?` *(boolean)*: Deshabilita el botón.
- `hidden?` *(boolean)*: Mantiene la accesibilidad pero oculta el botón.
- `loading?` *(boolean)*: Muestra un `CircularProgress` integrado.
- `leftIcon?` *(ReactNode)*: Ícono decorativo a la izquierda.

```tsx
<SmartButton label="Guardar" onClick={handleSave} leftIcon={<SaveIcon />} />
```

## SmartInput
Campo de texto con validaciones y referencia imperativa.

### Props principales
- `name?` *(string)*
- `type?` *(string)*: `text`, `password`, `email`, etc.
- `placeholder?` *(string)*
- `label?` *(string)*
- `required?` *(boolean)*
- `minLength?` *(number)*
- `maxLength?` *(number)*
- `pattern?` *{{ value: RegExp; message?: string }}*
- `leftIcon?` *(ReactNode)*
- `disabled?` *(boolean)*

El componente expone un **ref** (`SmartInputRef`) con los métodos `isValid()`, `getValue()` y `validate()` para validar manualmente.

```tsx
const inputRef = useRef<SmartInputRef>(null);

<SmartInput ref={inputRef} label="Usuario" required />
```

## SmartSelect
Selector con autocompletado y soporte para múltiples valores.

### Props principales
- `options` *(Array<{ label: string; value: string }>, requerido)*
- `multiple?` *(boolean)*
- `defaultValue?` *(string | string[])*
- `onChange?` *(function)*
- `maxVisibleTags?` *(number)*: Límite de chips visibles antes de mostrar un modal con los seleccionados.
- `required?` *(boolean)*
- `disabled?` *(boolean)*

```tsx
<SmartSelect
  label="Roles"
  options={catalogs.profiles}
  multiple
/>
```

## SmartFileInput
Entrada para carga de archivos con validación de extensiones y tamaño.

### Props principales
- `label` *(string, requerido)*
- `allowedTypes?` *(string[])*: Tipos MIME permitidos. Por defecto imágenes y PDF.
- `maxSizeMb?` *(number)*: Tamaño máximo por archivo en MB (1MB por defecto).
- `required?` *(boolean)*
- `multiple?` *(boolean)*
- `defaultValue?` *(string)*: URL de un archivo ya existente.
- `onChange?` *(files: File[]) => void*
- `disabled?` *(boolean)*

El ref (`SmartFileInputRef`) expone `isValid()`, `getValue()` y `validate()`.

## SmartDatePicker
Componente de selección de fecha basado en `@mui/x-date-pickers`.

### Props principales
- `label?` *(string)*
- `name?` *(string)*
- `defaultValue?` *(string)*: ISO string.
- `minDate?` *(Date)* / `maxDate?` *(Date)*
- `required?` *(boolean)*
- `disabled?` *(boolean)*
- `fullWidth?` *(boolean)*
- `validateDate?` *(date: Date | null) => string | null*: Permite agregar validaciones personalizadas.

Se controla mediante un ref (`SmartDateInputRef`) con métodos similares al resto de campos.

## Modal
Componente básico para mostrar diálogos animados. Permite tamaños (`sm`, `md`, `lg`, `xl`), modo `fullscreen` y cierre por `Escape`.

```tsx
<Modal isOpen={open} onClose={() => setOpen(false)} size="md">
  Contenido aquí
</Modal>
```

## ModalForm
Construye formularios dinámicos a partir de un esquema de campos. Internamente usa `SmartInput`, `SmartSelect` y `SmartFileInput`.

Props más relevantes:
- `isOpen` *(boolean, requerido)*
- `onClose` *(function, requerido)*
- `onSubmit` *(values: Record<string, any>) => void*
- `schema` *(FieldSchema[], requerido)*: Define los campos, tipos y reglas.
- `title?` y `description?`
- `confirmText?` y `cancelText?`
- `loading?` *(boolean)*
- `readOnly?` *(boolean)*

## ConfirmModal
Modal rápido para confirmar acciones. Recibe `onConfirm`, `onClose`, textos y variante (`info`, `warning`, `success`, `error`). Muestra un ícono acorde y dos botones.

## Header
Encabezado de página con soporte para icono, título, descripción, breadcrumbs y acciones.

```tsx
<Header
  icon={<DashboardIcon />}
  title="Dashboard"
  description="Resumen de la aplicación"
  actions={<SmartButton label="Nueva" onClick={...} />}
/>
```

## ToastProvider y useToast
Contexto global para mostrar notificaciones flotantes. Utiliza `framer-motion` para animaciones e incluye variantes `success`, `error`, `warning` e `info`.

```tsx
const { show } = useToast();
show('Guardado', { variant: 'success' });
```

## ThemedIcon
Muestra un ícono SVG que se invierte automáticamente en modo oscuro.

```tsx
<ThemedIcon src="/assets/svg/edit.svg" alt="editar" width={20} />
```

## ColorModeProvider
Envuelve la aplicación y expone un contexto para alternar entre modo claro y oscuro. Guarda la preferencia en `localStorage`.

## SmartTable
Sistema de tabla avanzado que incluye búsqueda, ordenamiento, filtros dinámicos y paginación.

### Características principales
- Ordenamiento de columnas.
- Filtros (`select`, `checkbox`, `date`, `daterange`, `text`).
- Paginación integrada.
- Acciones por fila mediante menús.
- Renderizado especial según el tipo de columna (`status`, `money`, `image`, etc.).

### Ejemplo básico
```tsx
import SmartTable from '@/common/components/SmartTable/SmartTable'
import type { Column, FilterDefinition } from '@/common/components/SmartTable/types'

const columns: Column[] = [
  { id: 'name', label: 'Nombre' },
  { id: 'status', label: 'Estado', type: 'status', align: 'center' }
]

const filters: FilterDefinition[] = [
  {
    id: 'status',
    label: 'Estado',
    type: 'select',
    options: [
      { label: 'Activo', value: '1' },
      { label: 'Inactivo', value: '0' }
    ]
  }
]

const rows = [
  { id: 1, name: 'Juan Pérez', status: '1' },
  { id: 2, name: 'Ana Torres', status: '0' }
]

<SmartTable
  columns={columns}
  rows={rows}
  filters={filters}
  actions={[{ label: 'Editar', onClick: (row) => console.log(row) }]}
/>
```

### Props principales (`ISmartTableProps`)
| Prop         | Tipo                   | Descripción |
|--------------|-----------------------|-------------|
| `columns`    | `Column[]`            | Columnas a mostrar |
| `rows`       | `Row[]`               | Datos de la tabla |
| `filters?`   | `FilterDefinition[]`  | Filtros disponibles |
| `actions?`   | `Action[]`            | Acciones por fila |
| `onClick?`   | `(row: Row) => void`  | Click en una fila |
| `loading?`   | `boolean`             | Muestra skeletons |

### Tipos relevantes
```ts
interface Column {
  id: string
  label: string
  type?: ColumnType
  align?: 'left' | 'center' | 'right'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  tooltip?: boolean
  render?: (value: any, row: Row) => React.ReactNode
  headerRender?: () => React.ReactNode
}

type Row = Record<string, any> & { id: string | number }

interface Action {
  label: string
  icon?: React.ReactNode
  onClick: (row: Row) => void
  hidden?: boolean
}

interface FilterDefinition {
  id: string
  label: string
  type?: 'select' | 'checkbox' | 'date' | 'daterange' | 'text'
  options?: { label: string; value: string }[]
}
```

El hook `useSmartTable` gestiona la lógica de búsqueda, filtros, ordenamiento y paginación.

---

Todos los componentes mencionados se exportan desde `src/common/components/index.ts`.

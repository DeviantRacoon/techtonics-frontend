# 📊 `SmartTable` + `SmartFilter` — Sistema de tabla avanzada reutilizable

Componente de tabla profesional, altamente personalizable y extensible. Diseñado para escalar en aplicaciones complejas con soporte para:

- Ordenamiento
- Filtros dinámicos (`select`, `checkbox`, `date`, `daterange`, `text`)
- Paginación
- Acciones por fila
- Renderizado por tipo (`status`, `money`, `image`, etc.)
- Soporte completo para TypeScript

---

## 🧱 Estructura de componentes

```
SmartTable/
├── SmartTable.tsx
├── SmartTableHeader.tsx
├── SmartTableBody.tsx
├── useSmartTable.ts
├── SmartFilter/
│   ├── index.tsx
│   ├── SmartFilterInput.tsx
│   ├── SmartFilterButtons.tsx
│   └── SmartFilterMenu.tsx
├── types.ts
└── constants.ts
```

---

## 📦 Instalación y dependencias

Requiere:

- `@mui/material`
- `date-fns`
- `@emotion/react`
- Tipado global de React 18+

---

## ✅ Ejemplo de uso básico

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
  actions={[
    {
      label: 'Editar',
      onClick: (row) => console.log('Editar:', row)
    }
  ]}
/>
```

---

## ⚙️ Props del componente

### `ISmartTableProps`

| Prop             | Tipo                              | Descripción |
|------------------|-----------------------------------|-------------|
| `columns`        | `Column[]`                        | Columnas de la tabla |
| `rows`           | `Row[]`                           | Datos a mostrar |
| `filters?`       | `FilterDefinition[]`              | Filtros disponibles |
| `actions?`       | `Action[]`                        | Acciones por fila (menú contextual) |
| `onClick?`       | `(row: Row) => void`              | Callback al hacer click en una fila |
| `loading?`       | `boolean`                         | Muestra skeletons |
| **Interno:**     | Usa `useSmartTable()`             | Para búsqueda, filtros, orden, página |

---

## 📋 Tipos de columna (`Column.type`)

```ts
type ColumnType =
  | 'text'
  | 'number'
  | 'status'
  | 'date'
  | 'datetime'
  | 'money'
  | 'percentage'
  | 'image'
```

Soporta `tooltip`, alineación, tamaño y render personalizado.

---

## 🔎 Sistema de Filtros Avanzados

### Tipos disponibles (`FilterDefinition.type`):

```ts
type FilterType = 'select' | 'checkbox' | 'date' | 'daterange' | 'text'
```

### Ejemplo completo

```ts
const filters: FilterDefinition[] = [
  {
    id: 'status',
    label: 'Estado',
    type: 'checkbox',
    options: [
      { label: 'Activo', value: '1' },
      { label: 'Inactivo', value: '0' }
    ]
  },
  {
    id: 'createdAt',
    label: 'Fecha de registro',
    type: 'daterange'
  }
]
```

---

## 📦 Tipos principales

### `Column`

```ts
interface Column {
  id: string;
  label: string;
  type?: ColumnType;
  align?: 'left' | 'center' | 'right';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  tooltip?: boolean;
  render?: (value: any, row: Row) => React.ReactNode;
  headerRender?: () => React.ReactNode;
}
```

### `Row`

```ts
type Row = Record<string, any> & { id: string | number }
```

### `Action`

```ts
interface Action {
  label: string;
  icon?: ReactNode;
  onClick: (row: Row) => void;
  hidden?: boolean;
}
```

### `FilterDefinition`

```ts
interface FilterDefinition {
  id: string;
  label: string;
  type?: FilterType;
  options?: { label: string; value: string }[];
}
```

## 🚀 Buenas prácticas integradas

- Uso de `React.memo`, `useCallback`, `useMemo`
- División clara por responsabilidades
- Tipado fuerte con extensibilidad
- Arquitectura lista para SSR / SSG (Next.js compatible)
- UX refinado con soporte móvil (`useMediaQuery`)

---

## 🧪 Ejemplo completo

```tsx
<SmartTable
  columns={[
    { id: 'nombre', label: 'Nombre' },
    { id: 'monto', label: 'Monto', type: 'money', align: 'right' }
  ]}
  rows={[
    { id: 1, nombre: 'Juan', monto: 2000 },
    { id: 2, nombre: 'Ana', monto: 3500 }
  ]}
  filters={[
    {
      id: 'rango',
      label: 'Fecha de operación',
      type: 'daterange'
    }
  ]}
  actions={[
    {
      label: 'Ver más',
      onClick: (row) => console.log('Ver:', row)
    }
  ]}
/>
```

---

## ❓¿Preguntas o mejoras?

Este componente está diseñado para escalar y puede ser extendido fácilmente con:

- Columnas agrupadas
- Fijado de columnas (`sticky`)
- Exportación a Excel / CSV
- Soporte para edición inline
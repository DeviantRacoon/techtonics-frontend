import { IMenuItem } from "@/common/models";

import {
  AdminPanelSettings,
  DashboardRounded,
  Inventory,
} from "@mui/icons-material";

export const modulesList: IMenuItem[] = [
  {
    label: "Dashboard",
    icon: <DashboardRounded color="primary" />,
    link: "/home",
    description: "Resumen general del sistema y estadísticas",
    keywords: ["inicio", "home", "estadisticas", "resumen"],
    permission: "dashboard",
  },
  {
    label: "Administración",
    icon: <AdminPanelSettings color="primary" />,
    permission: "dashboard",
    description: "Gestión del sistema",
    keywords: ["configuracion", "ajustes", "administrar", "sistema"],
    submenu: [
      {
        label: "Usuarios",
        link: "/users",
        description: "Gestión de usuarios y permisos",
        keywords: ["usuarios", "permisos", "cuentas"],
        permission: "user_list",
      },
      {
        label: "Roles",
        link: "/profiles",
        description: "Configuración de roles de acceso y permisos",
        keywords: ["roles", "permisos", "accesos"],
        permission: "role_list",
      },
      {
        label: "Unidades de Negocio",
        link: "/business-units",
        description: "Configuración de unidades de negocio",
        keywords: ["unidades", "negocio", "empresas"],
        permission: "business_unit_list",
      },
      {
        label: "Sesiones",
        link: "/sessions",
        description: "Listado de sesiones activas",
        keywords: ["sesiones", "logins", "actividad"],
        permission: "session_list",
      },
    ]
  },
  {
    label: "Almacén",
    icon: <Inventory color="primary" />,
    permission: "dashboard",
    description: "",
    keywords: ["almacen", "inventario", "bodega"],
    submenu: [
      {
        label: "Productos",
        link: "/products",
        description: "Almacén de productos",
        keywords: ["productos", "inventario", "items"],
        permission: "product_list",
      },
      {
        label: "Movimientos",
        link: "/movements",
        description: "Movimientos de productos en el almacén",
        keywords: ["movimientos", "entradas", "salidas", "transacciones"],
        permission: "product_movement_list",
      },
      {
        label: "Cortes",
        link: "/cut-offs",
        description: "Listado de cortes",
        keywords: ["cortes", "arqueos", "cuadre"],
        permission: "cut_off_list",
      },
    ]
  }
];

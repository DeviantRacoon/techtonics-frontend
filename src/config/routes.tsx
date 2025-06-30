import { IMenuItem } from "@/common/models";

import {
  AdminPanelSettings,
  DashboardRounded,
  Inventory,
  ChatBubbleOutline,
} from "@mui/icons-material";

export const modulesList: IMenuItem[] = [
  {
    label: "Dashboard",
    icon: <DashboardRounded color="primary" />,
    link: "/home",
    description: "Resumen general del sistema y estadísticas",
    permission: "dashboard",
  },
  {
    label: "Chat",
    icon: <ChatBubbleOutline color="primary" />,
    link: "/chat",
    description: "Comunicación entre usuarios",
    permission: "dashboard",
  },
  {
    label: "Administración",
    icon: <AdminPanelSettings color="primary" />,
    permission: "dashboard",
    description: "Gestión del sistema",
    submenu: [
      {
        label: "Usuarios",
        link: "/users",
        description: "Gestión de usuarios y permisos",
        permission: "user_list",
      },
      {
        label: "Roles",
        link: "/profiles",
        description: "Configuración de roles de acceso y permisos",
        permission: "role_list",
      },
      {
        label: "Unidades de Negocio",
        link: "/business-units",
        description: "Configuración de unidades de negocio",
        permission: "business_unit_list",
      },
      {
        label: "Sesiones",
        link: "/sessions",
        description: "Listado de sesiones activas",
        permission: "session_list",
      },
    ]
  },
  {
    label: "Almacén",
    icon: <Inventory color="primary" />,
    permission: "dashboard",
    description: "",
    submenu: [
      {
        label: "Productos",
        link: "/products",
        description: "Almacén de productos",
        permission: "product_list",
      },
      {
        label: "Movimientos",
        link: "/movements",
        description: "Movimientos de productos en el almacén",
        permission: "product_movement_list",
      },
      {
        label: "Cortes",
        link: "/cut-offs",
        description: "Listado de cortes",
        permission: "cut_off_list",
      },
    ]
  }
];

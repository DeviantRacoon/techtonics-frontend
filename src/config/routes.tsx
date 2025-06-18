import { IMenuItem } from "@/common/models";

import {
  AdminPanelSettings,
  DashboardRounded,
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
    label: "Administración",
    icon: <AdminPanelSettings color="primary" />,
    permission: "dashboard",
    description: "Listado de proyectos",
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
        label: "Sesiones",
        link: "/sessions",
        description: "Listado de sesiones activas",
        permission: "role_list",
      },
    ]
  }
];

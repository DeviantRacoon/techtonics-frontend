import { IMenuItem } from "@/common/models";

import {
  PeopleAltRounded,
  AssignmentInd,
  DashboardRounded,
  Settings,
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
    label: "Usuarios",
    icon: <PeopleAltRounded color="primary" />,
    link: "/users",
    description: "Gestión de usuarios y permisos",
    permission: "user_list",
  },
  {
    label: "Roles",
    icon: <AssignmentInd color="primary" />,
    link: "/profiles",
    description: "Configuración de roles de acceso y permisos",
    permission: "role_list",
  },
  {
    label: "Sesiones",
    icon: <Settings color="primary" />,
    link: "/sessions",
    description: "Listado de sesiones activas",
    permission: "role_list",
  },
];

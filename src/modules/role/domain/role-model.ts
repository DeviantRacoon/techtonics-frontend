export interface IRole {
  roleId?: number;
  roleName?: string;
  status?: RoleStatus;
  permissions?: IPermission[];
  createdAt?: string;
  updatedAt?: string;
}

enum RoleStatus {
  ACTIVE = 'ACTIVO',
  DELETED = 'ELIMINADO',
}

export interface IPermission {
  permissionId?: number;
  permissionName?: string;
}
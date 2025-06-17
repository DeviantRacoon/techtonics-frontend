export interface IUserLogin {
  userId: number;
  email: string;
  code: string;
  username: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  role: {
    roleId: number;
    roleName: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    permissions: {
      permissionId: number;
      permissionName: string;
    }[];
  };
  allowedPermissions: string[];
}


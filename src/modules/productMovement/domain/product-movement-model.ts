import { IUser } from "@/modules/user";

export interface IProductMovement {
  businessUnitId?: number;
  businessUnitEmail?: string;
  businessUnitLogo?: string;
  businessUnitName?: string;
  user?: IUser[];
  status?: STATUS_PRODUCT_MOVEMENT;
  createdAt?: string;
}

export enum STATUS_PRODUCT_MOVEMENT {
  ACTIVE = "ACTIVO",
  INACTIVE = "INACTIVO",
  DELETED = "ELIMINADO",
}
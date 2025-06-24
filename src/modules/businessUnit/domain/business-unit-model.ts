import { IUser } from "@/modules/user";

export interface IBusinessUnit {
  businessUnitId?: number;
  businessUnitEmail?: string;
  businessUnitLogo?: string;
  businessUnitName?: string;
  user?: IUser[];
  status?: STATUS_BUSINESS_UNIT;
  createdAt?: string;
}

export enum STATUS_BUSINESS_UNIT {
  ACTIVE = "ACTIVO",
  INACTIVE = "INACTIVO",
  DELETED = "ELIMINADO",
}
import { IUser } from "@/modules/user";

export interface ICutOff {
  businessUnitId?: number;
  businessUnitEmail?: string;
  businessUnitLogo?: string;
  businessUnitName?: string;
  user?: IUser[];
  status?: STATUS_CUT_OFF;
  createdAt?: string;
}

export interface IDataModalCutOff {
  cutOffDate: string;
  stockExits: number;
  totalRevenue: number;
  stockEntries: number;
  stockOutputs: number;
}

export enum STATUS_CUT_OFF {
  ACTIVE = "ACTIVO",
  INACTIVE = "INACTIVO",
  DELETED = "ELIMINADO",
}

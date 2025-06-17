import { IRole } from "@/modules/role";

export interface IUser {
  userId?: number;
  personId?: number;
  email?: string;
  password?: string;
  code?: string;
  status?: UserStatus;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
  person?: IPerson;
  role?: IRole;
}

export enum UserStatus {
  ACTIVE = "ACTIVO",
  INACTIVE = "INACTIVO",
  PENDING = "PENDIENTE",
  DELETED = "ELIMINADO",
}

export interface IPerson {
  personId?: number;
  names?: string;
  lastName?: string;
  secondLastName?: string;
  curp?: string;
  gender?: Gender;
  cellphone?: string;
  status?: PersonStatus;
  createdAt?: string;
  updatedAt?: string;
  birthdate?: string;
}

export enum PersonStatus {
  ACTIVE = "ACTIVO",
  DELETED = "ELIMINADO",
}

export enum Gender {
  FEMALE = "F",
  MALE = "M",
}
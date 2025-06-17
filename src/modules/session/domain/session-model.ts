import { IUser } from "@/modules/user";

export interface IUserSession {
  sessionId?: number;
  userId?: number;
  token?: string;
  device?: string;
  ip?: string;
  user?: IUser;
  status?: STATUS_SESSION;
  createdAt?: string;
  expiresAt?: string;
}

export enum STATUS_SESSION {
  ACTIVE = "ACTIVO",
  DELETED = "ELIMINADO",
  BAN = "BANEADO",
}


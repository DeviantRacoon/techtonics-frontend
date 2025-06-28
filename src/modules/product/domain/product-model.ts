import { IBusinessUnit } from "@/modules/businessUnit";
import { IUser } from "@/modules/user";

export interface IProduct {
  productId?: number;
  productName: string;
  productImage?: string;
  productCode?: string;
  productDescription?: string;
  productPrice: number;
  businessUnitId?: number;
  type: TYPE_PRODUCT;
  stock: number;
  createdBy?: string;
  status?: STATUS_PRODUCT;
  createdAt?: string;
  updatedAt?: string;
  businessUnit?: IBusinessUnit
  user?: IUser
}

export enum STATUS_PRODUCT {
  ACTIVE = "ACTIVO",
  DELETED = "ELIMINADO",
  OUT_OF_STOCK = "AGOTADO",
}

export enum TYPE_PRODUCT {
  STORAGE = "ALMACEN",
  SERVICE = "SERVICIO",
}
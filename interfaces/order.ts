import { IValidSizes } from "./products";
import { IUser } from "./user";

export interface IOrder {
  _id?: string;
  isPaid: boolean;
  numberOfItems: number;
  orderItems: IOrderItem[];
  paidAt?: string;
  paymentResult?: string;
  shippingAddress: ShippingAddress;
  subtotal: number;
  taxes: number;
  total: number;
  transactionId?: String;
  user?: IUser | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderItem {
  _id: string;
  gender: "men" | "women" | "kid" | "unisex";
  image: string;
  price: number;
  quantity: number;
  size: IValidSizes;
  slug: string;
  title: string;
}

export interface ShippingAddress {
  address: string;
  address2?: string;
  city: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  zip: string;
}

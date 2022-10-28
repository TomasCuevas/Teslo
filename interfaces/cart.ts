import { IValidSizes } from "./products";

export interface ICartProduct {
  _id: string;
  image: string;
  inStock: number;
  price: number;
  size?: IValidSizes;
  slug: string;
  title: string;
  gender: "men" | "women" | "kid" | "unisex";
  quantity: number;
}

import useSWRInmutable from "swr/immutable";

//* interfaces *//
import { IProduct } from "../interfaces/products";

interface Returns {
  products: IProduct[] | [];
}

export const useGetProducts = (url: string): Returns => {
  const { data: products = [], error } = useSWRInmutable<IProduct[]>(`/api/${url}`);

  return {
    products,
  };
};

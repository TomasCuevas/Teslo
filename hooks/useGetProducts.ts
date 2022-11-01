import useSWR from "swr";

//* interfaces *//
import { IProduct } from "../interfaces/products";

interface Returns {
  products: [] | IProduct[];
}

export const useGetProducts = (url: string): Returns => {
  const { data: products = [], error } = useSWR<IProduct[]>(`/api/${url}`);

  return {
    products,
  };
};

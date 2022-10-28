import useSWR from "swr";

//* interfaces *//
import { IProduct } from "../interfaces/products";

interface Returns {
  products: [] | IProduct[];
  isLoading: boolean;
  isError: any;
}

export const useProducts = (url: string): Returns => {
  const { data, error } = useSWR<IProduct[]>(`/api/${url}`);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

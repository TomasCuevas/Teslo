/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useSWRInmutable from "swr/immutable";

//* interfaces *//
import { IProduct } from "../interfaces/products";

interface Return {
  error: boolean;
  products: IProduct[];
}

export const useSearchProducts = (query: string): Return => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const { data: searchProducts, error: searchError } = useSWRInmutable(
    `/api/search/${query}`
  );
  const { data: allProducts, error: allError } =
    useSWRInmutable("/api/products");

  useEffect(() => {
    if (searchProducts) {
      setProducts(searchProducts);
      setError(false);
      return;
    }
    if (!searchProducts && allProducts) {
      setProducts(allProducts);
      setError(true);
      return;
    }
  }, [searchProducts]);

  return {
    error,
    products,
  };
};

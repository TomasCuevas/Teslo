import { useRouter } from "next/router";
import useSWRInmutable from "swr/immutable";

//* interfaces *//
import { IProduct } from "../interfaces/products";
import { IError } from "../interfaces/error";

interface Return {
  product: IProduct;
}

export const useGetProduct = (slug: string, redirectTo = "/"): Return => {
  const { data: product, error } = useSWRInmutable(`/api/products/${slug}`);
  const router = useRouter();

  if (error) {
    if ((error as IError).status === 500) router.push(redirectTo);
    if ((error as IError).status === 404) router.push(redirectTo);
  }

  return {
    product,
  };
};

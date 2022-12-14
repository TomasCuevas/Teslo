import { useRouter } from "next/router";
import useSWRInmutable from "swr/immutable";

//* interface *//
import { IProduct } from "../interfaces/products";
import { IError } from "../interfaces/error";

interface Return {
  product: IProduct;
}

export const useGenerateNewProduct = (): Return => {
  const { data: product, error } = useSWRInmutable(
    "/api/admin/products/generate"
  );
  const router = useRouter();

  if (error) {
    if ((error as IError).status === 500) router.push("/admin/products");
  }

  if (product) {
    delete product._id;
  }

  return {
    product,
  };
};

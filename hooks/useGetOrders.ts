import { useRouter } from "next/router";
import useSWRInmutable from "swr/immutable";

//* interfaces *//
import { IOrder } from "../interfaces/order";
import { IError } from "../interfaces/error";

interface Return {
  orders: IOrder[] | undefined;
}

export const useGetOrders = (url: string, query = "/"): Return => {
  const { data: orders, error } = useSWRInmutable<IOrder[]>(url, {
    refreshInterval: 30 * 1000,
  });
  const router = useRouter();

  if (error) {
    if ((error as IError).status === 401) router.push(`/auth/login?p=${query}`);
    if ((error as IError).status === 500) router.push(`/`);
  }

  return {
    orders,
  };
};

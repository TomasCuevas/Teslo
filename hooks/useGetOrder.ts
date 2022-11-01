import { useRouter } from "next/router";
import useSWRInmutable from "swr/immutable";

//* interfaces *//
import { IOrder } from "../interfaces/order";
import { IError } from "../interfaces/error";

interface Return {
  order: IOrder | undefined;
}

export const useGetOrder = (id: string, query = "/"): Return => {
  const { data: order, error } = useSWRInmutable<IOrder>(`/api/orders/${id}`);
  const router = useRouter();

  if (error && id) {
    if ((error as IError).status === 401) router.push(`/auth/login?p=${query}`);
    if ((error as IError).status === 404) router.push(`/orders/history`);
    if ((error as IError).status === 500) router.push(`/orders/history`);
  }

  return {
    order,
  };
};

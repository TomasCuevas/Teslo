import { useRouter } from "next/router";
import useSWR from "swr";

//* interfaces *//
import { IOrder } from "../interfaces/order";
import { IError } from "../interfaces/error";

interface Props {
  query?: string;
}

interface Return {
  orders: IOrder[] | undefined;
}

export const useGetOrders = ({ query = "/" }: Props): Return => {
  const { data: orders, error } = useSWR<IOrder[]>("/api/orders/all");
  const router = useRouter();

  if (error) {
    if ((error as IError).status === 401) router.push(`/auth/login?p=${query}`);
    if ((error as IError).status === 500) router.push(`/`);
  }

  return {
    orders,
  };
};

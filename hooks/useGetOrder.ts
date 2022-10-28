import { useRouter } from "next/router";
import useSWR from "swr";

//* interfaces *//
import { IOrder } from "../interfaces/order";
import { IError } from "../interfaces/error";

interface Props {
  id: string;
  query?: string;
}

interface Return {
  order: IOrder | undefined;
}

export const useGetOrder = ({ id, query = "/" }: Props): Return => {
  const { data: order, error } = useSWR<IOrder>(`/api/orders/${id}`);
  const router = useRouter();

  if (error) {
    if ((error as IError).status === 401) router.push(`/auth/login?p=${query}`);
    if ((error as IError).status === 404) router.push(`/orders/history`);
    if ((error as IError).status === 500) router.push(`/orders/history`);
  }

  return {
    order,
  };
};

/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CircularProgress } from "@mui/material";

//* icons *//
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

//* layout *//
import { ShopLayout } from "../../components/layouts";

//* components *//
import {
  CardList,
  OrderSummary,
  Chip,
  OrderDirection,
  FullScreenLoading,
} from "../../components";

//* hooks *//
import { useGetOrder } from "../../hooks/useGetOrder";

//* api *//
import tesloApi from "../../axios/tesloApi";

//* interfaces *//
import { OrderResponseBody } from "../../interfaces/paypal";

const OrderPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [isPaying, setIsPaying] = useState<boolean>(false);
  const { order } = useGetOrder(id, `/api/orders/${id}`, `/orders/${id}`);

  if (order) {
    const { shippingAddress } = order;

    const onOrderCompleted = async (details: OrderResponseBody) => {
      if (details.status !== "COMPLETED") {
        return alert("No se pudo realizar el pago en PayPal");
      }

      setIsPaying(true);

      try {
        await tesloApi.post("/orders/pay", {
          transactionId: details.id,
          orderId: order._id,
        });

        router.reload();
      } catch (error) {
        setIsPaying(false);
        alert(error);
      }
    };

    return (
      <ShopLayout
        title={`Resumen de la orden ${order._id}`}
        pageDescription="Resumen de la orden"
      >
        <h1 className="mb-1 animate-fadeIn break-words text-2xl font-bold text-primary lg:text-3xl">
          Orden: <strong className="text-gray">{order._id}</strong>
        </h1>

        <div className="flex animate-fadeIn flex-col gap-5 sm:flex-row">
          <section className="flex w-full flex-col gap-5 sm:w-8/12">
            <div className={order.isPaid ? "my-4" : "hidden"}>
              <Chip
                status="success"
                text="Pagada"
                icon={<CreditScoreOutlined />}
              />
            </div>
            <div className={order.isPaid ? "hidden" : "my-4"}>
              <Chip
                status="pending"
                text="Pendiente de Pago"
                icon={<CreditCardOffOutlined />}
              />
            </div>
            <CardList products={order.orderItems} />
          </section>
          <section className="w-full sm:w-4/12">
            <h2 className="text-lg text-gray sm:text-xl">
              Resumen ({order.numberOfItems}) productos
            </h2>
            <hr className="my-4 text-gray/30" />
            <OrderDirection
              shippingAddressProps={shippingAddress}
              editable={false}
            />
            <hr className="my-4 text-gray/30" />
            <OrderSummary summary={order} />
            <div className="mt-5 w-full">
              <div
                className={
                  isPaying ? "flex animate-fadeIn justify-center" : "hidden"
                }
              >
                <CircularProgress />
              </div>
              <div className={order.isPaid ? "flex w-full" : "hidden"}>
                <Chip
                  status="success"
                  text="Pagada"
                  icon={<CreditScoreOutlined />}
                />
              </div>
              <div
                className={
                  order.isPaid || isPaying
                    ? "hidden"
                    : "relative z-0 flex w-full flex-col"
                }
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: `${order.total}`,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then((details) => {
                      onOrderCompleted(details);
                    });
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout
      title="Resumen de la orden"
      pageDescription="Resumen de la orden"
    >
      <FullScreenLoading />
    </ShopLayout>
  );
};

export default OrderPage;

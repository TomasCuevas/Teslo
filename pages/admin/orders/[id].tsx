import { NextPage, GetServerSideProps } from "next";

//* icons *//
import {
  AirplaneTicketOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

//* layout *//
import { AdminLayout } from "../../../components/layouts";

//* components *//
import {
  CardList,
  OrderDirection,
  OrderSummary,
  Chip,
  FullScreenLoading,
} from "../../../components";

//* hooks *//
import { useAdmin } from "../../../hooks";

//* database *//
import { getOrderById } from "../../../database/dbOrders";

//* interfaces *//
import { IOrder } from "../../../interfaces/order";

interface Props {
  order: IOrder;
}

const OrderPageByAdmin: NextPage<Props> = ({ order }) => {
  const { isAdmin } = useAdmin("/", `/admin/orders/${[order._id]}`);
  const { shippingAddress } = order;

  if (isAdmin) {
    return (
      <AdminLayout
        title="Resumen de la orden:"
        subtitle={`${order._id}`}
        icon={<AirplaneTicketOutlined />}
        pageDescription={`Resumen de la orden ${order._id} para administrador`}
      >
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
            <h2 className="'text-lg text-gray sm:text-xl">
              Resumen ({order.numberOfItems}) productos
            </h2>
            <hr className="my-4 text-gray/30" />
            <OrderDirection shippingAddressProps={shippingAddress} />
            <hr className="my-4 text-gray/30" />
            <OrderSummary summary={order} />
            <hr className="my-4 text-gray/30" />
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
          </section>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Resumen de la orden:"
      subtitle={`${order._id}`}
      icon={<AirplaneTicketOutlined />}
      pageDescription={`Resumen de la orden ${order._id} para administrador`}
    >
      <FullScreenLoading />
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = "" } = query;

  const order = await getOrderById(id.toString());
  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPageByAdmin;

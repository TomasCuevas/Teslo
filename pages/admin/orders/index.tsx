import { NextPage } from "next";
import NextLink from "next/link";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

//* icons *//
import { ConfirmationNumberOutlined } from "@mui/icons-material";

//* layout *//
import { AdminLayout } from "../../../components/layouts";

//* components *//
import { Chip, FullScreenLoading } from "../../../components";

//* hooks *//
import { useAdmin, useGetOrders } from "../../../hooks";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Order ID",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "name",
    headerName: "Nombre completo",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "total",
    headerName: "Monto total",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "isPaid",
    headerName: "Pagada",
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip text="Pagada" status="success" />
      ) : (
        <Chip text="No pagada" status="pending" />
      );
    },
  },
  {
    field: "noProducts",
    headerName: "No. Productos",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "createdAt",
    headerName: "Creada en",
    width: 200,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "check",
    headerName: "Ver orden",
    width: 200,
    sortable: false,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/orders/${row.id}`}>
          <a
            target="__blank"
            className="flex h-full w-full items-center justify-center text-center text-secundary/70 underline transition-all duration-300 hover:text-secundary/100"
          >
            <span>Ver orden</span>
          </a>
        </NextLink>
      );
    },
  },
];

//* interfaces *//
import { IUser } from "../../../interfaces/user";

const OrdersPage: NextPage = () => {
  const { isAdmin } = useAdmin("/", "/admin/orders");
  const { orders } = useGetOrders("/api/admin/orders", "/admin/orders");

  if (isAdmin && orders) {
    const rows = orders.map((order) => ({
      id: order._id,
      email: (order.user as IUser).email,
      name: (order.user as IUser).name,
      total: order.total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      noProducts: order.numberOfItems,
      isPaid: order.isPaid,
      createdAt: order.createdAt,
    }));

    return (
      <AdminLayout
        title="Ordenes"
        subtitle="Mantenimiento de ordenes"
        icon={<ConfirmationNumberOutlined />}
        pageDescription="Pagina de mantenimiento de ordenes para administradores"
      >
        <div className="mt-2 animate-fadeIn">
          <div className="h-[650px]">
            <DataGrid
              className="animate-fadeIn"
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Ordenes"
      subtitle="Mantenimiento de ordenes"
      icon={<ConfirmationNumberOutlined />}
      pageDescription="Pagina de mantenimiento de ordenes para administradores"
    >
      <FullScreenLoading />
    </AdminLayout>
  );
};

export default OrdersPage;

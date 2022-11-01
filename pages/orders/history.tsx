import type { NextPage } from "next";
import NextLink from "next/link";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

//* layouts *//
import { ShopLayout } from "../../components/layouts";

//* components *//
import { Chip, FullScreenLoading } from "../../components";

//* hooks *//
import { useGetOrders } from "../../hooks";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "fullname",
    headerName: "Nombre Completo",
    width: 300,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "total",
    headerName: "Monto total",
    width: 150,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "paid",
    headerName: "Pagada",
    width: 200,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip status="success" text="Pagada" />
      ) : (
        <Chip status="error" text="No pagada" />
      );
    },
  },
  {
    field: "noProducts",
    headerName: "No. Productos",
    disableColumnMenu: true,
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "createdAt",
    headerName: "Creada en",
    width: 200,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "order",
    headerName: "Ver orden",
    width: 200,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        row.order && (
          <NextLink href={`/orders/${row.order}`}>
            <a className="flex h-full w-full items-center justify-center text-center text-secundary/70 underline transition-all duration-300 hover:text-secundary/100">
              <span>Ver orden</span>
            </a>
          </NextLink>
        )
      );
    },
  },
];

//* interfaces *//
import { IUser } from "../../interfaces/user";

const HistoryPage: NextPage = () => {
  const { orders } = useGetOrders("/api/orders/all", "/orders/history");

  if (orders) {
    const rows = orders.map((order, index) => ({
      id: index + 1,
      email: (order.user as IUser).email,
      noProducts: order.numberOfItems,
      createdAt: order.createdAt,
      total: order.total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      paid: order.isPaid,
      fullname: (order.user as IUser).name,
      order: order._id,
    }));

    return (
      <ShopLayout
        title="Historial de ordenes"
        pageDescription="Historial de ordenes del cliente"
      >
        <h1 className="mb-1 animate-fadeIn break-words text-2xl font-bold text-primary lg:text-3xl">
          Historial de ordenes
        </h1>
        <div className="mt-2 animate-fadeIn">
          <div className="h-[650px]">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </div>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout
      title="Historial de ordenes"
      pageDescription="Historial de ordenes del cliente"
    >
      <FullScreenLoading />
    </ShopLayout>
  );
};

export default HistoryPage;

import { useEffect, useState } from "react";
import { NextPage } from "next";
import useSWR from "swr";

//* icons *//
import {
  AccessTimeFilledOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";

//* components *//
import { SummaryTile } from "../../components";

//* layout *//
import { AdminLayout, LoadingLayout } from "../../components/layouts";

//* hooks *//
import { useAdmin } from "../../hooks";

//* interfaces *//
import { DashboardSummaryResponse } from "../../interfaces/dashboard";

const DashboardPage: NextPage = () => {
  const [refreshIn, setRefreshIn] = useState<number>(30);
  const { isAdmin } = useAdmin({ query: "/admin" });

  const { data } = useSWR<DashboardSummaryResponse>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isAdmin) {
    return (
      <AdminLayout
        title="Dashboard"
        subtitle="Estadisticas generales"
        icon={<DashboardOutlined />}
        pageDescription="Dashboard principal de adminsitradores"
      >
        <section className="flex animate-fadeIn flex-wrap justify-center">
          <SummaryTile
            icon={
              <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />
            }
            subtitle="Ordenes totales"
            title={data?.numberOfOrders!}
          />
          <SummaryTile
            icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
            subtitle="Ordenes pagadas"
            title={data?.paidOrders!}
          />
          <SummaryTile
            icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
            subtitle="Ordenes pendientes"
            title={data?.notPaidOrders!}
          />
          <SummaryTile
            icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
            subtitle="Clientes"
            title={data?.numberOfClients!}
          />
          <SummaryTile
            icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
            subtitle="Productos"
            title={data?.numberOfProducts!}
          />
          <SummaryTile
            icon={
              <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
            }
            subtitle="Sin existencia"
            title={data?.productsWithNoInventory!}
          />
          <SummaryTile
            icon={
              <ProductionQuantityLimitsOutlined
                color="warning"
                sx={{ fontSize: 40 }}
              />
            }
            subtitle="Bajo inventario"
            title={data?.lowInventory!}
          />
          <SummaryTile
            icon={
              <AccessTimeFilledOutlined
                color="secondary"
                sx={{ fontSize: 40 }}
              />
            }
            subtitle="Actualizacion en"
            title={refreshIn}
          />
        </section>
      </AdminLayout>
    );
  }

  return <LoadingLayout title="Cargando" />;
};

export default DashboardPage;

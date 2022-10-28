import { useContext } from "react";

//* icons *//
import {
  DashboardOutlined,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  AdminPanelSettings,
} from "@mui/icons-material";

//* components *//
import { SidebarLink } from "../../";

//* context *//
import { AuthContext } from "../../../context/auth/AuthContext";

export const SidebarAdminPanel: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className={user?.role === "admin" ? "w-full" : "hidden"}>
      <span className="mb-2 flex w-full px-[5%] text-sm">Admin Panel</span>
      <ul className="flex flex-col">
        <SidebarLink href="/admin" icon={DashboardOutlined} title="Dashboard" />
        <SidebarLink
          href="/admin/products"
          icon={CategoryOutlined}
          title="Productos"
        />
        <SidebarLink
          href="/admin/orders"
          icon={ConfirmationNumberOutlined}
          title="Ordenes"
        />
        <SidebarLink
          href="/admin/users"
          icon={AdminPanelSettings}
          title="Usuarios"
        />
      </ul>
    </section>
  );
};

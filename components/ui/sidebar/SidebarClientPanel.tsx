import { useContext } from "react";
import { useRouter } from "next/router";

//* icons *//
import {
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  VpnKeyOutlined,
  ConfirmationNumberOutlined,
} from "@mui/icons-material";

//* components *//
import { SidebarButton, SidebarLink } from "../../";

//* context *//
import { AuthContext } from "../../../context/auth/AuthContext";
import { UiContext } from "../../../context/ui/UiContext";

export const SidebarClientPanel: React.FC = () => {
  const { isLoggedIn, onLogout } = useContext(AuthContext);
  const { onToggleMenu } = useContext(UiContext);

  const { push, asPath } = useRouter();

  const navigateTo = async (url: string) => {
    await onToggleMenu(false);
    return push(url);
  };

  return (
    <section className="w-full">
      <ul className="flex flex-col">
        {isLoggedIn && (
          <SidebarLink
            href="/orders/history"
            icon={ConfirmationNumberOutlined}
            title="Mis Ordenes"
          />
        )}
        <SidebarLink href="/category/men" icon={MaleOutlined} title="Hombres" />
        <SidebarLink
          href="/category/women"
          icon={FemaleOutlined}
          title="Mujeres"
        />
        <SidebarLink
          href="/category/kids"
          icon={EscalatorWarningOutlined}
          title="Niños"
        />
        {isLoggedIn ? (
          <SidebarButton
            icon={LoginOutlined}
            onClick={() => onLogout()}
            title="Salir"
          />
        ) : (
          <SidebarButton
            icon={VpnKeyOutlined}
            onClick={() => navigateTo(`/auth/login?p=${asPath}`)}
            title="Ingresar"
          />
        )}
      </ul>
    </section>
  );
};

import { useContext } from "react";

//* components *//
import { SidebarSearcher, SidebarClientPanel, SidebarAdminPanel } from "../../";

//* contexts *//
import { UiContext } from "../../../context/ui/UiContext";

export const Sidebar = () => {
  const { isMenuOpen, onToggleMenu } = useContext(UiContext);

  return (
    <div
      id="sidebar"
      className={
        isMenuOpen
          ? "fixed top-0 z-40 h-screen w-screen animate-fadeIn bg-primary/50 backdrop-blur-sm"
          : "hidden"
      }
      onClick={() => onToggleMenu(false)}
    >
      <nav
        onClick={(event) => event.stopPropagation()}
        className={
          isMenuOpen
            ? "absolute right-0 z-50 flex h-screen w-[250px] animate-moveLeft flex-col gap-4 bg-white py-[40px] shadow-lg"
            : "absolute right-0 z-50 flex h-screen w-[250px] animate-moveRight flex-col gap-4 bg-white py-[40px] shadow-lg"
        }
      >
        <SidebarSearcher />
        <SidebarClientPanel />
        <div className="h-[1px] w-full bg-primary/20" />
        <SidebarAdminPanel />
      </nav>
    </div>
  );
};

import { useContext } from "react";
import NextLink from "next/link";

//* components *//
import { NavbarButtons, NavbarLink } from "../../";

//* contexts *//
import { UiContext } from "../../../context/ui/UiContext";

export const Navbar: React.FC = () => {
  const { isSearchVisible } = useContext(UiContext);

  return (
    <nav className="sticky top-0 z-30 h-[55px] w-full bg-white sm:h-[65px]">
      <div className="flex h-full w-full items-center justify-between px-[5%]">
        <section>
          <NextLink href="/" passHref>
            <a className="flex items-center gap-1">
              <img
                src="/logo-black.svg"
                alt="teslo logo"
                className="h-[35px] w-[35px]"
              />
              <h6 className="text-xl font-normal tracking-[1px]">Teslo</h6>
            </a>
          </NextLink>
        </section>

        <section
          className={
            isSearchVisible ? "hidden" : "hidden animate-fadeIn gap-1 sm:flex"
          }
        >
          <NavbarLink href="/category/men" title="Hombres" />
          <NavbarLink href="/category/women" title="Mujeres" />
          <NavbarLink href="/category/kids" title="Niños" />
        </section>

        <NavbarButtons />
      </div>
    </nav>
  );
};

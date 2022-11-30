import { useContext } from "react";
import NextLink from "next/link";

//* contexts *//
import { UiContext } from "../../context/ui/UiContext";

export const AdminNavbar = () => {
  const { onToggleMenu } = useContext(UiContext);

  return (
    <>
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

          <button
            className="animate-fadeIn rounded-xl p-2 text-xs font-semibold text-primary transition-all duration-500 hover:bg-light_gray sm:text-sm"
            type="button"
            onClick={() => onToggleMenu(true)}
          >
            Menu
          </button>
        </div>
      </nav>
    </>
  );
};

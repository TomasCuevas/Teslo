import { useContext } from "react";
import NextLink from "next/link";

//* component *//
import { NavbarSearcher } from "../../";

//* contexts *//
import { CartContext } from "../../../context/cart/CartContext";
import { UiContext } from "../../../context/ui/UiContext";

export const NavbarButtons: React.FC = () => {
  const { isSearchVisible, onToggleSearch, onToggleMenu } =
    useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  return (
    <section className="flex items-center gap-1 sm:gap-2">
      {isSearchVisible ? (
        <NavbarSearcher />
      ) : (
        <button
          onClick={() => onToggleSearch(true)}
          className="hidden animate-fadeIn items-center justify-center rounded-full p-2 text-primary transition-all duration-500 hover:bg-light_gray sm:flex"
        >
          <img
            src="/icons/search.svg"
            alt="search icon"
            className="h-[20px] w-[20px] text-primary sm:h-[23px] sm:w-[23px]"
          />
        </button>
      )}

      <button
        className="flex animate-fadeIn items-center justify-center rounded-full p-2 text-primary transition-all duration-500 hover:bg-light_gray sm:hidden"
        onClick={() => onToggleMenu(true)}
      >
        <img
          src="/icons/search.svg"
          alt="search icon"
          className="h-[20px] w-[20px] text-primary sm:h-[23px] sm:w-[23px]"
        />
      </button>

      <NextLink href="/cart" passHref>
        <a className="group relative">
          <span className="absolute right-[-3px] rounded-full bg-secundary px-[6px] py-[1px] text-xs font-bold text-white">
            {numberOfItems > 9 ? <>+9</> : <>{numberOfItems}</>}
          </span>
          <button className="flex animate-fadeIn items-center justify-center rounded-full p-2 text-primary transition-all duration-500 group-hover:bg-light_gray">
            <img
              src="/icons/cart.svg"
              alt="cart icon"
              className="h-[20px] w-[20px] text-primary sm:h-[23px] sm:w-[23px]"
            />
          </button>
        </a>
      </NextLink>

      <button
        className="animate-fadeIn rounded-xl p-2 text-xs font-semibold text-primary transition-all duration-500 hover:bg-light_gray sm:text-sm"
        type="button"
        onClick={() => onToggleMenu(true)}
      >
        Menu
      </button>
    </section>
  );
};

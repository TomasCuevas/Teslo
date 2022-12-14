import { useContext, useState } from "react";
import { useRouter } from "next/router";

//* context *//
import { UiContext } from "../../../context/ui/UiContext";

export const NavbarSearcher: React.FC = () => {
  const { onToggleSearch } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const router = useRouter();

  const onSearchTerm = async () => {
    if (searchTerm.trim().length < 1) return;
    router.push(`/search/${searchTerm}`);
  };

  return (
    <div
      className={
        isFocus
          ? "hidden animate-fadeIn gap-2 border-b border-b-primary transition-all duration-300 sm:flex"
          : "hidden animate-fadeIn gap-2 border-b border-b-light_gray transition-all duration-300 sm:flex"
      }
    >
      <input
        autoFocus
        className="hidden border-b-0 text-primary placeholder-gray/50 sm:flex"
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && onSearchTerm()}
        placeholder="Buscar..."
        type="text"
        value={searchTerm}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          if (searchTerm.length < 1) {
            onToggleSearch(false);
          }

          setIsFocus(false);
        }}
      />
      <button
        className="rounded-full p-2 text-primary transition-all duration-500 hover:bg-primary/5"
        onClick={() => onToggleSearch(false)}
        type="button"
      >
        <img
          src="/icons/close.svg"
          alt="close icon"
          className="h-[20px] w-[20px] text-primary sm:h-[23px] sm:w-[23px]"
        />
      </button>
    </div>
  );
};

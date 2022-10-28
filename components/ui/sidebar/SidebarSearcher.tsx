import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/future/image";

//* contexts *//
import { UiContext } from "../../../context/ui/UiContext";

export const SidebarSearcher: React.FC = () => {
  const { onToggleMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const { push } = useRouter();

  const onSearchTerm = async () => {
    if (searchTerm.trim().length < 1) return;

    await onToggleMenu(false);
    return push(`/search/${searchTerm}`);
  };

  return (
    <section className="px-[5%]">
      <div
        className={
          isFocus
            ? "flex w-full animate-fadeIn gap-2 border-b border-b-primary transition-all duration-300"
            : "flex w-full animate-fadeIn gap-2 border-b border-b-light_gray transition-all duration-300"
        }
      >
        <input
          autoFocus
          className="border-b-0 text-primary placeholder-gray/50"
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && onSearchTerm()}
          placeholder="Buscar..."
          type="text"
          value={searchTerm}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        <button
          className="rounded-full p-2 text-primary transition-all duration-500 hover:bg-light_gray"
          onClick={() => onSearchTerm()}
          type="button"
        >
          <Image
            alt="close icon"
            className="h-[20px] w-[20px] text-primary sm:h-[23px] sm:w-[23px]"
            height={0}
            src="/icons/search.svg"
            width={0}
          />
        </button>
      </div>
    </section>
  );
};

import { createContext, useState } from "react";

//* CONTEXT *//
interface UiContextProps {
  isMenuOpen: boolean;
  isSearchVisible: boolean;
  onToggleMenu: (value: boolean) => void;
  onToggleSearch: (value: boolean) => void;
}

export const UiContext = createContext({} as UiContextProps);

//* PROVIDER *//
interface UiProviderProps {
  children: React.ReactNode;
}

export const UiProvider = ({ children }: UiProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onToggleMenu = (value: boolean) => {
    if (value) {
      document.querySelector("body")?.classList.add("sidebar__open");
    } else {
      document.querySelector("body")?.classList.remove("sidebar__open");
    }

    setIsMenuOpen(value);
  };

  const onToggleSearch = (value: boolean) => setIsSearchVisible(value);

  return (
    <UiContext.Provider
      value={{ isMenuOpen, isSearchVisible, onToggleMenu, onToggleSearch }}
    >
      {children}
    </UiContext.Provider>
  );
};

import {
  useState,
  useEffect,
  type ReactNode,
  type FC,
} from "react";
import { useLocation } from "@tanstack/react-router";
import {
  MenuContext,
  PanelContext,
  SheetContext,
  SlotContext,
} from "./AppShellContext";
import {
  findMenuByPath,
  useAppMenu,
} from "../hooks/use-menu";
import type {
  PrimaryMenuType,
  SecondaryMenuType,
  SheetContent,
} from "../types";

type AppShellProviderProps = {
  children: ReactNode;
};

export const AppShellProvider: FC<AppShellProviderProps> = ({ children }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<SheetContent>();
  const [panelContent, setPanelContent] = useState<ReactNode>();
  const [appbarSlot, setAppbarSlot] = useState<ReactNode>();
  const [selectedPrime, setSelectedPrime] = useState<PrimaryMenuType>();
  const [selectedSec, setselectedSec] = useState<SecondaryMenuType>();

  const appMenu = useAppMenu();
  const location = useLocation();

  useEffect(() => {
    const { prime, sec } = findMenuByPath(appMenu, location.pathname);
    setSelectedPrime(prime);
    setselectedSec(sec);
    setMenuOpen(!!sec || (!!prime?.menu && prime.menu.length > 0));
  }, [location.pathname, appMenu]);

  return (
    <MenuContext.Provider
      value={{
        appMenu,
        selectedPrime,
        setSelectedPrime,
        selectedSec,
        setselectedSec,
        menuOpen,
        setMenuOpen,
      }}
    >
      <PanelContext.Provider
        value={{
          panelOpen,
          setPanelOpen,
          panelContent,
          setPanelContent,
        }}
      >
        <SheetContext.Provider
          value={{
            sheetOpen,
            setSheetOpen,
            sheetContent,
            setSheetContent,
          }}
        >
          <SlotContext.Provider
            value={{
              appbarSlot,
              setAppbarSlot,
            }}
          >
            {children}
          </SlotContext.Provider>
        </SheetContext.Provider>
      </PanelContext.Provider>
    </MenuContext.Provider>
  );
};

import { createContext, useContext } from "react";
import type {
  AppShellContextType,
  MenuContextType,
  PanelContextType,
  SheetContextType,
  SlotContextType,
} from "../types";

export const MenuContext = createContext<MenuContextType | undefined>(undefined);
export const PanelContext = createContext<PanelContextType | undefined>(undefined);
export const SheetContext = createContext<SheetContextType | undefined>(undefined);
export const SlotContext = createContext<SlotContextType | undefined>(undefined);

export const useAppShellMenu = (): MenuContextType => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useAppShellMenu must be used within AppShellProvider");
  return ctx;
};

export const useAppShellPanel = (): PanelContextType => {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error("useAppShellPanel must be used within AppShellProvider");
  return ctx;
};

export const useAppShellSheet = (): SheetContextType => {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("useAppShellSheet must be used within AppShellProvider");
  return ctx;
};

export const useAppShellSlot = (): SlotContextType => {
  const ctx = useContext(SlotContext);
  if (!ctx) throw new Error("useAppShellSlot must be used within AppShellProvider");
  return ctx;
};

export const useAppShell = (): AppShellContextType => {
  const menu = useAppShellMenu();
  const panel = useAppShellPanel();
  const sheet = useAppShellSheet();
  const slot = useAppShellSlot();

  return {
    ...menu,
    ...panel,
    ...sheet,
    ...slot,
  };
};

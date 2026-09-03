import type { Dispatch, ReactNode, SetStateAction } from "react";

export type SheetContent = {
  snapPoints: [number | "auto", number | "auto"];
  title: string;
  description: string;
  content: ReactNode;
};

export type PrimaryMenuGroupType = {
  lable: string;
  menu: PrimaryMenuType[];
};

export type PrimaryMenuType = {
  icon: ReactNode;
  lable: string;
  path: string;
  menu?: SecondaryMenuGroupType[];
};

export type SecondaryMenuGroupType = {
  lable: string;
  menu: SecondaryMenuType[];
};

export type SecondaryMenuType = {
  icon: ReactNode;
  lable: string;
  path: string;
};

export type MenuMatchResult = {
  prime: PrimaryMenuType | undefined;
  sec: SecondaryMenuType | undefined;
};

export type MenuContextType = {
  appMenu: PrimaryMenuGroupType[];
  selectedPrime: PrimaryMenuType | undefined;
  setSelectedPrime: Dispatch<SetStateAction<PrimaryMenuType | undefined>>;
  selectedSec: SecondaryMenuType | undefined;
  setselectedSec: Dispatch<SetStateAction<SecondaryMenuType | undefined>>;
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export type PanelContextType = {
  panelOpen: boolean;
  setPanelOpen: Dispatch<SetStateAction<boolean>>;
  panelContent: ReactNode;
  setPanelContent: Dispatch<SetStateAction<ReactNode>>;
};

export type SheetContextType = {
  sheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  sheetContent: SheetContent | undefined;
  setSheetContent: Dispatch<SetStateAction<SheetContent | undefined>>;
};

export type SlotContextType = {
  appbarSlot: ReactNode;
  setAppbarSlot: Dispatch<SetStateAction<ReactNode>>;
};

export type AppShellContextType = MenuContextType &
  PanelContextType &
  SheetContextType &
  SlotContextType;

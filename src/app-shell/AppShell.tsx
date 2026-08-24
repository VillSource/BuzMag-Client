import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type FC,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useLocation } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import RailIconMenu from "@/app-shell/RailIconMenu";
import { BottomSheet } from "@/components/motion/bottom-sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";



type AppShellContextType = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;

  panelOpen: boolean;
  setPanelOpen: Dispatch<SetStateAction<boolean>>;
  panelContent: ReactNode;
  setPanelContent: Dispatch<SetStateAction<ReactNode>>;

  sheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  sheetContent: ReactNode;
  setSheetContent: Dispatch<SetStateAction<ReactNode>>;

  appMenu: PrimaryMenuGroupType[]
  selectedPrime: PrimaryMenuType|undefined
  setSelectedPrime : Dispatch<SetStateAction<PrimaryMenuType | undefined>>
  selectedSec: SecondaryMenuType|undefined
  setselectedSec : Dispatch<SetStateAction<SecondaryMenuType | undefined>>
};

const AppShellContext = createContext<AppShellContextType | undefined>(
  undefined,
);

export const useAppShell = () => {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error("useAppShell must be used within AppShell");
  return ctx;
};

type AppShellProps = {
  children?: ReactNode;
};

export const AppShell: FC<AppShellProps> = ({
  children,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<ReactNode>();
  const [panelContent, setPanelContent] = useState<ReactNode>();
  const [selectedPrime, setSelectedPrime] = useState<PrimaryMenuType>();
  const [selectedSec, setselectedSec] = useState<SecondaryMenuType>();

  const isMobile = useIsMobile();
  const appMenu = useAppMenu();
  const location = useLocation();

  useEffect(() => {
    const { prime, sec } = findMenuByPath(appMenu, location.pathname);
    setSelectedPrime(prime);
    setselectedSec(sec);
    setMenuOpen(!!sec || (!!prime?.menu && prime.menu.length > 0))
  }, [location.pathname, appMenu]);

  return <>
    <AppShellContext.Provider
      value={{
        panelOpen,
        menuOpen,
        sheetOpen,
        sheetContent,
        panelContent,
        appMenu,
        selectedPrime,
        selectedSec,
        setPanelOpen,
        setMenuOpen,
        setSheetOpen,
        setSheetContent,
        setPanelContent,
        setSelectedPrime,
        setselectedSec,
        }}
    >
      <SidebarProvider
        className={cn(
          "w-full",
          isMobile ? "min-h-svh" : "h-svh overflow-hidden",
        )}
        open={false}
      >
        <RailIconMenu />
        <div className="flex min-h-svh min-w-0 w-full flex-1 bg-muted">
          <div className= {cn("flex min-h-svh min-w-0 flex-1 flex-col bg-background text-foreground", isMobile ? "border-0 overflow-visible" : "border-border border-2 rounded-lg overflow-hidden")}>
            <header
              className={cn(
                "flex h-12 shrink-0 items-center border-b bg-background p-2 text-foreground",
                isMobile && "sticky top-0 z-40",
              )}
            >
              <ActionBar/>
            </header>
            <div className="relative flex min-h-0 min-w-0 flex-1 flex-row">
              <SidebarProvider
                className="flex min-h-0 min-w-0 flex-1"
                open={menuOpen}
                onOpenChange={setMenuOpen}
              >
                {!isMobile && <SideMenuBar />}
                <SidebarProvider
                  className="flex min-h-0 min-w-0 flex-1"
                  open={panelOpen}
                  onOpenChange={setPanelOpen}
                >
                  <SidebarInset className="relative flex min-h-0 bg-background min-w-0 flex-1 flex-col">
                    {isMobile && (
                      <div className="sticky inset-x-0 top-12 z-30 bg-background p-0 pb-0">
                        <TabMenu />
                      </div>
                    )}
                    {isMobile ? (
                      <div className="min-w-0 flex-1 bg-background">
                        <main className="flex-1 p-4 bg-background">
                          {children}
                        </main>
                        <footer className="shrink-0"><Footer/></footer>
                      </div>
                    ) : (
                      <ScrollArea className="min-h-0 min-w-0 flex-1 bg-background">
                        <div className="flex min-h-full min-w-0 flex-col">
                          <main className="flex-1 p-4 bg-background">
                            {children}
                          </main>
                          <footer className="shrink-0"><Footer/></footer>
                        </div>
                      </ScrollArea>
                    )}
                  </SidebarInset>
                  < ContextPanel client={panelContent} />
                </SidebarProvider>
              </SidebarProvider>
            </div>
          </div>
        </div>
      </SidebarProvider>



      <BottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[0.8, 0.85]}
        title="Quick actions"
        description="Drag the handle, fling, or swipe down to dismiss."
      >
        <ul className="divide-y divide-border">
          {[
            "Share",
            "Duplicate",
            "Move to folder",
            "Rename",
            "Archive",
            "Delete",

            "Share",
            "Duplicate",
            "Move to folder",
            "Rename",
            "Archive",
            "Delete",
            "Share",
            "Duplicate",
            "Move to folder",
            "Rename",
            "Archive",
            "Delete",
            "Share",
            "Duplicate",
            "Move to folder",
            "Rename",
            "Archive",
            "Delete",
            "Share",
            "Duplicate",
            "Move to folder",
            "Rename",
            "Archive",
            "Delete",
            "Share",
            "Duplicate",
            "Move to folder",
            "Rename",
            "Archive",
            "Delete",
          ].map((item) => (
            <li key={item} className="py-3 text-sm text-foreground">
              {item}
            </li>
          ))}
        </ul>
        <div className="py-12 text-center text-xs text-muted-foreground">
          Fling up to expand, fling down to dismiss.
        </div>
      </BottomSheet>
      {isMobile && <DockPreview />}
    </AppShellContext.Provider>
  </>;
};


import { Calendar, ClockFading, Component, Hamburger, Home, Inbox, LayoutDashboard, LayoutGrid, Mail, Menu, Music, Search, Settings, Sparkles } from "lucide-react";
import { Dock, DockItem, DockSeparator } from "@/components/motion/dock";
import ActionBar from "./Header";
import Footer from "./Footer";
import { SideMenuBar } from "./SideMenuBar";
import { ContextPanel } from "./ContextPanel";
import { TabMenu } from "./TabMenu";
import { findMenuByPath, useAppMenu, type PrimaryMenuGroupType, type PrimaryMenuType, type SecondaryMenuType } from "./use-menu";

const  DockPreview = () => {
  const { direction } = useScrollDirection({ direction: "both" });
  const ITEMS = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "mail", icon: Inbox, label: "Mail" },
    { id: "discover", icon: LayoutGrid, label: "Discover" },
    { id: "search", icon: Search, label: "search" },
  ];
  const [active, setActive] = useState("dashboard");
  const visible = direction !== "down";

  return (
    <div
      className={cn(
        "fixed bottom-4 flex w-full justify-center transition-transform duration-200",
        visible ? "translate-y-0" : "translate-y-[calc(100%+1rem)]",
      )}
    >
      <Dock>
        {ITEMS.map(({ id, icon: Icon, label }) => (
          <DockItem
            key={id}
            aria-label={label}
            active={active === id}
            onClick={() => setActive(id)}
          >
            <Icon className="h-5 w-5" />
          </DockItem>
        ))}
        <DockSeparator />
        <DockItem
          aria-label="Recent"
          active={active === "recent"}
          onClick={() => setActive("recent")}
        >
          <ClockFading className="h-5 w-5" />
        </DockItem>
        <DockItem
          aria-label="Settings"
          active={active === "settings"}
          onClick={() => setActive("settings")}
        >
          <Menu className="h-5 w-5" />
        </DockItem>
      </Dock>
    </div>
  );
}



export default AppShell;

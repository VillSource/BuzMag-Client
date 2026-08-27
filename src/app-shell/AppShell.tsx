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
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import {
  findMenuByPath,
  useAppMenu,
  type PrimaryMenuGroupType,
  type PrimaryMenuType,
  type SecondaryMenuType,
} from "./use-menu";
import { ContextPanel } from "./ContextPanel";
import Footer from "./Footer";
import ActionBar from "./Header";
import { SideMenuBar } from "./SideMenuBar";
import { TabMenu } from "./TabMenu";

type SheetContent = {
  snapPoints: [number | "auto", number | "auto"];
  title: string;
  description: string;
  content: ReactNode
};

type AppShellContextType = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;

  panelOpen: boolean;
  setPanelOpen: Dispatch<SetStateAction<boolean>>;
  panelContent: ReactNode;
  setPanelContent: Dispatch<SetStateAction<ReactNode>>;

  sheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
  sheetContent: SheetContent|undefined;
  setSheetContent: Dispatch<SetStateAction<SheetContent|undefined>>;

  appbarSlot: ReactNode;
  setAppbarSlot: Dispatch<SetStateAction<ReactNode>>;

  appMenu: PrimaryMenuGroupType[];
  selectedPrime: PrimaryMenuType | undefined;
  setSelectedPrime: Dispatch<SetStateAction<PrimaryMenuType | undefined>>;
  selectedSec: SecondaryMenuType | undefined;
  setselectedSec: Dispatch<SetStateAction<SecondaryMenuType | undefined>>;
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

export const AppShell: FC<AppShellProps> = ({ children }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<SheetContent>();
  const [panelContent, setPanelContent] = useState<ReactNode>();
  const [appbarSlot, setAppbarSlot] = useState<ReactNode>();
  const [selectedPrime, setSelectedPrime] = useState<PrimaryMenuType>();
  const [selectedSec, setselectedSec] = useState<SecondaryMenuType>();

  const isMobile = useIsMobile();
  const appMenu = useAppMenu();
  const location = useLocation();

  useEffect(() => {
    const { prime, sec } = findMenuByPath(appMenu, location.pathname);
    setSelectedPrime(prime);
    setselectedSec(sec);
    setMenuOpen(!!sec || (!!prime?.menu && prime.menu.length > 0));
  }, [location.pathname, appMenu]);

  return (
    <>
      <AppShellContext.Provider
        value={{
          panelOpen,
          menuOpen,
          sheetOpen,
          sheetContent,
          panelContent,
          appbarSlot,
          appMenu,
          selectedPrime,
          selectedSec,
          setPanelOpen,
          setMenuOpen,
          setSheetOpen,
          setSheetContent,
          setPanelContent,
          setAppbarSlot,
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
            <div
              className={cn(
                "flex min-h-svh min-w-0 flex-1 flex-col bg-background text-foreground",
                isMobile
                  ? "border-0 overflow-visible"
                  : "border-border border-2 rounded-lg overflow-hidden",
              )}
            >
              <header
                className={cn(
                  "flex h-12 shrink-0 items-center border-b bg-background p-2 text-foreground",
                  isMobile && "sticky top-0 z-40",
                )}
              >
                <ActionBar />
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
                      {isMobile &&
                        !!selectedPrime?.menu &&
                        selectedPrime.menu.length > 0 && (
                          <div className="sticky inset-x-0 top-12 z-30 bg-background p-0 pb-0">
                            <TabMenu />
                          </div>
                        )}
                      {isMobile ? (
                        <div className="min-w-0 flex-1 flex flex-col bg-background">
                          <main className="flex-1 bg-background">
                            {children}
                          </main>
                          <footer className="shrink-0">
                            <Footer />
                          </footer>
                        </div>
                      ) : (
                        <ScrollArea className="min-h-0 min-w-0 flex-1 bg-background">
                          <div className="flex min-h-full min-w-0 flex-col">
                            <main className="flex-1 bg-background">
                              {children}
                            </main>
                            <footer className="shrink-0">
                              <Footer />
                            </footer>
                          </div>
                        </ScrollArea>
                      )}
                    </SidebarInset>
                    <ContextPanel client={panelContent} />
                  </SidebarProvider>
                </SidebarProvider>
              </div>
            </div>
          </div>
        </SidebarProvider>

        <BottomSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          snapPoints={sheetContent?.snapPoints}
          title={sheetContent?.title}
          description={sheetContent?.description}
        >
          {sheetContent?.content}
        </BottomSheet>
        {isMobile && <MobileNav />}
      </AppShellContext.Provider>
    </>
  );
};

export default AppShell;

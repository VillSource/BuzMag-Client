import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FC,
} from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar2, SidebarR } from "@/components/Sidebar";
import { BottomSheet } from "@/components/motion/bottom-sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type AppShellContextType = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
  openSheet: boolean;
  setopenSheet: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
  setTopbar: (node?: ReactNode) => void;
  setRightbar: (node?: ReactNode) => void;
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
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
};

export const AppShell: FC<AppShellProps> = ({
  header,
  sidebar,
  footer,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [topbar, setTopbar] = useState<ReactNode>();
  const [rightbar, setRightbar] = useState<ReactNode>();
  const [openSheet, setopenSheet] = useState(false);

  const isMobile = useIsMobile();

  return <>
    <AppShellContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        menuOpen,
        setMenuOpen,
        setTopbar,
        setRightbar,
        openSheet,
        setopenSheet,
      }}
    >
      <SidebarProvider className="h-svh w-full overflow-hidden" open={false}>
        {sidebar}
        <div className="flex h-full min-h-0 min-w-0 w-full flex-1 bg-muted">
          <div className= {cn("flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background text-foreground", isMobile ? "border-0" : "border-border border-2  rounded-lg")}>
            <header className="flex h-12 shrink-0 items-center border-b bg-background p-2 text-foreground">
              {header}
            </header>
            <div className="relative flex min-h-0 min-w-0 flex-1 flex-row">
              <SidebarProvider
                className="flex min-h-0 min-w-0 flex-1"
                open={menuOpen}
                onOpenChange={setMenuOpen}
              >
                <Sidebar2 />
                <SidebarProvider
                  className="flex min-h-0 min-w-0 flex-1"
                  open={sidebarOpen}
                  onOpenChange={setSidebarOpen}
                >
                  <SidebarInset className="relative flex min-h-0 bg-background min-w-0 flex-1 flex-col">
                    {topbar && (
                      <div className="shrink-0 p-4 pb-0">{topbar}</div>
                    )}
                    <ScrollArea className="min-h-0 min-w-0 flex-1 bg-background">
                      <div className="flex min-h-full min-w-0 flex-col">
                        <main className="flex-1 p-4 bg-background">
                          {children}
                        </main>
                        <footer className="shrink-0">{footer}</footer>
                      </div>
                    </ScrollArea>
                  </SidebarInset>
                  <SidebarR client={rightbar} />
                </SidebarProvider>
              </SidebarProvider>
            </div>
          </div>
        </div>
      </SidebarProvider>



      <BottomSheet
        open={openSheet}
        onOpenChange={setopenSheet}
        snapPoints={[0.4, 0.85]}
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
    </AppShellContext.Provider>
    {isMobile && <DockPreview />}
  </>;
};


import { Calendar, Home, Mail, Music, Settings, Sparkles } from "lucide-react";
import { Dock, DockItem, DockSeparator } from "@/components/motion/dock";

const  DockPreview = () => {
const ITEMS = [
  { id: "home", icon: Home, label: "Home" },
  { id: "mail", icon: Mail, label: "Mail" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "music", icon: Music, label: "Music" },
  { id: "discover", icon: Sparkles, label: "Discover" },
];
  const [active, setActive] = useState("home");

  return (
    <div className="fixed bottom-4 flex w-full justify-center">
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
          aria-label="Settings"
          active={active === "settings"}
          onClick={() => setActive("settings")}
        >
          <Settings className="h-5 w-5" />
        </DockItem>
      </Dock>
    </div>
  );
}



export default AppShell;

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

type AppShellContextType = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setTopbar: (node?: ReactNode) => void;
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [topbar, setTopbar] = useState<ReactNode>();

  return (
    <AppShellContext.Provider
      value={{ sidebarOpen, setSidebarOpen, menuOpen, setMenuOpen, setTopbar }}
    >
      <SidebarProvider className="h-svh w-full overflow-hidden" open={false}>
        {sidebar}
        <div className="flex h-full min-h-0 min-w-0 w-full flex-1 bg-muted">
          <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border-2 bg-background text-foreground">
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
                  <SidebarInset className="relative flex min-h-0 min-w-0 flex-1 flex-col">
                    {topbar && <div className="shrink-0 p-4 pb-0">{topbar}</div>}
                    <ScrollArea className="min-h-0 min-w-0 flex-1">
                      <div className="flex min-h-full min-w-0 flex-col">
                        <main className="flex-1 p-4">{children}</main>
                        <footer className="shrink-0">{footer}</footer>
                      </div>
                    </ScrollArea>
                  </SidebarInset>
                  <SidebarR />
                </SidebarProvider>
              </SidebarProvider>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </AppShellContext.Provider>
  );
};

export default AppShell;

import type { FC, ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { AppShellProvider } from "./context/AppShellProvider";
import { useAppShellMenu, useAppShellPanel } from "./context/AppShellContext";
import { RailIconMenu } from "./sidebar/RailIconMenu";
import { SideMenuBar } from "./sidebar/SideMenuBar";
import { ActionBar } from "./header/ActionBar";
import { MainContent } from "./content/MainContent";
import { ContextPanel } from "./content/ContextPanel";
import { BottomSheetWrapper } from "./content/BottomSheetWrapper";
import { MobileNav } from "./navigation/MobileNav";

type AppShellProps = {
  children?: ReactNode;
};

const AppShellLayout: FC<AppShellProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { menuOpen, setMenuOpen } = useAppShellMenu();
  const { panelOpen, setPanelOpen, panelContent } = useAppShellPanel();

  return (
    <>
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
                  <MainContent>{children}</MainContent>
                  <ContextPanel client={panelContent} />
                </SidebarProvider>
              </SidebarProvider>
            </div>
          </div>
        </div>
      </SidebarProvider>

      <BottomSheetWrapper />
      {isMobile && <MobileNav />}
    </>
  );
};

export const AppShell: FC<AppShellProps> = ({ children }) => {
  return (
    <AppShellProvider>
      <AppShellLayout>{children}</AppShellLayout>
    </AppShellProvider>
  );
};

export default AppShell;

// Export legacy contexts and subcomponents for backward compat
export { useAppShell } from "./context/AppShellContext";

import type { FC, ReactNode } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAppShellMenu } from "../context/AppShellContext";
import { TabMenu } from "../navigation/TabMenu";
import { Footer } from "../navigation/Footer";

export type MainContentProps = {
  children?: ReactNode;
};

export const MainContent: FC<MainContentProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { selectedPrime } = useAppShellMenu();

  return (
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
          <main className="flex-1 bg-background">{children}</main>
          <footer className="shrink-0">
            <Footer />
          </footer>
        </div>
      ) : (
        <div className="min-h-0 min-w-0 flex-1 bg-background overflow-auto">
          <div className="flex min-h-full min-w-0 flex-col">
            <main className="flex-1 bg-background">{children}</main>
            <footer className="shrink-0">
              <Footer />
            </footer>
          </div>
        </div>
      )}
    </SidebarInset>
  );
};

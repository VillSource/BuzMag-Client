import { Sidebar as ShadcnSidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

export const ContextPanel = ({ client }: { client?: ReactNode }) => {
  return (
    <>
      <ShadcnSidebar
        variant="sidebar"
        className="absolute inset-y-0 right-0 z-10 border-l h-full min-h-0 overflow-hidden"
        side="right"
      >
        <SidebarContent>{client}</SidebarContent>
        <SidebarFooter>heell</SidebarFooter>
      </ShadcnSidebar>
    </>
  );
};

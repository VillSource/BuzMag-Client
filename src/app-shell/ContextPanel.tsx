import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import type { ReactNode } from "react";


export const  ContextPanel = ({ client }: { client?: ReactNode }) => {
  return (
    <>
      <ShadcnSidebar
        variant="sidebar"
        className="absolute inset-y-0 right-0 z-10 border-l"
        side="right"
      >
        <SidebarHeader className="h12 my-2 border-b">
          name of the right bar
        </SidebarHeader>
        <SidebarContent className="">{client}</SidebarContent>
      </ShadcnSidebar>
    </>
  );
};
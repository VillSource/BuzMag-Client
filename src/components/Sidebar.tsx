import { Link } from "@tanstack/react-router";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Inbox,
  LayoutDashboard,
  PackageOpen,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useAppShell } from "@/app-shell/AppShell";
import type { ReactNode } from "react";
import { AvatarMenu } from "@/features/profile/AvatarMenu";

const Sidebar = () => {
  const { menuOpen, setMenuOpen } = useAppShell();
  return (
    <>
      <ShadcnSidebar collapsible="icon" className="border-none">
        <SidebarHeader className="bg-muted text-foreground">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className=" group/panel transition-all overflow-hidden rounded-sm w-8 h-8 bg-amber-800 flex items-center justify-center text-white"
          >
            <span className="group-hover/panel:hidden">M</span>
            {menuOpen ? (
              <PanelLeftClose
                size={"1rem"}
                className="hidden group-hover/panel:block"
              />
            ) : (
              <PanelLeftOpen
                size={"1rem"}
                className="hidden group-hover/panel:block"
              />
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-muted text-foreground">
          <SidebarGroup>
            <SidebarGroupLabel>Common</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {MenuItems.map((item) => (
                  <RialIconMenuItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-muted text-foreground">
          <AvatarMenu/>
        </SidebarFooter>
      </ShadcnSidebar>
    </>
  );
};

export const Sidebar2 = () => {
  return (
    <>
      <ShadcnSidebar
        variant="sidebar"
        className="absolute inset-y-0 left-0 z-10 border-r"
        side="left"
      >
        <SidebarHeader className="h12 my-2  border-b">Menu</SidebarHeader>
        <SidebarContent>{/* Sub Navigation Items */}</SidebarContent>
      </ShadcnSidebar>
    </>
  );
};

export const SidebarR = ({ client }: { client?: ReactNode }) => {
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
        

type RialIconMenu = {
  icon: React.ReactNode;
  label: string;
  to: string;
};

const MenuItems: RialIconMenu[] = [
  { icon: <LayoutDashboard />, label: "Overview", to: "/" },
  { icon: <Inbox />, label: "Chat", to: "/ping/Bob" },
  { icon: <PackageOpen />, label: "My Files", to: "/ping/Alice" },
];

const RialIconMenuItem: React.FC<RialIconMenu> = ({ icon, label, to }) => {
  return (
    <SidebarMenuItem>
      <Tooltip>
        <TooltipTrigger>
          <SidebarMenuButton
            className="group/rail hover:bg-primary/10 transform transition-colors duration-300 ease-in-out"
            render={<Link to={to} />}
          >
            <span className="group-hover/rail:-translate-y-1 group-hover/rail:scale-110 group-hover/rail:rotate-2 transition-transform duration-100 ease-in-out">
              {icon}
            </span>
            <span>{label}</span>
          </SidebarMenuButton>
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    </SidebarMenuItem>
  );
};

export default Sidebar;

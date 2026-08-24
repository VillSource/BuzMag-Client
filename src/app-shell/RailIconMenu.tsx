import { Link, useLocation } from "@tanstack/react-router";
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Briefcase,
  Building,
  Building2,
  Contact,
  Globe,
  Inbox,
  Layers,
  LayoutDashboard,
  Megaphone,
  Package,
  PackageOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Receipt,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Truck,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useAppShell } from "@/app-shell/AppShell";
import { AvatarMenu } from "@/features/profile/AvatarMenu";
import { useCallback } from "react";
import type { PrimaryMenuType } from "./use-menu";

import { Fragment } from "react";
import { cn } from "@/lib/utils";

const RailIconMenu = () => {
  const { menuOpen, setMenuOpen, appMenu, selectedPrime } = useAppShell();

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

        <SidebarContent className="overflow-y-auto! bg-muted text-foreground">

          {appMenu.map((group) => (
            <Fragment key={group.lable}>
              <SidebarGroup>
                <SidebarGroupLabel>{group.lable}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.menu.map((item) => (
                      <MenuItem
                        key={item.lable}
                        icon={item.icon}
                        label={item.lable}
                        to={item.path}
                        module={item}
                        isActive={selectedPrime?.path === item.path}
                      />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator/>
            </Fragment>
          ))}
        </SidebarContent>

        <SidebarFooter className="bg-muted text-foreground">
          <AvatarMenu />
        </SidebarFooter>
      </ShadcnSidebar>
    </>
  );
};

type RialIconMenu = {
  icon: React.ReactNode;
  label: string;
  to: string;
  module: PrimaryMenuType;
  isActive?: boolean;
};

const MenuItem: React.FC<RialIconMenu> = ({ icon, label, to, isActive }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} render={<Link to={to} />} tooltip={label}>
        <span className={cn(isActive?"text-primary":undefined)}>{icon}</span>
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default RailIconMenu;

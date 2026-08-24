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

const RailIconMenu = () => {
  const { menuOpen, setMenuOpen, appMenu } = useAppShell();

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

          {appMenu.map((group => (
            <SidebarGroup key={group.lable}>
              <SidebarGroupLabel>{group.lable}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.menu.map((item) => (
                    <RialIconMenuItem
                      key={item.lable}
                      icon={item.icon}
                      label={item.lable}
                      to={item.path}
                      module={item}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )))}
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
  module: PrimaryMenuType
};

const RialIconMenuItem: React.FC<RialIconMenu> = ({ icon, label, to, module }) => {
  const { setMenuOpen } = useAppShell();
  const clickModule = useCallback(()=>{
    setMenuOpen(!!module.menu && module.menu.length > 0);
  }, [module])

  return (
    <SidebarMenuItem>
      <Tooltip>
        <TooltipTrigger>
          <SidebarMenuButton
            onClick={clickModule}
            className="group/rail hover:bg-primary/10 transform transition-colors duration-300 ease-in-out"
            render={ <Link to={to} />}
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

export default RailIconMenu;

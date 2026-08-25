import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { useAppShell } from "./AppShell";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SideMenuBar = () => {
  const { selectedPrime, selectedSec, setMenuOpen, menuOpen } = useAppShell();
  return (
    <>
      <ShadcnSidebar
        variant="sidebar"
        className="absolute inset-y-0 left-0 z-10 h-full min-h-0  border-r group/collmenu min-w-fit"
        side="left"
      >
        <SidebarContent>
          {!!selectedPrime?.menu &&
            selectedPrime.menu.map((group) => (
              <SidebarGroup key={group.lable}>
                <SidebarGroupLabel>{group.lable}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.menu.map((item) => (
                      <MenuItem
                        key={item.lable}
                        icon={item.icon}
                        label={item.lable}
                        to={item.path}
                        isActive={selectedSec?.path === item.path}
                      />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
        </SidebarContent>

        <SidebarFooter>
          <MenuWidget />
        </SidebarFooter>
        {menuOpen ? (
          <div className="absolute flex items-center justify-center -right-3 w-6 h-full">
            <Tooltip>
              <TooltipTrigger
                render={
                  <ChevronLeft
                    onClick={() => setMenuOpen(false)}
                    className="cursor-pointer group-hover/collmenu:border group-hover/collmenu:w-3 m-auto bg-background border-0 rounded h-10 w-0 transition-all"
                  />
                }
              ></TooltipTrigger>
              <TooltipContent side="right">collapse</TooltipContent>
            </Tooltip>
          </div>
        ) : (
          !!selectedPrime?.menu &&
          selectedPrime.menu.length > 0 && (
            <div className="absolute flex items-center justify-center -right-6 w-6 h-full">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <ChevronRight
                      onClick={() => setMenuOpen(true)}
                      className="cursor-pointer group-hover/collmenu:border-0 group-hover/collmenu:w-3 me-auto bg-background border-0 rounded h-10 w-0 transition-all"
                    />
                  }
                ></TooltipTrigger>
                <TooltipContent side="right">explan</TooltipContent>
              </Tooltip>
            </div>
          )
        )}
      </ShadcnSidebar>
    </>
  );
};

type MenuItemData = {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
};

const MenuItem: React.FC<MenuItemData> = ({ icon, label, to, isActive }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} render={<Link to={to} />}>
        <span>{icon}</span>
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const MenuWidget = () => {
  return (
    <Card className="w-full max-w-xs mt-3">
      <CardHeader>
        <span>Module Widget</span>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
};

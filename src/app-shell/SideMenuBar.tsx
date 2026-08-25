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

export const SideMenuBar = () => {
  const { selectedPrime, selectedSec } = useAppShell();
  return (
    <>
      <ShadcnSidebar
        variant="sidebar"
        className="absolute inset-y-0 left-0 z-10 h-full min-h-0 overflow-hidden border-r"
        side="left"
      >
        <SidebarHeader className="h12 ps-4 border-b">
          {selectedPrime?.lable}
        </SidebarHeader>
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

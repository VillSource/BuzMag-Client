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
import {
  LayoutDashboard,
  Inbox,
  PackageOpen,
  Users,
  Clock,
  UserPlus,
  CalendarOff,
  Award,
  DollarSign,
  FileText,
  Sliders,
} from "lucide-react";

export const SideMenuBar = () => {
  return (
    <>
      <ShadcnSidebar
        variant="sidebar"
        className="absolute inset-y-0 left-0 z-10 h-full min-h-0 overflow-hidden border-r"
        side="left"
      >
        <SidebarHeader className="h12 my-2 border-b">Human Resource</SidebarHeader>
        <SidebarContent>

          <SidebarGroup>
            <SidebarGroupLabel>Common</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {CommonMenuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>


          <SidebarGroup>
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {RecentMenuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>


          <SidebarGroup>
            <SidebarGroupLabel>HR</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {HRMenuItems.map((item) => (
                  <MenuItem
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

        <SidebarFooter>
            <MenuWidget/>
        </SidebarFooter>
      </ShadcnSidebar>
    </>
  );
};

type MenuItemData = {
  icon: React.ReactNode;
  label: string;
  to: string;
};

const HRMenuItems: MenuItemData[] = [
  { icon: <Users />, label: "Employees", to: "/hr/employees" },
  { icon: <UserPlus />, label: "Onboarding", to: "/hr/onboarding" },
  { icon: <Clock />, label: "Attendance", to: "/hr/attendance" },
  { icon: <CalendarOff />, label: "Leave Requests", to: "/hr/leaves" },
  { icon: <DollarSign />, label: "Payroll", to: "/hr/payroll" },
  { icon: <Award />, label: "Performance", to: "/hr/reviews" },
  { icon: <FileText />, label: "Reports", to: "/hr/reports" },
  { icon: <Sliders />, label: "HR Settings", to: "/hr/settings" },
];

const CommonMenuItems: MenuItemData[] = [
  { icon: <LayoutDashboard />, label: "Overview", to: "/" },
  { icon: <Inbox />, label: "Chat", to: "/ping/Bob" },
  { icon: <PackageOpen />, label: "My Files", to: "/ping/Alice" },
  { icon: <PackageOpen />, label: "My Files", to: "/ping/Alice" },
];

const RecentMenuItems: MenuItemData[] = [
  { icon: <Users />, label: "Employees", to: "/hr/employees" },
  { icon: <UserPlus />, label: "Onboarding", to: "/hr/onboarding" },
  { icon: <Clock />, label: "Attendance", to: "/hr/attendance" },
  { icon: <CalendarOff />, label: "Leave Requests", to: "/hr/leaves" },
];

const MenuItem: React.FC<MenuItemData> = ({ icon, label, to }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton render={<Link to={to} />}>
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
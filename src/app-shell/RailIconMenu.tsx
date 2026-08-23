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

const RailIconMenu = () => {
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

        <SidebarContent className="overflow-y-auto! bg-muted text-foreground">
          <SidebarGroup>
            <SidebarGroupLabel>Common</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {CommonRailItems.map((item) => (
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


          <SidebarGroup>
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {RecentRailItems.map((item) => (
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

          <SidebarGroup>
            <SidebarGroupLabel>Modules</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ModuleRailItems.map((item) => (
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
};

const CommonRailItems: RialIconMenu[] = [
  { icon: <LayoutDashboard />, label: "Overview", to: "/" },
  { icon: <Inbox />, label: "Chat", to: "/ping/Bob" },
  { icon: <PackageOpen />, label: "My Files", to: "/ping/Alice" },
];

const RecentRailItems: RialIconMenu[] = [
  { icon: <ShoppingCart />, label: "Sales & CRM", to: "/sales" },
  { icon: <Package />, label: "Inventory", to: "/inventory" },
  { icon: <Receipt />, label: "Accounting & Finance", to: "/finance" },
  { icon: <Users />, label: "Human Resources", to: "/hr" },
  { icon: <Settings />, label: "Settings", to: "/settings" },
];

const ModuleRailItems: RialIconMenu[] = [
  { icon: <ShoppingCart />, label: "Sales & CRM", to: "/sales" },
  { icon: <Package />, label: "Inventory", to: "/inventory" },
  { icon: <Receipt />, label: "Accounting & Finance", to: "/finance" },
  { icon: <Users />, label: "Human Resources", to: "/hr" },
  { icon: <Building2 />, label: "Procurement", to: "/procurement" },
  { icon: <Truck />, label: "Supply Chain", to: "/supply-chain" },
  { icon: <UserCheck />, label: "Customer Portal", to: "/customers" },
  { icon: <BarChart3 />, label: "Reports & Analytics", to: "/reports" },
  { icon: <Settings />, label: "Settings", to: "/settings" },
  { icon: <Contact />, label: "Contacts", to: "/odoo/contacts" },
  { icon: <ShoppingBag />, label: "Sales", to: "/odoo/sales" },
  { icon: <ShoppingCart />, label: "Purchase", to: "/odoo/purchase" },
  { icon: <Layers />, label: "Inventory", to: "/odoo/inventory" },
  { icon: <Building />, label: "Manufacturing", to: "/odoo/mrp" },
  { icon: <Receipt />, label: "Invoicing", to: "/odoo/invoicing" },
  { icon: <Users />, label: "Employees", to: "/odoo/employees" },
  { icon: <Briefcase />, label: "Projects", to: "/odoo/projects" },
  { icon: <Megaphone />, label: "Marketing", to: "/odoo/marketing" },
  { icon: <Globe />, label: "Website", to: "/odoo/website" },
  { icon: <ShoppingCart />, label: "Sales & CRM", to: "/sales" },
  { icon: <Package />, label: "Inventory", to: "/inventory" },
  { icon: <Receipt />, label: "Accounting & Finance", to: "/finance" },
  { icon: <Users />, label: "Human Resources", to: "/hr" },
  { icon: <Building2 />, label: "Procurement", to: "/procurement" },
  { icon: <Truck />, label: "Supply Chain", to: "/supply-chain" },
  { icon: <UserCheck />, label: "Customer Portal", to: "/customers" },
  { icon: <BarChart3 />, label: "Reports & Analytics", to: "/reports" },
  { icon: <Settings />, label: "Settings", to: "/settings" },
  { icon: <Contact />, label: "Contacts", to: "/odoo/contacts" },
  { icon: <ShoppingBag />, label: "Sales", to: "/odoo/sales" },
  { icon: <ShoppingCart />, label: "Purchase", to: "/odoo/purchase" },
  { icon: <Layers />, label: "Inventory", to: "/odoo/inventory" },
  { icon: <Building />, label: "Manufacturing", to: "/odoo/mrp" },
  { icon: <Receipt />, label: "Invoicing", to: "/odoo/invoicing" },
  { icon: <Users />, label: "Employees", to: "/odoo/employees" },
  { icon: <Briefcase />, label: "Projects", to: "/odoo/projects" },
  { icon: <Megaphone />, label: "Marketing", to: "/odoo/marketing" },
  { icon: <Globe />, label: "Website", to: "/odoo/website" },
];


const RialIconMenuItem: React.FC<RialIconMenu> = ({ icon, label, to }) => {
  const { setMenuOpen } = useAppShell();
  return (
    <SidebarMenuItem>
      <Tooltip>
        <TooltipTrigger>
          <SidebarMenuButton
            onClick={()=>setMenuOpen(true)}
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

export default RailIconMenu;

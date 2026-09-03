import { Fragment, type FC } from "react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { AvatarMenu } from "@/features/profile/AvatarMenu";
import { useAppShellMenu } from "../context/AppShellContext";
import { RailMenuItem } from "./RailMenuItem";

export const RailIconMenu: FC = () => {
  const { menuOpen, setMenuOpen, appMenu, selectedPrime } = useAppShellMenu();

  return (
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
                    <RailMenuItem
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
            <SidebarSeparator />
          </Fragment>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-muted text-foreground">
        <AvatarMenu />
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default RailIconMenu;

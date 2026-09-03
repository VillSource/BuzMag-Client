import type { FC, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export type SideMenuItemProps = {
  icon: ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
};

export const SideMenuItem: FC<SideMenuItemProps> = ({
  icon,
  label,
  to,
  isActive,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} render={<Link to={to} />}>
        <span>{icon}</span>
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

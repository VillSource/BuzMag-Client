import type { FC, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { PrimaryMenuType } from "../types";

export type RailMenuItemProps = {
  icon: ReactNode;
  label: string;
  to: string;
  module?: PrimaryMenuType;
  isActive?: boolean;
};

export const RailMenuItem: FC<RailMenuItemProps> = ({
  icon,
  label,
  to,
  isActive,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={<Link to={to} />}
        tooltip={label}
      >
        <span className={cn(isActive ? "text-primary" : undefined)}>
          {icon}
        </span>
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

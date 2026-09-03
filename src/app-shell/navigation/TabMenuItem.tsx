import type { FC, ReactNode } from "react";
import { TabsTrigger } from "@/components/motion/tabs";

export type TabMenuItemProps = {
  icon?: ReactNode;
  label: string;
  to: string;
};

export const TabMenuItem: FC<TabMenuItemProps> = ({ label, to }) => {
  return (
    <TabsTrigger value={to} className="py-1">
      <span>{label}</span>
    </TabsTrigger>
  );
};

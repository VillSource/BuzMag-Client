import { ClockFading, Menu } from "lucide-react";
import { Dock, DockItem, DockSeparator } from "@/components/motion/dock";
import { useDockMenu } from "./use-menu";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useAppShell } from "./AppShell";

export const MobileNav = () => {
  const { direction } = useScrollDirection({ direction: "both" });
  const ITEMS = useDockMenu();
  const navigate = useNavigate();
  const { selectedPrime } = useAppShell();

  const [active, setActive] = useState<string | undefined>();
  const visible = direction !== "down";

  // Auto-sync active state with the current selectedPrime
  useEffect(() => {
    setActive(selectedPrime?.lable ?? undefined);
  }, [selectedPrime]);

  const handleItemClick = (item: { lable: string; path: string }) => {
    setActive(item.lable);
    navigate({ to: item.path });
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 flex w-full justify-center transition-transform duration-200",
        visible ? "translate-y-0" : "translate-y-[calc(100%+1rem)]",
      )}
    >
      <Dock>
        {ITEMS.map((item) => (
          <DockItem
            key={item.lable}
            aria-label={item.lable}
            active={active === item.lable}
            onClick={() => handleItemClick(item)}
          >
            {item.icon}
          </DockItem>
        ))}
        <DockSeparator />
        <DockItem
          aria-label="Recent"
          active={active === "recent"}
          onClick={() => navigate({to:'/ping/$name', params:{name: 'eiei'}})}
        >
          <ClockFading className="h-5 w-5" />
        </DockItem>
        <DockItem
          aria-label="Settings"
          active={active === "settings"}
          onClick={() => navigate({to:'/'})}
        >
          <Menu className="h-5 w-5" />
        </DockItem>
      </Dock>
    </div>
  );
};

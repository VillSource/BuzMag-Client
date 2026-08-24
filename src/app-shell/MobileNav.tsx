import { Menu } from "lucide-react";
import { Dock, DockItem, DockSeparator } from "@/components/motion/dock";
import { useDockMenu, type PrimaryMenuType } from "./use-menu";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import {
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ReactNode,
} from "react";
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
        {!!selectedPrime &&
          ITEMS.findIndex((i) => i.lable == selectedPrime.lable) < 0 && (
            <DockItem
              key={selectedPrime.lable}
              aria-label={selectedPrime?.lable}
              active={active === selectedPrime?.lable}
              onClick={() => handleItemClick(selectedPrime)}
            >
              {isValidElement(selectedPrime.icon)
                ? cloneElement(
                    selectedPrime.icon as React.ReactElement<{
                      className?: string;
                    }>,
                    {
                      className: "h-5 w-5",
                    },
                  )
                : selectedPrime.icon}
            </DockItem>
          )}
        <DockItem
          aria-label="Settings"
          active={active === "settings"}
          onClick={() => navigate({ to: "/" })}
        >
          <Menu className="h-5 w-5" />
        </DockItem>
      </Dock>
    </div>
  );
};

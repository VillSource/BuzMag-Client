import { useEffect, useRef, useState, type FC } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Tabs, TabsList } from "@/components/motion/tabs";
import { useAppShellMenu } from "../context/AppShellContext";
import { TabMenuItem } from "./TabMenuItem";

export const TabMenu: FC = () => {
  const [activeTab, setActiveTab] = useState<string | undefined>();
  const [hasTabsLeft, setHasTabsLeft] = useState(false);
  const [hasTabsRight, setHasTabsRight] = useState(false);
  const tabsListRef = useRef<HTMLDivElement>(null);

  const { selectedPrime, selectedSec } = useAppShellMenu();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSec) {
      setActiveTab(selectedSec.path);
    } else {
      setActiveTab(undefined);
    }
  }, [selectedSec]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate({ to: value });
  };

  const updateTabScrollState = () => {
    const element = tabsListRef.current;
    if (!element) {
      return;
    }

    setHasTabsLeft(element.scrollLeft > 0);
    setHasTabsRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    );
  };

  useEffect(() => {
    updateTabScrollState();
    window.addEventListener("resize", updateTabScrollState);
    return () => window.removeEventListener("resize", updateTabScrollState);
  }, []);

  useEffect(() => {
    tabsListRef.current
      ?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
  }, [activeTab]);

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} variant="underline">
      <div className="relative">
        <div
          ref={tabsListRef}
          onScroll={updateTabScrollState}
          className="border-border border-b no-scrollbar h-12 w-full max-w-full overflow-x-scroll transition-transform duration-200"
        >
          <TabsList className="w-max border-b-0">
            {selectedPrime?.menu &&
              selectedPrime.menu
                .flatMap((item) => item.menu)
                .map((item) => (
                  <TabMenuItem
                    key={item.lable}
                    icon={item.icon}
                    label={item.lable}
                    to={item.path}
                  />
                ))}
          </TabsList>
        </div>
        {hasTabsLeft && (
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-background to-transparent" />
        )}
        {hasTabsRight && (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-background to-transparent" />
        )}
      </div>
    </Tabs>
  );
};

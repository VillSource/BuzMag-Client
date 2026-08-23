import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  CalendarOff,
  Clock,
  DollarSign,
  FileText,
  Sliders,
  UserPlus,
  Users,
} from "lucide-react";

export const TabMenu = () => {
  const [activeTab, setActiveTab] = useState("Reports");
  const [hasTabsLeft, setHasTabsLeft] = useState(false);
  const [hasTabsRight, setHasTabsRight] = useState(false);
  const tabsListRef = useRef<HTMLDivElement>(null);

  const updateTabScrollState = () => {
    const element = tabsListRef.current;
    if (!element) {
      return;
    }

    setHasTabsLeft(element.scrollLeft > 0);
    setHasTabsRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
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
    <Tabs value={activeTab} onValueChange={setActiveTab} variant="underline">
      <div className="relative">
        <div
          ref={tabsListRef}
          onScroll={updateTabScrollState}
          className="border-border border-b no-scrollbar h-12 w-full max-w-full overflow-x-scroll transition-transform duration-200"
        >
          <TabsList className="w-max border-b-0">
          <TabsTrigger value="all" className="py-1">
            All
          </TabsTrigger>
          <TabsTrigger value="open" className="py-1">
            Open
          </TabsTrigger>
          {HRMenuItems.map((item) => (
            <TabItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.to}
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

const TabItem: React.FC<MenuItemData> = ({ label }) => {
  return (
    <TabsTrigger value={label} className="py-1">
      <span>{label}</span>
    </TabsTrigger>
  );
};

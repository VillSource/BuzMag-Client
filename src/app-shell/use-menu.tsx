import {
  Award,
  BarChart,
  Boxes,
  Building,
  Calendar,
  CalendarCheck,
  CheckCircle,
  CheckSquare,
  ClipboardList,
  Clock,
  Compass,
  CreditCard,
  DollarSign,
  Factory,
  FileText,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  MapPin,
  Megaphone,
  PackageOpen,
  PieChart,
  Receipt,
  Share2,
  ShoppingCart,
  Store,
  Target,
  TrendingUp,
  Truck,
  UserCheck,
  Users,
  Warehouse,
  Wrench,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export type PrimaryMenuGroupType = {
  lable: string;
  menu: PrimaryMenuType[];
};
export type PrimaryMenuType = {
  icon: ReactNode;
  lable: string;
  path: string;
  menu?: SecondaryMenuGroupType[];
};
export type SecondaryMenuGroupType = {
  lable: string;
  menu: SecondaryMenuType[];
};
export type SecondaryMenuType = {
  icon: ReactNode;
  lable: string;
  path: string;
};

export type MenuMatchResult = {
  prime: PrimaryMenuType | undefined;
  sec: SecondaryMenuType | undefined;
};

type FlatMenuEntry = {
  prime: PrimaryMenuType;
  sec?: SecondaryMenuType;
  path: string;
};

/**
 * Flattens the nested menu hierarchy into a single list of entries.
 */
function flattenMenu(appMenu: PrimaryMenuGroupType[]): FlatMenuEntry[] {
  return appMenu.flatMap((group) =>
    group.menu.flatMap((prime) => {
      const primaryEntry: FlatMenuEntry = { prime, path: prime.path };
      const secondaryEntries: FlatMenuEntry[] = (prime.menu ?? []).flatMap(
        (secGroup) =>
          secGroup.menu.map((sec) => ({ prime, sec, path: sec.path })),
      );
      return [primaryEntry, ...secondaryEntries];
    }),
  );
}

/**
 * Finds the matching primary and secondary menu items for a given pathname.
 */
export function findMenuByPath(
  appMenu: PrimaryMenuGroupType[],
  pathname: string,
): MenuMatchResult {
  if (!appMenu.length || !pathname) {
    return { prime: undefined, sec: undefined };
  }

  const flatEntries = flattenMenu(appMenu);

  // 1. Exact secondary menu match
  const exactSec = flatEntries.find(
    (entry) => entry.sec && entry.path === pathname,
  );
  if (exactSec) {
    return { prime: exactSec.prime, sec: exactSec.sec };
  }

  // 2. Exact primary menu match
  const exactPrime = flatEntries.find(
    (entry) => !entry.sec && entry.path === pathname,
  );
  if (exactPrime) {
    return { prime: exactPrime.prime, sec: undefined };
  }

  // 3. Longest prefix match fallback for dynamic or nested sub-paths
  const prefixMatches = flatEntries.filter((entry) =>
    pathname.startsWith(entry.path),
  );
  if (prefixMatches.length === 0) {
    return { prime: undefined, sec: undefined };
  }

  const bestMatch = prefixMatches.reduce((best, current) =>
    current.path.length > best.path.length ? current : best,
  );

  return { prime: bestMatch.prime, sec: bestMatch.sec };
}

export function useAppMenu() {
  const [commonMenu, setCommonMenu] = useState<PrimaryMenuGroupType[]>([]);
  const [recentMenu, setRecentMenu] = useState<PrimaryMenuGroupType[]>([]);
  const [menu, setMenu] = useState<PrimaryMenuGroupType[]>([]);

  useEffect(() => {
    setCommonMenu([
      {
        lable: "Common",
        menu: [
          { icon: <LayoutDashboard />, lable: "Dashboard", path: "/dashboard" },
          { icon: <Inbox />, lable: "Chat", path: "/chat" },
          { icon: <PackageOpen />, lable: "My files", path: "/my-files" },
        ],
      },
    ]);
    setRecentMenu([
      {
        lable: "Recent",
        menu: [
          {
            icon: <LayoutDashboard />,
            lable: "Dashboard2",
            path: "/dashboard2",
          },
          { icon: <Inbox />, lable: "Chat2", path: "/chat2" },
          { icon: <PackageOpen />, lable: "My files2", path: "/my-files2" },
        ],
      },
    ]);
    const odooErpMenuData: PrimaryMenuGroupType[] = [
      {
        lable: "Modules",
        menu: [
          // 1. Sales
          {
            icon: <TrendingUp />,
            lable: "Sales",
            path: "/sales",
            menu: [
              {
                lable: "Sales",
                menu: [
                  {
                    icon: <TrendingUp />,
                    lable: "Orders",
                    path: "/sales/orders",
                  },
                  {
                    icon: <FileText />,
                    lable: "Quotations",
                    path: "/sales/quotations",
                  },
                  {
                    icon: <Users />,
                    lable: "Customers",
                    path: "/sales/customers",
                  },
                ],
              },
              {
                lable: "CRM & Channels",
                menu: [
                  {
                    icon: <Target />,
                    lable: "Pipeline",
                    path: "/crm/pipeline",
                  },
                  {
                    icon: <ShoppingCart />,
                    lable: "eCommerce",
                    path: "/sales/ecommerce",
                  },
                  {
                    icon: <Store />,
                    lable: "Point of Sale",
                    path: "/sales/pos",
                  },
                ],
              },
            ],
          },

          // 2. Finance
          {
            icon: <DollarSign />,
            lable: "Finance",
            path: "/finance",
            menu: [
              {
                lable: "Accounting & Invoicing",
                menu: [
                  {
                    icon: <Receipt />,
                    lable: "Invoicing",
                    path: "/finance/invoicing",
                  },
                  {
                    icon: <CreditCard />,
                    lable: "Payments",
                    path: "/finance/payments",
                  },
                  {
                    icon: <Building />,
                    lable: "Bank Synchronization",
                    path: "/finance/bank",
                  },
                ],
              },
              {
                lable: "Management & Expenses",
                menu: [
                  {
                    icon: <Receipt />,
                    lable: "Expenses",
                    path: "/finance/expenses",
                  },
                  {
                    icon: <PieChart />,
                    lable: "Financial Reports",
                    path: "/finance/reports",
                  },
                ],
              },
            ],
          },

          // 3. Inventory & Manufacturing
          {
            icon: <Boxes />,
            lable: "Inventory & Manufacturing",
            path: "/inventory",
            menu: [
              {
                lable: "Supply Chain",
                menu: [
                  {
                    icon: <Boxes />,
                    lable: "Inventory",
                    path: "/inventory/stock",
                  },
                  {
                    icon: <Truck />,
                    lable: "Purchase (MRP)",
                    path: "/inventory/purchase",
                  },
                  {
                    icon: <ClipboardList />,
                    lable: "Transfers",
                    path: "/inventory/transfers",
                  },
                ],
              },
              {
                lable: "Manufacturing & Quality",
                menu: [
                  {
                    icon: <Factory />,
                    lable: "Manufacturing (MRP)",
                    path: "/manufacturing/orders",
                  },
                  {
                    icon: <Wrench />,
                    lable: "Maintenance",
                    path: "/manufacturing/maintenance",
                  },
                  {
                    icon: <CheckSquare />,
                    lable: "Quality Control",
                    path: "/manufacturing/quality",
                  },
                ],
              },
            ],
          },

          // 4. Human Resources
          {
            icon: <UserCheck />,
            lable: "Human Resources",
            path: "/hr",
            menu: [
              {
                lable: "Employee Management",
                menu: [
                  {
                    icon: <Users />,
                    lable: "Employees",
                    path: "/hr/employees",
                  },
                  {
                    icon: <UserCheck />,
                    lable: "Recruitment",
                    path: "/hr/recruitment",
                  },
                  {
                    icon: <Calendar />,
                    lable: "Time Off",
                    path: "/hr/time-off",
                  },
                ],
              },
              {
                lable: "Performance & Ops",
                menu: [
                  {
                    icon: <Award />,
                    lable: "Appraisals",
                    path: "/hr/appraisals",
                  },
                  {
                    icon: <Clock />,
                    lable: "Attendances",
                    path: "/hr/attendances",
                  },
                  { icon: <FileText />, lable: "Payroll", path: "/hr/payroll" },
                ],
              },
            ],
          },

          // 5. Marketing
          {
            icon: <Megaphone />,
            lable: "Marketing",
            path: "/marketing",
            menu: [
              {
                lable: "Outreach & Automation",
                menu: [
                  {
                    icon: <Megaphone />,
                    lable: "Marketing Automation",
                    path: "/marketing/automation",
                  },
                  {
                    icon: <FileText />,
                    lable: "Email Marketing",
                    path: "/marketing/email",
                  },
                  {
                    icon: <Share2 />,
                    lable: "Social Marketing",
                    path: "/marketing/social",
                  },
                ],
              },
              {
                lable: "Events & Web",
                menu: [
                  {
                    icon: <Calendar />,
                    lable: "Events",
                    path: "/marketing/events",
                  },
                  {
                    icon: <Compass />,
                    lable: "Surveys",
                    path: "/marketing/surveys",
                  },
                ],
              },
            ],
          },

          // 6. Services
          {
            icon: <FolderKanban />,
            lable: "Services",
            path: "/services",
            menu: [
              {
                lable: "Project & Operations",
                menu: [
                  {
                    icon: <FolderKanban />,
                    lable: "Project",
                    path: "/project",
                  },
                  {
                    icon: <Clock />,
                    lable: "Timesheets",
                    path: "/timesheets",
                  },
                  {
                    icon: <MapPin />,
                    lable: "Field Service",
                    path: "/field-service",
                  },
                ],
              },
              {
                lable: "Support & Scheduling",
                menu: [
                  {
                    icon: <LifeBuoy />,
                    lable: "Helpdesk",
                    path: "/helpdesk",
                  },
                  {
                    icon: <Calendar />,
                    lable: "Planning",
                    path: "/planning",
                  },
                  {
                    icon: <CalendarCheck />,
                    lable: "Appointments",
                    path: "/appointments",
                  },
                ],
              },
            ],
          },

          // 7. Productivity
          {
            icon: <CheckSquare />,
            lable: "Productivity",
            path: "/productivity",
            menu: [
              {
                lable: "Approvals & Workflow",
                menu: [
                  {
                    icon: <CheckSquare />,
                    lable: "Approvals",
                    path: "/productivity/approvals",
                  },
                  {
                    icon: <FileText />,
                    lable: "Documents",
                    path: "/productivity/documents",
                  },
                  {
                    icon: <CheckSquare />,
                    lable: "To-Do / Tasks",
                    path: "/productivity/todo",
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    setMenu(odooErpMenuData);
  }, []);

  return [...commonMenu, ...recentMenu, ...menu];
}

export function useDockMenu() {
  const [menu, setMenu] = useState<PrimaryMenuType[]>([]);
  useEffect(() => {
    setMenu([
      { icon: <LayoutDashboard className="w-5 h-5"/>, lable: "Dashboard", path: "/dashboard" },
      { icon: <Inbox  className="w-5 h-5"/>, lable: "Chat", path: "/chat" },
      { icon: <TrendingUp  className="w-5 h-5"/>, lable: "Sales", path: "/sales" },
      { icon: <Megaphone  className="w-5 h-5"/>, lable: "Marketing", path: "/marketing" },
    ]);
  },[]);
  return menu;
}

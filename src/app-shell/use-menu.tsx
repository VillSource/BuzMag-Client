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
          { icon: <LayoutDashboard />, lable: "Dashboard", path: "/dashboard" },
          { icon: <Inbox />, lable: "Chat", path: "/chat" },
          { icon: <PackageOpen />, lable: "My files", path: "/my-files" },
        ],
      },
    ]);
    const erpMenuData: PrimaryMenuGroupType[] = [
      {
        lable: "Modules",
        menu: [
          // 1. Sales
          {
            icon: <TrendingUp />,
            lable: "Sales",
            path: '/sales',
            menu: [
              {
                lable: "Invoicing & Orders",
                menu: [
                  {
                    icon: <FileText />,
                    lable: "Quotations",
                    path: "/quotations",
                  },
                  {
                    icon: <ClipboardList />,
                    lable: "Sales Orders",
                    path: "/orders",
                  },
                  {
                    icon: <Receipt />,
                    lable: "Invoices",
                    path: "/invoices",
                  },
                ],
              },
              {
                lable: "Customer Relations",
                menu: [
                  {
                    icon: <Users />,
                    lable: "Customers",
                    path: "/customers",
                  },
                  {
                    icon: <Target />,
                    lable: "Leads & Opportunities",
                    path: "/leads",
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
                lable: "Accounting",
                menu: [
                  {
                    icon: <Receipt />,
                    lable: "Invoicing & Billing",
                    path: "/invoices",
                  },
                  {
                    icon: <CreditCard />,
                    lable: "Payments",
                    path: "/payments",
                  },
                  {
                    icon: <FileText />,
                    lable: "General Ledger",
                    path: "/ledger",
                  },
                ],
              },
              {
                lable: "Reporting",
                menu: [
                  {
                    icon: <PieChart />,
                    lable: "Balance Sheet",
                    path: "/balance-sheet",
                  },
                  {
                    icon: <BarChart />,
                    lable: "Profit & Loss",
                    path: "/profit-loss",
                  },
                ],
              },
            ],
          },

          // 3. Inventory & Manufacturing
          {
            icon: <Boxes />,
            lable: "Inventory & Manufacturing",
            path: "/i-m",
            menu: [
              {
                lable: "Inventory Management",
                menu: [
                  {
                    icon: <Warehouse />,
                    lable: "Products & Stock",
                    path: "/products",
                  },
                  {
                    icon: <ClipboardList />,
                    lable: "Stock Transfers",
                    path: "/transfers",
                  },
                ],
              },
              {
                lable: "Manufacturing",
                menu: [
                  {
                    icon: <Factory />,
                    lable: "Work Orders",
                    path: "/work-orders",
                  },
                  {
                    icon: <FileText />,
                    lable: "Bill of Materials",
                    path: "/bom",
                  },
                ],
              },
            ],
          },

          // 4. Human Resources
          {
            icon: <Users />,
            lable: "Human Resource",
            path: '/hr',
            menu: [
              {
                lable: "Self Services",
                menu: [
                  {
                    icon: <FileText />,
                    lable: "Leave Request",
                    path: "/leave-request",
                  },
                  {
                    icon: <FileText />,
                    lable: "Document Request",
                    path: "/document-request",
                  },
                  {
                    icon: <Receipt />,
                    lable: "Tax-Deductible",
                    path: "/tax-deductible",
                  },
                ],
              },
              {
                lable: "Recruitment",
                menu: [
                  {
                    icon: <UserCheck />,
                    lable: "Applications",
                    path: "/applications",
                  },
                  {
                    icon: <Users />,
                    lable: "Referrals",
                    path: "/referrals",
                  },
                ],
              },
              {
                lable: "Performance",
                menu: [
                  {
                    icon: <Target />,
                    lable: "KPIs & Reviews",
                    path: "/kpi",
                  },
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
                lable: "Campaigns",
                menu: [
                  {
                    icon: <Megaphone />,
                    lable: "Email Marketing",
                    path: "/email",
                  },
                  {
                    icon: <Share2 />,
                    lable: "Social Media",
                    path: "/social",
                  },
                ],
              },
              {
                lable: "Analytics",
                menu: [
                  {
                    icon: <BarChart />,
                    lable: "Campaign Analytics",
                    path: "/analytics",
                  },
                ],
              },
            ],
          },

          // 6. Services
          {
            icon: <Wrench />,
            lable: "Services",
            path: "service",
            menu: [
              {
                lable: "Projects & Field",
                menu: [
                  {
                    icon: <FolderKanban />,
                    lable: "Projects",
                    path: "/projects",
                  },
                  {
                    icon: <Clock />,
                    lable: "Timesheets",
                    path: "/timesheets",
                  },
                  {
                    icon: <MapPin />,
                    lable: "Field Services",
                    path: "/field-services",
                  },
                ],
              },
              {
                lable: "Support & Schedule",
                menu: [
                  {
                    icon: <LifeBuoy />,
                    lable: "Helpdesk",
                    path: "/services/helpdesk",
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
            icon: <CheckCircle />,
            lable: "Productivity",
            path:"/productivity",
            menu: [
              {
                lable: "Approvals",
                menu: [
                  {
                    icon: <CheckSquare />,
                    lable: "Pending Approvals",
                    path: "/productivity/approvals/pending",
                  },
                  {
                    icon: <FileText />,
                    lable: "Approval History",
                    path: "/productivity/approvals/history",
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
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
            path:"/finance",
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
            path:"/marketing",
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
            path:"services",
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

  return [ ...commonMenu, ...recentMenu, ...menu ];
}

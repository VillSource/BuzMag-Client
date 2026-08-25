import React, { useCallback } from "react";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangleIcon,
  Bell,
  Building2Icon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  CopyIcon,
  DotIcon,
  PlusIcon,
  SearchIcon,
  Settings,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";
import { Separator } from "../components/ui/separator";
import { useAppShell } from "@/app-shell/AppShell";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { AvatarMenu } from "@/features/profile/AvatarMenu";
import { NotificationPanel } from "@/features/notification/Notification";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useNavigate } from "@tanstack/react-router";

const ActionBar: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex-1 flex-row flex items-center justify-between">
        {isMobile ? <BrandIcon /> : <BreadcrumbOutlineDemo />}
        {!isMobile && <InputGroupInlineStart />}
        <div className="flex items-center space-x-2 ">
          {isMobile && (
            <Button
              type="button"
              variant="secondary"
              size="default"
              aria-label="Search"
            >
              <SearchIcon data-icon="inline-start" />
            </Button>
          )}
          <Action />
          <BellNotificationButton />
          {isMobile && <AvatarMenu />}
        </div>
      </div>
    </>
  );
};

const BrandNav = () => {
  const organizations = ["Acme Inc", "Starter Kit", "Enterprise"];
  const organizationPlans: Record<string, string> = {
    "Acme Inc": "Pro",
    "Starter Kit": "Free",
    Enterprise: "Enterprise",
  };

  return (
    <div className="flex items-center gap-3">
      <Combobox items={organizations} defaultValue="Acme Inc">
        <ComboboxInput
          className="h-8 w-auto border-0 bg-transparent shadow-none"
          placeholder="Organization"
          readOnly
          aria-label="Select organization"
        >
          <InputGroupAddon align="inline-start">
            <span className="flex size-5 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 text-white">
              <Building2Icon aria-hidden="true" className="size-3" />
            </span>
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxContent>
          <div className="px-3 pb-1 pt-2 text-sm font-medium text-muted-foreground">
            Organizations
          </div>
          <ComboboxEmpty className="px-3">
            No organizations found.
          </ComboboxEmpty>
          <ComboboxList className="p-2">
            {(item) => (
              <ComboboxItem key={item} value={item} className="min-h-16 py-2">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 text-white">
                  <Building2Icon aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium">{item}</span>
                  <span className="text-sm text-muted-foreground">
                    {organizationPlans[item]}
                  </span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
          <Separator />
          <Button
            type="button"
            variant="ghost"
            className="h-12 w-full justify-start rounded-none px-4"
          >
            <PlusIcon data-icon="inline-start" />
            Create Organization
          </Button>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export function InputGroupInlineStart() {
  return (
    <InputGroup className={cn("min-w-3 ms-auto me-4 w-auto max-w-sm")}>
      <InputGroupInput id="inline-start-input" placeholder="Search..." />
      <InputGroupAddon align="inline-start">
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
    </InputGroup>
  );
}

const BrandIcon = () => {
  return (
    <>
      <div className="transition-all overflow-hidden rounded-sm w-8 h-8 bg-amber-800 flex items-center justify-center text-white">
        <span className="">M</span>
      </div>
    </>
  );
};

export function BellNotificationButton() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { setPanelContent: setRightbar, setPanelOpen: setSidebarOpen } =
    useAppShell();

  const handleActionClick = () => {
    if (isMobile) return navigate({ to: "/notification" });
    setRightbar?.(
      <div onClick={() => setSidebarOpen(false)}>
        {" "}
        <NotificationPanel />
      </div>,
    );
    setSidebarOpen(true);
  };
  return (
    <Button
      variant="ghost"
      className="group/noti relative inline-block"
      onClick={handleActionClick}
    >
      <Bell className="h-5 w-5 transition-all group-hover/noti:rotate-45 group-hover/noti:scale-120" />
      <span className="absolute top-1 right-1 flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
      </span>
    </Button>
  );
}

const Action = () => {
  const isMobile = useIsMobile();
  const {
    setPanelContent: setRightbar,
    setPanelOpen: setSidebarOpen,
    setSheetOpen: setopenSheet,
  } = useAppShell();

  const handleActionClick = useCallback(() => {
    if (isMobile) {
      setopenSheet(true);
    } else {
      setSidebarOpen(true);
      setRightbar(
        <div style={{ padding: 8 }}>
          Action content{" "}
          <span>
            <X onClick={() => setSidebarOpen(false)} />
          </span>
        </div>,
      );
    }
  }, [setRightbar, setSidebarOpen, isMobile, setopenSheet]);
  return (
    <>
      <ButtonGroup>
        <Button variant="outline" onClick={handleActionClick}>
          Action
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="pl-2!">
                <ChevronDownIcon />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <VolumeOffIcon />
                Mute Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckIcon />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertTriangleIcon />
                Report Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserRoundXIcon />
                Block User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShareIcon />
                Share Conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CopyIcon />
                Copy Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <TrashIcon />
                Delete Conversation
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </>
  );
};

const BreadcrumbOutlineDemo = () => {
  const { selectedPrime, selectedSec } = useAppShell();
  return (
    <Breadcrumb>
      <BreadcrumbList className="h-8 gap-2 rounded-lg border px-3 text-sm">
        <div className="bg-muted flex items-center rounded-full px-1.5 py-0.5 mr-1">
          <a href="#">
            <ChevronLeft size={16} className="text-foreground cursor-pointer" />
          </a>
          <a href="#">
            <ChevronRight size={16} className="text-foreground/60" />
          </a>
        </div>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            <img
              src={
                "https://images.shadcnspace.com/assets/shadcn-dashboard/logo/white-logo.svg"
              }
              width={20}
              height={20}
            />
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {!!selectedPrime && (
          <>
            <BreadcrumbSeparator>
              <DotIcon className="size-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Link to={!!selectedSec ? selectedPrime.path : "#"}>
                <BreadcrumbLink className="flex items-center gap-2">
                  <Settings className="size-4" />
                  {/* {selectedPrime.icon} */}
                  {selectedPrime.lable}
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </>
        )}
        {!!selectedSec && (
          <>
            <BreadcrumbSeparator>
              <DotIcon className="size-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2">
                <CircleUserRound className="inline size-4" />
                {/* {selectedSec.icon} */}
                {selectedSec.lable}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ActionBar;

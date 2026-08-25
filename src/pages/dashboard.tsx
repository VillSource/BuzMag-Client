import { useAppShell } from "@/app-shell/AppShell";
import AppbarSlotContext from "@/app-shell/use-appbarSlot";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
  X,
} from "lucide-react";
import { useCallback, useEffect } from "react";

export default function DashboardPage() {
  return (
    <section>
      <h1>Dashboard</h1>
      <AppbarSlotContext>
        <Action />
      </AppbarSlotContext>
    </section>
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

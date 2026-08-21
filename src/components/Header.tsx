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
  Badge,
  Bell,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAppShell } from "@/app-shell/AppShell";

const Header: React.FC = () => {
  return (
    <>
      <div className="flex-1 flex-row flex items-center justify-between">
        <div className="">BuzMag</div>
        <div className="">search</div>
        <div className="flex items-center space-x-2 ">
          {Action()}
          {BellNotificationButton()}
        </div>
      </div>
    </>
  );
};

export function BellNotificationButton() {
  return (
    <Button variant="ghost" className="group/noti relative inline-block">
      <Bell className="h-5 w-5 transition-all group-hover/noti:rotate-45 group-hover/noti:scale-120"/>
      <span className="absolute top-1 right-1 flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
      </span>
    </Button>
  );
}


const Action = () => {
  const { setRightbar, setSidebarOpen, sidebarOpen } = useAppShell();
  const handleActionClick = useCallback(() => {
    setRightbar?.(<div style={{ padding: 8 }}>Rightbar actions (example)</div>);
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen]);
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

export default Header;

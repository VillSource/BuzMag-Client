import type { FC } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { NotificationPanel } from "@/features/notification/Notification";
import { useAppShellPanel } from "../context/AppShellContext";

export const BellNotification: FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { setPanelContent: setRightbar, setPanelOpen: setSidebarOpen } =
    useAppShellPanel();

  const handleActionClick = () => {
    if (isMobile) return navigate({ to: "/notification" });
    setRightbar?.(<div><NotificationPanel /></div>);
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
};

export const BellNotificationButton = BellNotification;

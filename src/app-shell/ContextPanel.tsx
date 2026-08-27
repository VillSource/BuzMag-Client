import {
  Sidebar as ShadcnSidebar,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { useAppShell } from "./AppShell";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ContextPanel = ({ client }: { client?: ReactNode }) => {
  const { setPanelOpen, panelOpen } = useAppShell();
  return (
    <>
      <ShadcnSidebar
        variant="sidebar"
        className="absolute group/coll  inset-y-0 right-0 z-10 border-l h-full min-h-0"
        side="right"
      >
        {client}
        {!!panelOpen && (
          <>
            <div className="absolute flex items-center justify-center -left-3 w-6 h-full ">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <ChevronRight
                      onClick={() => setPanelOpen(false)}
                      className="cursor-pointer group-hover/coll:border group-hover/coll:w-3 m-auto bg-background border-0 rounded h-10 w-0 transition-all"
                    />
                  }
                ></TooltipTrigger>
                <TooltipContent side="left">collapse</TooltipContent>
              </Tooltip>
            </div>
          </>
        )}
      </ShadcnSidebar>
    </>
  );
};

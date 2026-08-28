import {
  Sidebar as ShadcnSidebar,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
} from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook"
import { useAppShell } from "./AppShell";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactNode } from "react";
import { Kbd } from "@/components/ui/kbd";

export const ContextPanel = ({ client }: { client?: ReactNode }) => {
  const { setPanelOpen, panelOpen } = useAppShell();

  useHotkeys('esc', () => {
    setPanelOpen(false);
  }, { enableOnFormTags: true }) 

  // anti shotkey from original component to prevent toggle on ctl+b
  useHotkeys('ctrl+b, meta+b', (e) => {
    e.preventDefault() 
    setPanelOpen(open => !open);
  }, { enableOnFormTags: true })
  
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
                <TooltipContent side="left">collapse <Kbd>esc</Kbd></TooltipContent>
              </Tooltip>
            </div>
          </>
        )}
      </ShadcnSidebar>
    </>
  );
};

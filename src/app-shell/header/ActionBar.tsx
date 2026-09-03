import type { FC } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { AvatarMenu } from "@/features/profile/AvatarMenu";
import { useAppShellSlot } from "../context/AppShellContext";
import { BrandIcon } from "./BrandIcon";
import { Breadcrumb } from "./Breadcrumb";
import { SearchInput } from "./SearchInput";
import { BellNotification } from "./BellNotification";

export const ActionBar: FC = () => {
  const { appbarSlot } = useAppShellSlot();
  const isMobile = useIsMobile();

  return (
    <div className="flex-1 min-w-0 flex-row flex items-center justify-between">
      {isMobile ? <BrandIcon /> : <Breadcrumb />}
      {!isMobile && <SearchInput />}
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
        {!!appbarSlot && appbarSlot}
        <BellNotification />
        {isMobile && <AvatarMenu />}
      </div>
    </div>
  );
};

export default ActionBar;

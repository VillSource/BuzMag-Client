import type { FC } from "react";
import { BottomSheet } from "@/components/motion/bottom-sheet";
import { useAppShellSheet } from "../context/AppShellContext";

export const BottomSheetWrapper: FC = () => {
  const { sheetOpen, setSheetOpen, sheetContent } = useAppShellSheet();

  return (
    <BottomSheet
      open={sheetOpen}
      onOpenChange={setSheetOpen}
      snapPoints={sheetContent?.snapPoints}
      title={sheetContent?.title}
      description={sheetContent?.description}
    >
      {sheetContent?.content}
    </BottomSheet>
  );
};

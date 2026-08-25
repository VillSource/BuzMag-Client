import { useEffect, type ReactNode } from "react";
import { useAppShell } from "./AppShell";

interface AppbarSlotProps {
  children: ReactNode;
}

export default function AppbarSlotContext({  children }: AppbarSlotProps) {
  const { setAppbarSlot } = useAppShell();

  useEffect(() => {
    setAppbarSlot(children);
    return () => setAppbarSlot(undefined);
  }, [children, setAppbarSlot]);

  return null;
}

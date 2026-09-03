import { useEffect, type ReactNode } from "react";
import { useAppShellSlot } from "../context/AppShellContext";

interface AppbarSlotProps {
  children: ReactNode;
}

export default function AppbarSlotContext({ children }: AppbarSlotProps) {
  const { setAppbarSlot } = useAppShellSlot();

  useEffect(() => {
    setAppbarSlot(children);
    return () => setAppbarSlot(undefined);
  }, [children, setAppbarSlot]);

  return null;
}

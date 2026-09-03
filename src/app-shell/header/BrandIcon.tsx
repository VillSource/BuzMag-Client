import type { FC } from "react";
import { useAppShellMenu } from "../context/AppShellContext";

export const BrandIcon: FC = () => {
  const { selectedPrime } = useAppShellMenu();
  return (
    <>
      <div className="transition-all shrink-0 overflow-hidden rounded-sm w-8 h-8 bg-amber-800 flex items-center justify-center text-white">
        <span className="">M</span>
      </div>
      <div className="flex-1 truncate ms-4">
        {!!selectedPrime && selectedPrime.lable}
      </div>
    </>
  );
};

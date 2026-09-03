import type { FC } from "react";
import { ChevronLeft, ChevronRight, CircleUserRound, DotIcon, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Breadcrumb as UiBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppShellMenu } from "../context/AppShellContext";

export const Breadcrumb: FC = () => {
  const { selectedPrime, selectedSec } = useAppShellMenu();
  return (
    <UiBreadcrumb>
      <BreadcrumbList className="h-8 gap-2 rounded-lg border px-3 text-sm">
        <div className="bg-muted flex items-center rounded-full px-1.5 py-0.5 mr-1">
          <a href="#">
            <ChevronLeft size={16} className="text-foreground cursor-pointer" />
          </a>
          <a href="#">
            <ChevronRight size={16} className="text-foreground/60" />
          </a>
        </div>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            <img
              src={
                "https://images.shadcnspace.com/assets/shadcn-dashboard/logo/white-logo.svg"
              }
              width={20}
              height={20}
            />
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {!!selectedPrime && (
          <>
            <BreadcrumbSeparator>
              <DotIcon className="size-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Link to={!!selectedSec ? selectedPrime.path : "#"}>
                <BreadcrumbLink className="flex items-center gap-2">
                  <Settings className="size-4" />
                  {selectedPrime.lable}
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </>
        )}
        {!!selectedSec && (
          <>
            <BreadcrumbSeparator>
              <DotIcon className="size-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2">
                <CircleUserRound className="inline size-4" />
                {selectedSec.lable}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </UiBreadcrumb>
  );
};

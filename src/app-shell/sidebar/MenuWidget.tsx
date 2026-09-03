import type { FC } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MenuWidget: FC = () => {
  return (
    <Card className="w-full max-w-xs mt-3">
      <CardHeader>
        <span>Module Widget</span>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
};

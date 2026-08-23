import React from "react";
import { useAppShell } from "../../app-shell/AppShell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage: React.FC = () => {
  // const { setTopbar } = useAppShell();

  // React.useEffect(() => {
  //   setTopbar?.(<div style={{ padding: 8 }}>Topbar actions (example)</div>);
  //   return () => setTopbar?.(undefined);
  // }, [setTopbar]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 100 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </>
  );
};

const SkeletonCard = () => {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  );
};

export default HomePage;

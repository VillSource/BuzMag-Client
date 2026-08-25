import { useAppMenu } from "@/app-shell/use-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

export default function ModulesPage() {
  const menu = useAppMenu();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menu
          .find((item) => item.lable == "Modules")
          ?.menu.map((item) => (
            <>
              <Link to={item.path} className="w-full h-full">
                <Card className="w-full h-full hover:bg-muted">
                  <CardContent className="flex flex-col gap-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="flex text-muted-foreground text-sm font-medium">
                        Module
                      </h3>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-foreground text-2xl font-medium tracking-tight tabular-nums">
                          {item.lable}
                        </span>
                      </div>
                      <Separator />
                      <div className="text-muted-foreground text-xs">
                        {item.menu?.flatMap((i) => i.lable).join(" • ")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </>
          ))}{" "}
      </div>
    </>
  );
}

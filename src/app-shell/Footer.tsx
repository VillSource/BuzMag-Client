import React from "react";
import { Separator } from "../components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile && <div className="w-full h-22"></div>}
      {!isMobile && (
        <>
          <Separator />
          <div className="p-2 text-center text-sm text-muted-foreground">
            © 2023 BuzMag by Villsource . All rights reserved.
          </div>
        </>
      )}
    </>
  );
};

export default Footer;

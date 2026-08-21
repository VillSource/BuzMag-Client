import React from "react";
import { Separator } from "./ui/separator";

const Footer: React.FC = () => {
  return (
    <>
      <Separator />
      <div className="p-2 text-center text-sm text-muted-foreground">
        © 2023 BuzMag by Villsource . All rights reserved.
      </div>
    </>
  );
};

export default Footer;

import { siteConfig } from "@/lib/config";
import React from "react";

const Banner = () => {
  return (
    <>
      {siteConfig.banner.visible && (
        <div className="text-md w-full bg-primary py-1 text-center text-primary-foreground">
          {siteConfig.banner.title}
        </div>
      )}
    </>
  );
};

export default Banner;

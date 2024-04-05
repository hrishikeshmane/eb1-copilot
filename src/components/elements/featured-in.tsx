import React from "react";
import Cnbc from "../svg/cnbc";
import Toi from "../svg/toi";
import TheEconomicTimes from "../svg/the-economic-times";
import TheHindu from "../svg/the-hindu";

const FeaturedIn = () => {
  return (
    <div className="mx-auto mb-12 flex flex-col dark:fill-white">
      <h3 className="my-1 text-center text-lg font-bold text-muted-foreground">
        As Featured in
      </h3>
      <div className="my-2 flex w-full scale-[.75] flex-wrap items-center justify-center gap-8">
        <Toi />
        <TheEconomicTimes />
        <TheHindu />
        <Cnbc />
      </div>
    </div>
  );
};

export default FeaturedIn;
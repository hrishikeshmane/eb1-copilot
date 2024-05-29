import Header from "@/components/elements/header";

import React from "react";
import PricingGrid from "./_components/pricing-grid";
import PricingTable from "./_components/pricing-table";

const PricingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header />

      <PricingGrid />

      <PricingTable />
    </main>
  );
};

export default PricingPage;

import TestComponent from "@/app/dashboard/master-list/_component/v0-test";
import React from "react";

const page = ({ params }: { params: { masterlistSlug: string } }) => {
  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      <TestComponent masterListId={params.masterlistSlug} />
    </div>
  );
};

export default page;

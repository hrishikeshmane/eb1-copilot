import TestComponent from "@/app/dashboard/master-list/_component/v0-test";
import React from "react";

const page = async (props: { params: Promise<{ masterlistSlug: string }> }) => {
  const params = await props.params;
  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      <TestComponent masterListId={params.masterlistSlug} />
    </div>
  );
};

export default page;

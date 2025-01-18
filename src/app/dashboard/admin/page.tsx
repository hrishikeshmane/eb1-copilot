import React from "react";
import { DataTable } from "./_component/data-table";
import { columns } from "./_component/compact-table";
import { api } from "@/trpc/server";

const page = async () => {
  const customers = await api.userManagement.getAllCustomerDetails({});

  return (
    <div className="px-4">
      <DataTable data={customers} columns={columns} />
    </div>
  );
};

export default page;

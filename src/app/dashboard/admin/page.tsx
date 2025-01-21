"use client";

import React from "react";
import { DataTable } from "./_component/data-table";
import { columns } from "./_component/compact-table";
import { api } from "@/trpc/react";

const Page = () => {
  const {
    data: customers,
    isLoading,
    error,
  } = api.userManagement.getAllCustomerDetails.useQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (!customers) return <h2>Error fetching data: {error?.message}</h2>;

  return (
    <div className="px-4">
      <DataTable data={customers} columns={columns} />
    </div>
  );
};

export default Page;

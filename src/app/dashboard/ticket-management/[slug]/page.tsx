"use client";

import { CustomKanban } from "@/components/elements/custom-kanban";
import React, { useEffect } from "react";
import CustomerSelect from "../_components/customer-select";
import { User } from "@clerk/nextjs/server";
import { api } from "@/trpc/react";
import Loader from "@/components/elements/loader";

const Page = ({ params }: { params: { slug: string } }) => {
  const userId = params.slug;
  const customerUser = api.userManagement.getUser.useQuery({ userId });
  const [selectedCustomer, setSelectedCustomer] = React.useState<
    User | undefined
  >(customerUser.data);

  if (customerUser.isLoading) {
    return <Loader />;
  }

  if (customerUser.isError) {
    return (
      <>
        <h3>Error Fetching User</h3>
      </>
    );
  }

  return (
    <div className="ml-2">
      <CustomKanban
        customer={customerUser.data}
        isInteractable={true}
        isAdmin={true}
      >
        {/* <CustomerSelect
          customers={customers}
          customer={selectedCustomer}
          setCustomer={setSelectedCustomer}
        /> */}
      </CustomKanban>
    </div>
  );
};

export default Page;

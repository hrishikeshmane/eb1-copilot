"use client";

import Loader from "@/components/elements/loader";
import React from "react";
import { api } from "@/trpc/react";
import { User } from "@clerk/nextjs/server";
import UserDetailView from "../_components/user-detail-view";
import CustomerSelect from "../../ticket-management/_components/customer-select";

const Page = ({ params }: { params: { slug: string } }) => {
  const userId = params.slug;
  const customerUser = api.userManagement.getUser.useQuery({ userId });
  const [selectedCustomer, setSelectedCustomer] = React.useState<
    User | undefined
  >(customerUser.data);

  if (customerUser.isLoading) {
    return <Loader />;
  }

  if (customerUser.isError || !customerUser.data) {
    return (
      <>
        <h3>Error Fetching User</h3>
      </>
    );
  }
  console.log("customerUser.data ??", customerUser.data);

  return (
    <div className="ml-2">
      <UserDetailView customer={customerUser.data}>
        <></>
        {/* <CustomerSelect
          customers={customers}
          customer={selectedCustomer}
          setCustomer={setSelectedCustomer}
        /> */}
      </UserDetailView>
    </div>
  );
};

export default Page;

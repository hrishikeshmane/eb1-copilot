"use client";

import {
  Filterbar,
  TicketSheet,
  TicketTable,
} from "@/components/elements/custom-kanban";
import Loader from "@/components/elements/loader";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useMemo } from "react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import React from "react";
import { format } from "date-fns";
import { type ISelectTickets } from "@/server/db/schema";
import { VendorTicketTable } from "./components/ticket-table";

const page = () => {
  // FIXME: vendorId should be automatic
  const { data, isLoading, error } = api.kanban.getVendorTickets.useQuery({
    vendorId: "user_2n91lbw4AmlNINARAwTKyicQvyt",
  });

  if (isLoading) {
    return (
      <div className="mx-4">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-4">
      <Filterbar
        tickets={data ?? []}
        customerSelect={<></>}
        disableActionButton={true}
      />
      <VendorTicketTable tickets={data ?? []} />
      {/* <TicketTable tickets={data ?? []} /> */}
    </div>
  );
};

export default page;

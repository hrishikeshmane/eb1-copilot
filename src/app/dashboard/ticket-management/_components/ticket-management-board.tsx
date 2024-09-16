"use client";

import { CustomKanban } from "@/components/elements/custom-kanban";
import React, { useState } from "react";
import CustomerSelect from "./customer-select";
import { type User } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/trpc/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ArrowUpRight, ArrowUpRightIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

type TicketManagementBoard = {
  initalCustomerData: User[];
};

// flag to move back to select customer
const DYNAMIC_CUSTOMER_ROUTE_FLAG = true;

const TicketManagementBoard = () => {
  const customersQuery = api.userManagement.getAllOnBoardedUsers.useQuery();
  const [selectedCustomer, setSelectedCustomer] = React.useState<
    User | undefined
  >(undefined);
  const [openSearchFilter, setOpenSearchFilter] = React.useState(false);

  const customers = customersQuery.data ?? [];

  if (DYNAMIC_CUSTOMER_ROUTE_FLAG) {
    return (
      <div className="h-full overflow-y-hidden">
        <CustomerList customers={customers} />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-hidden">
      {!selectedCustomer && (
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">
            Select customer to manage Tickets
          </h2>
          <div>
            <Popover open={openSearchFilter} onOpenChange={setOpenSearchFilter}>
              <PopoverTrigger asChild>
                <Button className="mr-2 w-72 gap-2" variant="outline">
                  {customersQuery.status === "pending" && (
                    <>
                      <span>Loading</span>
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </>
                  )}
                  {customersQuery.status === "error" && (
                    <>
                      <span>Error while fetching Customer Data</span>
                    </>
                  )}
                  {customersQuery.status === "success" && (
                    <>
                      <span>Select Customer</span>
                      <ChevronDownIcon />
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="h-full max-h-full p-0"
                side="bottom"
                align="start"
              >
                <Command
                  filter={(value, search) => {
                    if (search && value) {
                      const cust = customers.find((v) => v.id === value);
                      if (!cust) return 0;
                      if (
                        (cust.firstName ?? "")
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        (cust.lastName ?? "")
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return 1;
                      }
                    }

                    return 0;
                  }}
                >
                  <CommandInput placeholder="Select Customer..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup>
                      {customers?.map((customer: User) => (
                        <CommandItem
                          key={customer.id}
                          value={customer.id}
                          className="flex items-center gap-2"
                          onSelect={(value) => {
                            setSelectedCustomer(
                              customers.find((c) => c.id === value),
                            );
                            setOpenSearchFilter(false);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={customer.imageUrl} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span>{`${customer.firstName} ${customer.lastName}`}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
      {!!selectedCustomer && (
        // TODO: userid in router so that it becomes easy to share the link
        <CustomKanban
          customer={selectedCustomer}
          isInteractable={true}
          isAdmin={true}
        >
          <CustomerSelect
            customers={customers}
            customer={selectedCustomer}
            setCustomer={setSelectedCustomer}
          />
        </CustomKanban>
      )}
    </div>
  );
};

function CustomerList({ customers }: { customers: User[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer!.firstName!.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer!.lastName!.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.emailAddresses
        ?.at(0)
        ?.emailAddress.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto mr-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-[22.5rem]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)] rounded-md ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCustomers.map((customer) => (
            <Link
              href={`/dashboard/ticket-management/${customer.id}`}
              key={customer.id}
            >
              <Card className="group relative transition-colors hover:bg-muted/50">
                <ArrowUpRightIcon className="absolute right-3 top-3 h-4 w-4 transform text-muted-foreground transition-transform duration-200 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1" />
                <CardContent className="flex items-center p-4">
                  <Avatar className="mr-4 h-12 w-12">
                    <AvatarImage
                      src={customer.imageUrl}
                      alt={customer?.firstName ?? ""}
                    />
                    <AvatarFallback>
                      {customer?.firstName?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">
                      {customer?.firstName} {customer?.lastName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {customer?.emailAddresses?.at(0)?.emailAddress}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default TicketManagementBoard;

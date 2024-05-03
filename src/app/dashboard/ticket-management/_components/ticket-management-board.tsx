"use client";

import { CustomKanban } from "@/components/elements/custom-kanban";
import React from "react";
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
import { Loader2 } from "lucide-react";

type TicketManagementBoard = {
  initalCustomerData: User[];
};

const TicketManagementBoard = () => {
  const customersQuery = api.userManagement.getAllCustomers.useQuery();
  const [selectedCustomer, setSelectedCustomer] = React.useState<
    User | undefined
  >(undefined);
  const [openSearchFilter, setOpenSearchFilter] = React.useState(false);

  const customers = customersQuery.data ?? [];

  return (
    <div className="h-full">
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
        <CustomKanban customer={selectedCustomer}>
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

export default TicketManagementBoard;

"use client";

import React from "react";
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
import { type User } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CustomerSelectProps = {
  customers: User[];
  customer: User;
  setCustomer: (customer: User) => void;
};
const CustomerSelect = ({
  customers,
  customer,
  setCustomer,
}: CustomerSelectProps) => {
  const [openVisaFilter, setOpenVisaFilter] = React.useState(false);
  return (
    <div>
      <Popover open={openVisaFilter} onOpenChange={setOpenVisaFilter}>
        <PopoverTrigger asChild>
          <Button className="-ml-2 mr-2 gap-1" size={"sm"} variant="outline">
            <div className="flex w-full flex-wrap gap-1">
              {!customer && (
                <div className="flex gap-1 rounded-sm px-2 py-1 text-foreground">
                  Select Customer
                </div>
              )}
              {!!customer && (
                <div
                  key={customer.id}
                  className="flex items-center gap-2 font-sans text-sm font-normal"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={customer.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{`${customer.firstName} ${customer.lastName}`}</span>
                </div>
              )}
            </div>
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
                const vendor = customers.find((v) => v.id === value);
                if (!vendor) return 0;
                if (
                  (vendor.firstName ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  (vendor.lastName ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return 1;
                }
              }

              return 0;
            }}
          >
            <CommandInput placeholder="Select Vendor..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                {customers?.map((vendor) => (
                  <CommandItem
                    key={vendor.id}
                    value={vendor.id}
                    className="flex items-center gap-2"
                    onSelect={(value) => {
                      setCustomer(customers.find((v) => v.id === value)!);
                      setOpenVisaFilter(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={vendor.imageUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span>{`${vendor.firstName} ${vendor.lastName}`}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomerSelect;

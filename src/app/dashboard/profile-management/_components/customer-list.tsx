"use client";

import React, { useMemo, useState } from "react";
import { type User } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";

type GroupedUsers = {
  Today: User[];
  Yesterday: User[];
  "This Week": User[];
  "This Month": User[];
  Rest: User[];
};

function getFullName(firstName: string | null, lastName: string | null) {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else if (lastName) {
    return lastName;
  }
}

export function CustomerList({
  customers,
  subroute,
}: {
  customers: User[];
  subroute: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // const filteredCustomers = customers.filter(
  //   (customer) =>
  //     customer!.firstName!.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     customer!.lastName!.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     customer?.emailAddresses
  //       ?.at(0)
  //       ?.emailAddress.toLowerCase()
  //       .includes(searchTerm.toLowerCase()),
  // );
  const groupAndSortUsers = (users: User[]): GroupedUsers => {
    const grouped: GroupedUsers = {
      Today: [],
      Yesterday: [],
      "This Week": [],
      "This Month": [],
      Rest: [],
    };

    users.forEach((user) => {
      if (isToday(user.updatedAt)) {
        grouped.Today.push(user);
      } else if (isYesterday(user.updatedAt)) {
        grouped.Yesterday.push(user);
      } else if (isThisWeek(user.updatedAt)) {
        grouped["This Week"].push(user);
      } else if (isThisMonth(user.updatedAt)) {
        grouped["This Month"].push(user);
      } else {
        grouped.Rest.push(user);
      }
    });

    // Sort each group by updatedAt in descending order
    Object.keys(grouped).forEach((key) => {
      grouped[key as keyof GroupedUsers].sort(
        (a, b) => b.updatedAt - a.updatedAt,
      );
    });

    return grouped;
  };

  const filteredAndGroupedCustomers = useMemo(() => {
    const filteredCustomers = customers.filter(
      (customer) =>
        getFullName(customer.firstName, customer.lastName)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
        customer.username?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        customer.emailAddresses[0]?.emailAddress
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );
    return groupAndSortUsers(filteredCustomers);
  }, [customers, searchTerm]);

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
      <ScrollArea className="flex-grow rounded-md">
        {(
          Object.keys(filteredAndGroupedCustomers) as Array<keyof GroupedUsers>
        ).map(
          (group) =>
            filteredAndGroupedCustomers[group].length > 0 && (
              <div key={group} className="mb-8">
                <h2 className="mb-4 border-b font-bold">{group}</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredAndGroupedCustomers[group].map((c) => (
                    <CustomerCard key={c.id} customer={c} subroute={subroute} />
                  ))}
                </div>
              </div>
            ),
        )}
      </ScrollArea>
    </div>
  );
}

const CustomerCard = ({
  customer,
  subroute,
}: {
  customer: User;
  subroute: string;
}) => (
  <Link href={`/dashboard/${subroute}/${customer.id}`} key={customer.id}>
    <Card className="group relative transition-colors hover:bg-muted/50">
      <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 transform text-muted-foreground transition-transform duration-200 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1" />
      <CardContent className="flex items-center p-4">
        <Avatar className="mr-4 h-12 w-12">
          <AvatarImage
            src={customer.imageUrl}
            alt={`${customer.firstName} ${customer.lastName}`}
          />
          <AvatarFallback>
            {customer.firstName?.charAt(0)}
            {customer.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold">
            {customer.firstName} {customer.lastName}
          </h2>
          <p className="truncate text-sm text-muted-foreground">
            {customer.emailAddresses[0]?.emailAddress}
          </p>
          {/* <p className="text-xs text-muted-foreground">
              Updated: {format(customer.updatedAt, 'MMM d, yyyy HH:mm')}
            </p> */}
        </div>
      </CardContent>
    </Card>
  </Link>
);

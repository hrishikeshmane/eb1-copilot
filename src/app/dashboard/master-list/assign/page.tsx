"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { type User } from "@clerk/nextjs/server";
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
import { CheckIcon, Loader2, Plus, Save } from "lucide-react";
import AvatarCircles from "@/components/magicui/avatar-circles";
import { cn } from "@/lib/utils";
import { VISA_PILLARS_EX, visaPillars } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ISelectTickets } from "@/server/db/schema";
import { toast } from "sonner";

const AssignPage = () => {
  const [tickets, setTickets] = React.useState<ISelectTickets[]>([]);
  const customersQuery = api.userManagement.getAllOnBoardedUsers.useQuery();
  const [selectedCustomers, setSelectedCustomers] = React.useState<User[]>([]);
  const [openSearchFilter, setOpenSearchFilter] = React.useState(false);

  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDescription, setNewTicketDescription] = useState("");
  const [newTicketPillar, setNewTicketPillar] = useState<
    VISA_PILLARS_EX | undefined
  >();

  const openNewTicketDialog = () => {
    setIsNewTicketDialogOpen(true);
  };

  const closeNewTicketDialog = () => {
    setIsNewTicketDialogOpen(false);
    setNewTicketTitle("");
    setNewTicketDescription("");
    setNewTicketPillar(undefined);
  };

  // const createNewTicket = () => {
  //   if (!newTicketPillar) {
  //     toast.error("Please select a pillar");
  //     return;
  //   }
  //   const newTicket: ISelectTickets = {
  //     ticketId: (tickets.length + 1).toString(),
  //     title: newTicketTitle,
  //     description: newTicketDescription,
  //     customerId: "customer-id",
  //     pillars: [newTicketPillar],
  //     column: "backlog",
  //     order: tickets.length,
  //     assigneeId: "assignee-id",
  //     createdBy: "created-by",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };
  //   setTickets([...tickets, newTicket]);
  //   closeNewTicketDialog();
  // };

  const customers = customersQuery.data ?? [];

  return (
    <div className="p-4  pt-0">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
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
                        onSelect={(currentValue) => {
                          setSelectedCustomers(
                            selectedCustomers.some((c) => c.id === currentValue)
                              ? selectedCustomers.filter(
                                  (c) => c.id !== currentValue,
                                )
                              : [
                                  ...selectedCustomers,
                                  customers.find((c) => c.id === currentValue)!,
                                ],
                          );
                        }}
                      >
                        <div className="flex w-full items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={customer.imageUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span>{`${customer.firstName} ${customer.lastName}`}</span>
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedCustomers.some(
                                (c) => c.id === customer.id,
                              )
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {selectedCustomers.length > 0 && (
            <AvatarCircles
              avatarUrls={selectedCustomers.map((c) => c.imageUrl)}
            />
          )}
        </div>
        <div className="flex gap-2">
          <Button variant={"outline"} onClick={openNewTicketDialog}>
            <Plus className="mr-2 h-4 w-4" /> Create Tickets
          </Button>
          <Button
            disabled={tickets.length === 0 || selectedCustomers.length === 0}
          >
            <Save className="mr-2 h-4 w-4" />
            Publish Tickets
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="flex min-w-max space-x-4">
          {visaPillars.map((column) => (
            <div key={column.value} className="w-[20rem] flex-shrink-0">
              <h2 className="mb-2 rounded-t-sm bg-gray-200 bg-secondary p-2 text-sm font-semibold">
                {column.label}
              </h2>
              <ScrollArea className="h-[calc(100vh-170px)]">
                <div className="space-y-3">
                  {tickets
                    .filter((ticket) => ticket.pillars.includes(column.value))
                    .map((ticket) => (
                      <Card
                        key={ticket.ticketId}
                        className="w-[20rem] rounded-sm p-4 text-sm "
                      >
                        <div className="flex items-center justify-between space-x-2">
                          <div className="flex items-center space-x-2">
                            <span className="max-w-[150px] truncate font-medium">
                              {ticket.title}
                            </span>
                          </div>
                          {/* <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0"
                            onClick={() => openEditDialog(ticket)}
                          >
                            <PenSquare className="h-3 w-3" />
                          </Button> */}
                        </div>
                        <p className="mt-1 text-gray-500">
                          {ticket.description}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Assignee: {ticket.assigneeId}
                        </p>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>

      {/* <Dialog open={isNewTicketDialogOpen} onOpenChange={closeNewTicketDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTitle" className="text-right">
                Title
              </Label>
              <Input
                id="newTitle"
                value={newTicketTitle}
                onChange={(e) => setNewTicketTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newDescription" className="text-right">
                Description
              </Label>
              <Input
                id="newDescription"
                value={newTicketDescription}
                onChange={(e) => setNewTicketDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPillar" className="text-right">
                Pillar
              </Label>
              <select
                id="newPillar"
                value={newTicketPillar}
                onChange={(e) =>
                  setNewTicketPillar(e.target.value as VISA_PILLARS_EX)
                }
                className="col-span-3"
              >
                <option value="">Select a pillar</option>
                {visaPillars.map((column) => (
                  <option key={column.value} value={column.value}>
                    {column.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={createNewTicket}>
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default AssignPage;

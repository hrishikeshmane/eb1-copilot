"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CaretSortIcon,
  CheckIcon,
  DotsHorizontalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { PenSquare, Plus, Check, TicketPlus, Import } from "lucide-react";
import { cn } from "@/lib/utils";
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
import {
  IPillars,
  VISA_PILLARS,
  VISA_PILLARS_EX,
  VISA_PILLARS_EX_Converter_to_IPillars,
  visaPillars,
} from "@/lib/constants";
import Link from "next/link";
import PillarButton from "../../builder/_components/pillar-button";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { ISelectMasterTicket, ISelectTickets } from "@/server/db/schema";
import { usePathname, useRouter } from "next/navigation";

export default function TestComponent({
  masterListId,
}: {
  masterListId: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isCustomer = pathname.includes("/builder");

  const utils = api.useUtils();
  const { data, isLoading, isError } =
    api.masterList.getAllTicketsByMasterListId.useQuery({ masterListId });
  const importTicketsToProfileBuilderMutation =
    api.masterList.importTicketsToProfileBuilder.useMutation({
      onSuccess: () => {
        toast.success("Tickets imported successfully");
        utils.kanban.getAllUsersTickets.invalidate();
      },
    });

  const [editingTicket, setEditingTicket] = useState<ISelectTickets | null>(
    null,
  );
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDescription, setNewTicketDescription] = useState("");
  const [newTicketPillars, setNewTicketPillars] = useState<IPillars[]>([]);

  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleImportTicket = () => {
    if (selectedTickets.length < 1) {
      toast.error("Please select at least one ticket");
    }
    importTicketsToProfileBuilderMutation.mutate({
      ticketIds: selectedTickets,
    });
    router.push("/dashboard/builder");
  };

  const closeEditDialog = () => {
    setEditingTicket(null);
  };

  const saveEditedTicket = () => {
    if (editingTicket) {
      // setTickets(
      //   tickets.map((ticket) =>
      //     ticket.ticketId === editingTicket.ticketId
      //       ? { ...ticket, title: editedTitle, description: editedDescription }
      //       : ticket,
      //   ),
      // );
    }
    closeEditDialog();
  };

  const closeNewTicketDialog = () => {
    setIsNewTicketDialogOpen(false);
    setNewTicketTitle("");
    setNewTicketDescription("");
    setNewTicketPillars([]);
  };

  const createNewTicket = () => {
    if (!newTicketPillars.length) {
      toast.error("Please select at least one pillar");
      return;
    }
    // const newTicket: ISelectTickets = {
    //   ticketId: (tickets.length + 1).toString(),
    //   title: newTicketTitle,
    //   description: newTicketDescription,
    //   customerId: "customer-id",
    //   pillars: newTicketPillars.map((p) => p.value),
    //   column: "backlog",
    //   order: tickets.length,
    //   assigneeId: "assignee-id",
    //   createdBy: "created-by",
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // };
    // setTickets([...tickets, newTicket]);
    closeNewTicketDialog();
  };

  const assignTicketsToUsers = () => {
    if (selectedTickets.length > 0 && selectedUsers.length > 0) {
      // setTickets(
      //   tickets.map((ticket) =>
      //     selectedTickets.includes(ticket.ticketId)
      //       ? { ...ticket, assigneeId: selectedUsers.join(",") }
      //       : ticket,
      //   ),
      // );
      setSelectedTickets([]);
      setSelectedUsers([]);
    }
  };

  const toggleTicketSelection = (ticketId: string) => {
    setSelectedTickets((prevSelected) =>
      prevSelected.includes(ticketId)
        ? prevSelected.filter((id) => id !== ticketId)
        : [...prevSelected, ticketId],
    );
  };

  return (
    <div className="p-4 pl-0 pt-0">
      <div className="mb-4 flex justify-between">
        <div></div>
        {selectedTickets.length > 0 && !isCustomer && (
          <div className="">
            <Button onClick={assignTicketsToUsers} variant={"secondary"}>
              <Check className="mr-2 h-4 w-4" /> Assign {selectedTickets.length}{" "}
              ticket(s) to {selectedUsers.length} user(s)
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          {isCustomer ? (
            <>
              <Button
                className="flex gap-2"
                disabled={selectedTickets.length < 1}
                onClick={handleImportTicket}
              >
                <Import className="h-4 w-4" />
                Import {selectedTickets.length} ticket(s) to My Profile builder
              </Button>
            </>
          ) : (
            <>
              {/* <Link href="/dashboard/master-list/assign">
                <Button variant={"outline"}>
                  <TicketPlus className="mr-2 h-4 w-4" /> Mass create and assign
                </Button>
              </Link> */}
              <NewTicketButtonMasterBoard masterListId={masterListId} />
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-max space-x-4">
          {visaPillars.map((column) => (
            <div key={column.value} className="w-[20rem] flex-shrink-0">
              <h2 className="mb-2 rounded-t-sm bg-gray-200 bg-secondary p-2 text-sm font-semibold">
                {column.label}
              </h2>
              <ScrollArea className="h-[calc(100vh-170px)]">
                <div className="space-y-3">
                  {data
                    ?.filter((ticket) => ticket.pillars.includes(column.value))
                    .map((ticket) => (
                      <Card
                        key={ticket.ticketId}
                        className=" w-[20rem] rounded-sm p-4 text-sm "
                      >
                        <div className="flex items-center justify-between space-x-2">
                          <div className="flex items-center space-x-2">
                            <span className="max-w-[150px] truncate font-medium">
                              {ticket.title}
                            </span>
                          </div>
                          {isCustomer ? (
                            <Checkbox
                              checked={selectedTickets.includes(
                                ticket.ticketId,
                              )}
                              onCheckedChange={() =>
                                toggleTicketSelection(ticket.ticketId)
                              }
                              className="h-4 w-4"
                            />
                          ) : (
                            <EditTicketPopover ticket={ticket} />
                          )}
                        </div>
                        <p className="mt-1 text-gray-500">
                          {ticket.description}
                        </p>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={editingTicket !== null} onOpenChange={closeEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Ticket</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={saveEditedTicket}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewTicketDialogOpen} onOpenChange={closeNewTicketDialog}>
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
              <div className="col-span-3 flex w-full ">
                <PillarButton
                  disabled={false}
                  selectedPillars={newTicketPillars}
                  setSelectedPillars={setNewTicketPillars}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={createNewTicket}>
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type EditOpts = {
  value: string;
  label: string;
};

const statuses: EditOpts[] = [
  {
    value: "edit-ticket",
    label: "Edit Ticket",
  },
  {
    value: "delete-ticket",
    label: "Delete Ticket",
  },
];

export function EditTicketPopover({ ticket }: { ticket: ISelectMasterTicket }) {
  const [open, setOpen] = React.useState(false);
  const [openEditSheet, setOpenEditSheet] = React.useState(false);
  const [ticketTitle, setTicketTitle] = useState(ticket.title);
  const [ticketDescription, setTicketDescription] = useState(
    ticket.description,
  );
  const [ticketPillars, setTicketPillars] = useState<IPillars[]>(
    VISA_PILLARS_EX_Converter_to_IPillars(ticket.pillars),
  );

  const sheetOpenHandler = () => {
    setOpenEditSheet((prevState) => !prevState);
  };

  const saveTicketHanlder = () => {
    // TODO: save ticket
    setOpenEditSheet(false);
  };

  const utils = api.useUtils();
  const deleteTicketMutation = api.masterList.deleteTicket.useMutation({
    onSuccess: async () => {
      toast.success("Ticket deleted successfully");
      await utils.masterList.getAllTicketsByMasterListId.invalidate();
    },
  });

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size={"icon"} className="m-0 h-8 p-0">
            <DotsHorizontalIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" side="right" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      if (status.value === "delete-ticket") {
                        deleteTicketMutation.mutate({
                          ticketId: ticket.ticketId,
                        });
                      }
                      if (status.value === "edit-ticket") {
                        setOpenEditSheet(true);
                      }
                      setOpen(false);
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Sheet open={openEditSheet} onOpenChange={sheetOpenHandler}>
        <SheetContent className="flex h-full flex-col sm:w-[750px] sm:max-w-[750px]">
          <SheetHeader>
            <>
              <SheetTitle>
                <input
                  className="inline-block w-full border-none bg-transparent p-0 outline-none ring-0"
                  placeholder="New Ticket Title"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                ></input>
              </SheetTitle>
              <SheetDescription className="flex flex-col gap-2 space-y-1 border-b pb-2">
                <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                  <p className="">Visa Pillars:</p>
                  <PillarButton
                    disabled={false}
                    selectedPillars={ticketPillars}
                    setSelectedPillars={setTicketPillars}
                  />
                </div>

                <Textarea
                  className="border-y-1 inline-block w-full rounded-none border-x-0 bg-transparent p-0 py-1 text-primary-foreground shadow-none outline-none focus-visible:ring-0"
                  value={ticketDescription ?? ""}
                  placeholder="Ticket Description..."
                  onChange={(e) => {
                    setTicketDescription(e.target.value);
                  }}
                />
              </SheetDescription>
            </>
          </SheetHeader>
          <SheetFooter>
            <div className="mt-auto flex gap-2">
              <SheetClose asChild>
                <Button size="sm" variant="outline">
                  Discard
                </Button>
              </SheetClose>
              <Button size="sm" onClick={saveTicketHanlder}>
                Save Ticket
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

type NewTicketButtonMasterBoardProps = {
  masterListId: string;
  ticketTitleIn?: string;
  ticketPillarsIn?: IPillars[];
  ticketDescriptionIn?: string;
};

const NewTicketButtonMasterBoard = ({
  masterListId,
  ticketTitleIn = "",
  ticketPillarsIn = [],
  ticketDescriptionIn = "",
}: NewTicketButtonMasterBoardProps) => {
  const [ticketTitle, setTicketTitle] = useState(ticketTitleIn);
  const [ticketPillars, setTicketPillars] =
    useState<IPillars[]>(ticketPillarsIn);
  const [ticketDescription, setTicketDescription] =
    useState(ticketDescriptionIn);

  const [openSheet, setOpenSheet] = React.useState(false);
  const resetTicketStates = () => {
    setTicketTitle("");
    setTicketPillars([]);
    setTicketDescription("");
  };

  const sheetOpenHandler = () => {
    resetTicketStates();
    setOpenSheet((prevState) => !prevState);
  };

  const utils = api.useUtils();
  const addTicketMutation = api.masterList.addTicketToMasterList.useMutation({
    onSuccess: async () => {
      toast.success("New Ticket Added");
      await utils.masterList.invalidate();
    },
  });

  const addTicketHanlder = () => {
    if (!ticketTitle) {
      toast.error("Title is required");
      return;
    }
    if (ticketPillars.length === 0) {
      toast.error("Select atleast one pillar");
      return;
    }

    addTicketMutation.mutate({
      masterListId: masterListId,
      title: ticketTitle,
      pillars: ticketPillars.map((pillar) => pillar.value),
      description: ticketDescription,
    });
    resetTicketStates();
    setOpenSheet(false);
  };

  return (
    <Sheet open={openSheet} onOpenChange={sheetOpenHandler}>
      <SheetTrigger asChild>
        <Button className="gap-1">
          <PlusIcon /> New Ticket
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col sm:w-[750px] sm:max-w-[750px]">
        <SheetHeader>
          <>
            <SheetTitle>
              <input
                className="inline-block w-full border-none bg-transparent p-0 outline-none ring-0"
                placeholder="New Ticket Title"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
              ></input>
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-2 space-y-1 border-b pb-2">
              <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                <p className="">Visa Pillars:</p>
                <PillarButton
                  disabled={false}
                  selectedPillars={ticketPillars}
                  setSelectedPillars={setTicketPillars}
                />
              </div>

              <Textarea
                className="border-y-1 inline-block w-full rounded-none border-x-0 bg-transparent p-0 py-1 text-primary-foreground shadow-none outline-none focus-visible:ring-0"
                value={ticketDescription ?? ""}
                placeholder="Ticket Description..."
                onChange={(e) => {
                  setTicketDescription(e.target.value);
                }}
              />
            </SheetDescription>
          </>
        </SheetHeader>
        <SheetFooter>
          <div className="mt-auto flex gap-2">
            <SheetClose asChild>
              <Button size="sm" variant="outline">
                Discard
              </Button>
            </SheetClose>
            <Button size="sm" onClick={addTicketHanlder}>
              Add Ticket
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

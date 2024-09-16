import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
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
import React from "react";
import StatusButton from "./status-button";
import PillarButton from "./pillar-button";
import AssigneeButton from "./assignee-button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useAtom, useAtomValue } from "jotai";
import {
  customerAtom,
  ticketTitleAtom,
  ticketStatusAtom,
  ticketPillarsAtom,
  ticketAssigneeIdAtom,
  ticketDescriptionAtom,
} from "@/app/_store/kanban-store";
import { type ISelectTickets } from "@/server/db/schema";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";

const NewTicketButton = ({ tickets }: { tickets: ISelectTickets[] }) => {
  const customer = useAtomValue(customerAtom);
  const { user } = useUser();
  const userRole = user?.publicMetadata.role;
  const isCustomer = userRole === "customer";

  const [ticketTitle, setTicketTitle] = useAtom(ticketTitleAtom);
  const [ticketStatus, setTicketStatus] = useAtom(ticketStatusAtom);
  const [ticketPillars, setTicketPillars] = useAtom(ticketPillarsAtom);
  const [ticketAssigneeId, setTicketAssigneeId] = useAtom(ticketAssigneeIdAtom);
  const [ticketDescription, setTicketDescription] = useAtom(
    ticketDescriptionAtom,
  );

  const resetTicketStates = () => {
    setTicketTitle("");
    setTicketStatus("backlog");
    setTicketPillars([]);
    setTicketAssigneeId(null);
    setTicketDescription(null);
  };

  const [openSheet, setOpenSheet] = React.useState(false);
  const sheetOpenHandler = () => {
    resetTicketStates();
    setOpenSheet((prevState) => !prevState);
  };

  if (!customer) {
    return <div> Customer User not found</div>;
  }
  const utils = api.useUtils();
  const addTicketMutation = api.kanban.addTicket.useMutation({
    onSuccess: async () => {
      toast.success("New Ticket Added");
      await utils.kanban.getTicketsByUserId.refetch();
      utils.kanban.getAllUsersTickets.invalidate();
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
    if (!ticketAssigneeId && !isCustomer) {
      toast.error("Select an assignee");
      return;
    }

    const ticketLenghtByColumn = tickets.filter(
      (t) => t.column === ticketStatus,
    ).length;

    addTicketMutation.mutate({
      title: ticketTitle,
      customerId: customer.id,
      pillars: ticketPillars.map((pillar) => pillar.value),
      column: ticketStatus,
      order: ticketLenghtByColumn,
      assigneeId: isCustomer ? customer.id : ticketAssigneeId!,
      description: ticketDescription ?? undefined,
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
                <p className="">Status:</p>
                <StatusButton
                  disabled={false}
                  status={ticketStatus}
                  setStatus={setTicketStatus}
                />
              </div>

              <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                <p className="">Visa Pillars:</p>
                <PillarButton
                  disabled={false}
                  selectedPillars={ticketPillars}
                  setSelectedPillars={setTicketPillars}
                />
              </div>

              {!isCustomer && (
                <div className="grid grid-cols-[78px_1fr] items-center gap-3">
                  <p className="">Assign:</p>
                  <AssigneeButton
                    disabled={false}
                    assigneeId={ticketAssigneeId}
                    setAssigneeId={setTicketAssigneeId}
                  />
                </div>
              )}

              <Textarea
                className="border-y-1 inline-block max-h-[50vh] w-full rounded-none border-x-0 bg-transparent p-0 py-1 shadow-none outline-none focus-visible:ring-0"
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
            {/* <SheetClose asChild> */}
            <Button size="sm" onClick={addTicketHanlder}>
              Add Ticket
            </Button>
            {/* </SheetClose> */}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NewTicketButton;

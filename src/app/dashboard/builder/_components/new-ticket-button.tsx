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
import { type User } from "@clerk/nextjs/server";
import { type IPillars } from "@/lib/constants";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const NewTicketButton = ({ customer }: { customer?: User }) => {
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = React.useState<
    "backlog" | "todo" | "doing" | "review" | "done"
  >("backlog");
  const [selectedPillars, setSelectedPillars] = React.useState<IPillars[]>([]);
  const [assignee, setAssignee] = React.useState<User>();

  if (!customer) {
    return <div> Customer User not found</div>;
  }
  const utils = api.useUtils();
  const addTicketMutation = api.kanban.addTicket.useMutation({
    onSuccess: async () => {
      toast.success("New Ticket Added");
      await utils.kanban.getTicketsByUserId.refetch();
    },
  });

  const resetStates = () => {
    setTitle("");
    setStatus("backlog");
    setSelectedPillars([]);
    setAssignee(undefined);
  };

  const addTicketHanlder = () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }
    if (selectedPillars.length === 0) {
      toast.error("Select atleast one pillar");
      return;
    }
    if (!assignee) {
      toast.error("Select an assignee");
      return;
    }

    addTicketMutation.mutate({
      title,
      customerId: customer.id,
      pillars: selectedPillars.map((pillar) => pillar.value),
      column: status,
      order: 0, // get lenght of column
      assigneeId: assignee.id,
    });
    resetStates();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-1" size={"sm"}>
          <PlusIcon /> New Ticket
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col sm:w-[750px] sm:max-w-[750px]">
        <SheetHeader>
          <>
            <SheetTitle>
              <input
                className="inline-block w-full border-none bg-transparent p-0 outline-none ring-0"
                value={title}
                placeholder="New Ticket Title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-2 space-y-1 border-b pb-2">
              <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                <p className="">Status:</p>
                <StatusButton status={status} setStatus={setStatus} />
              </div>

              <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                <p className="">Visa Pillars:</p>
                <PillarButton
                  selectedPillars={selectedPillars}
                  setSelectedPillars={setSelectedPillars}
                />
              </div>

              <div className="grid grid-cols-[78px_1fr] items-center gap-3">
                <p className="">Assign:</p>
                <AssigneeButton assignee={assignee} setAssignee={setAssignee} />
              </div>
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
            <SheetClose asChild>
              <Button size="sm" onClick={addTicketHanlder}>
                Add Ticket
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NewTicketButton;

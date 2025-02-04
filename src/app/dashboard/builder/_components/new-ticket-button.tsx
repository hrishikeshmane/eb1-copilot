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
import React, { useState } from "react";
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
  ticketDueDateAtom,
} from "@/app/_store/kanban-store";
import { ISelectComment, type ISelectTickets } from "@/server/db/schema";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { TicektDatePicker } from "./ticket-date-picker-button";
import { Input } from "@/components/ui/input";
import { Send, SendHorizonal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [ticketDueDate, setTicketDueDate] = useAtom(ticketDueDateAtom);

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
      await utils.kanban.getAllUsersTickets.invalidate();
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
      dueDate: ticketDueDate,
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
                  isInteractable={true}
                  disabled={false}
                  selectedPillars={ticketPillars}
                  setSelectedPillars={setTicketPillars}
                />
              </div>

              {!isCustomer && (
                <div className="grid grid-cols-[78px_1fr] items-center gap-3">
                  <p className="">Assign:</p>
                  <AssigneeButton
                    isInteractable={true}
                    disabled={false}
                    assigneeId={ticketAssigneeId}
                    setAssigneeId={setTicketAssigneeId}
                  />
                </div>
              )}

              <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                <p className="">Due Date:</p>
                <TicektDatePicker
                  isInteractable={true}
                  ticketDueDate={ticketDueDate}
                  setTicketDueDate={setTicketDueDate}
                />
              </div>

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
        {/* <CommentSection /> */}

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

export const CommentSection = ({ ticketId }: { ticketId: string }) => {
  const [comment, setComment] = useState("");

  const commentsData = api.comment.getCommentsForTicket.useQuery({
    ticketId: ticketId,
  });

  const utils = api.useUtils();
  const addCommentMutation = api.comment.addCommentToTicket.useMutation({
    onSuccess: async () => {
      setComment("");
      await utils.comment.getCommentsForTicket.invalidate();
    },
    onError: () => {
      toast.error("Failed to add comment");
    },
  });

  const addCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCommentMutation.mutate({
      ticketId: ticketId,
      content: comment,
    });
  };

  return (
    <div>
      <form className="flex w-full gap-2" onSubmit={addCommentHandler}>
        <Input
          placeholder="Add Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" size={"icon"}>
          <SendHorizonal className="size-4" />
        </Button>
      </form>
      <div className="mt-2 flex flex-col gap-2 overflow-y-auto">
        {commentsData.data?.map((comment) => (
          <Comment
            key={comment.createdAt.toLocaleString()}
            author={comment.userId}
            content={comment.content}
            timestamp={comment.createdAt.toLocaleString()}
          />
        ))}
      </div>
    </div>
  );
};

type CommentProps = { author: string; content: string; timestamp: string };

const Comment = ({ author, content, timestamp }: CommentProps) => {
  const userInfo = api.userDetails.getUnsafeUserInfo.useQuery({
    userId: author,
  });

  const firstName = userInfo.data?.firstName ?? "User FirstName";
  const lastName = userInfo.data?.lastName ?? "User LastName";
  const userFullName = `${firstName} ${lastName}`;
  const useImg = userInfo.data?.imageUrl;

  return (
    <div className="flex items-center">
      <Avatar className="scale-90">
        <AvatarImage src={useImg} alt={userFullName} />
        <AvatarFallback>
          {firstName.charAt(0) + lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="mb-1 flex w-full flex-col gap-2 px-2">
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">{userFullName}</span>
          <span className="scale-75 text-xs text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="-mt-1 text-sm">{content}</p>
      </div>
    </div>
  );
};

export default NewTicketButton;

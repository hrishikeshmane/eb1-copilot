import { useState } from "react";
import { visaPillars, type IPillars } from "@/lib/constants";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import PillarButton from "../../builder/_components/pillar-button";
import { Input } from "@/components/ui/input";
import { TicketDatePicker } from "../../builder/_components/ticket-date-picker-button";
import { toast } from "sonner";
import TagsButton from "../../builder/_components/tags-button";
import { ITag } from "@/server/db/schema";

interface CreateTicketFormProps {
  args: {
    ticket: {
      title: string;
      description?: string;
      pillars?: string[];
      dueDate?: string;
    };
  };
  addResult: (result: { success: boolean; ticketId?: string }) => void;
  status: { type: string };
}

export function CreateTicketForm(props: CreateTicketFormProps) {
  const { args, addResult, status } = props;
  console.log("args", args);
  console.log("status", status);
  console.log("addResult", addResult);

  const [pillars, setPillars] = useState<IPillars[]>(
    args.ticket.pillars
      ? visaPillars.filter((p) => args.ticket.pillars?.includes(p.value))
      : [],
  );
  const [tags, setTags] = useState<ITag[]>([]);
  const [dueDate, setDueDate] = useState<Date | undefined>(
    args.ticket.dueDate ? new Date(args.ticket.dueDate) : undefined,
  );
  const [assigneeId, setAssigneeId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>(args.ticket.title);
  const [description, setDescription] = useState<string>(
    args.ticket.description || "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: allTags } = api.tag.getAllAvailableTags.useQuery();
  const addTicket = api.kanban.addTicket.useMutation({
    onSuccess: (data) => {
      toast.success("Ticket created!");
      addResult({ success: true, ticketId: data?.ticketId });
    },
    onError: (err) => {
      toast.error("Failed to create ticket");
      setIsSubmitting(false);
    },
  });

  const canSubmit = !!(
    args.ticket.title &&
    pillars.length > 0 &&
    !isSubmitting
  );

  return (
    <div className="mx-auto max-w-lg rounded border bg-white p-4">
      <h3 className="mb-2 text-lg font-bold">Create Ticket</h3>
      <div className="mb-2">
        <label className="block font-medium">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Description</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">
          Visa Pillars <span className="text-red-500">*</span>
        </label>
        <PillarButton
          selectedPillars={pillars}
          setSelectedPillars={setPillars}
          disabled={false}
          isInteractable={true}
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Tags</label>
        <TagsButton
          selectedTags={tags}
          setSelectedTags={setTags}
          disabled={false}
          isInteractable={true}
          availableTags={allTags}
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Due Date</label>
        <TicketDatePicker
          ticketDueDate={dueDate}
          setTicketDueDate={setDueDate}
          isInteractable={true}
        />
      </div>
      <Button
        className="mt-4 w-full"
        disabled={!canSubmit}
        onClick={() => {
          setIsSubmitting(true);
          addTicket.mutate({
            title: args.ticket.title,
            description: args.ticket.description,
            customerId: "123",
            pillars: pillars.map((p) => p.value),
            column: "backlog",
            order: 0, // You may want to fetch the correct order
            dueDate: dueDate,
            assigneeId: assigneeId,
          });
        }}
      >
        Create Ticket
      </Button>
    </div>
  );
}

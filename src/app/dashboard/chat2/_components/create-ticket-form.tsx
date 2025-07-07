import { useState } from "react";
import { visaPillars, type IPillars } from "@/lib/constants";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import PillarButton from "../../builder/_components/pillar-button";
import { Input } from "@/components/ui/input";
import { TicektDatePicker } from "../../builder/_components/ticket-date-picker-button";
import { toast } from "sonner";

interface CreateTicketFormProps {
  args: {
    title: string;
    description?: string;
    pillars?: string[];
    dueDate?: string;
    assigneeId?: string;
  };
  addResult: (result: { success: boolean; ticketId?: string }) => void;
  status: { type: string };
}

export function CreateTicketForm({
  args,
  addResult,
  status,
}: CreateTicketFormProps) {
  const [pillars, setPillars] = useState<IPillars[]>(
    args.pillars
      ? visaPillars.filter((p) => args.pillars?.includes(p.value))
      : [],
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(
    args.dueDate ? new Date(args.dueDate) : undefined,
  );
  const [assigneeId, setAssigneeId] = useState<string | undefined>(
    args.assigneeId,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const canSubmit = !!(args.title && pillars.length > 0 && !isSubmitting);

  return (
    <div className="mx-auto max-w-lg rounded border bg-white p-4">
      <h3 className="mb-2 text-lg font-bold">Create Ticket</h3>
      <div className="mb-2">
        <label className="block font-medium">Title</label>
        <Input value={args.title} disabled className="w-full" />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Description</label>
        <Input value={args.description || ""} disabled className="w-full" />
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
        <label className="block font-medium">Due Date</label>
        <TicektDatePicker
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
            title: args.title,
            description: args.description,
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

export {};

export type Roles = "admin" | "moderator" | "customer" | "vendor";

export type TransformedUser = {
  firstName: string | null;
  lastName: string | null;
  emailAddresses: string;
  imageUrl: string | undefined;
  contactNumber: string | null;
  onBoarded: boolean;
  role: string;
  id: string | null;
  priorityCallSheduled?: boolean;
  phone?: string;
  linkedin?: string;
  customerPaid?: boolean;
  customerType?: string;
};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: Roles;
      onBoarded: boolean;
    };
  }

  interface ScheduledDateTime {
    start_time: string;
    end_time: string;
  }

  interface CalendlyEvent {
    uri: string;
  }

  interface CalendlyEventScheduledData {
    event: CalendlyEvent;
  }

  // custom-kanban.tsx
  type SaveTicketHandlerParameters = {
    ticketId: string;
    title: string;
    description: string | null;
    customerId: string;
    pillars: VISA_PILLARS_EX[];
    column: "backlog" | "todo" | "doing" | "review" | "done";
    order: number;
    assigneeId: string | null;
    dueDate: Date | undefined;
  };
}

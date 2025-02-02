import { atom } from "jotai";
import { type User } from "@clerk/nextjs/server";
import { visaPillars, type IPillars } from "@/lib/constants";

export type TicketStatus = "backlog" | "todo" | "doing" | "review" | "done";
export const defaultTicketStatus: TicketStatus[] = [
  "backlog",
  "todo",
  "doing",
  "review",
  "done",
];

export const customerAtom = atom<User | undefined>(undefined);
export const FilterPillarsAtom = atom<IPillars[]>(visaPillars);
export const FilterTicketStatusAtom = atom<TicketStatus[]>(defaultTicketStatus);

export const ticketTitleAtom = atom<string>("");
export const ticketStatusAtom = atom<TicketStatus>("backlog");
export const ticketPillarsAtom = atom<IPillars[]>([]);
export const ticketAssigneeIdAtom = atom<string | null>(null);
export const ticketDescriptionAtom = atom<string | null>(null);
export const ticketDueDateAtom = atom<Date | undefined>(undefined);

export type KanbanVisibileOptionsAtom = {
  showVisaPillars: boolean;
  showAssignee: boolean;
};

export const kanbanVisibileOptionsAtom = atom<KanbanVisibileOptionsAtom>({
  showVisaPillars: true,
  showAssignee: true,
});

export const isInteractableAtom = atom<boolean>(false);

export const isKanbanViewAtom = atom<boolean>(true);

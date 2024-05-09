import { atom } from "jotai";
import { type User } from "@clerk/nextjs/server";
import { visaPillars, type IPillars } from "@/lib/constants";

export const customerAtom = atom<User | undefined>(undefined);
export const FilterPillarsAtom = atom<IPillars[]>(visaPillars);

export const ticketTitleAtom = atom<string>("");
export const ticketStatusAtom = atom<
  "backlog" | "todo" | "doing" | "review" | "done"
>("backlog");
export const ticketPillarsAtom = atom<IPillars[]>([]);
export const ticketAssigneeIdAtom = atom<string | null>(null);
export const ticketDescriptionAtom = atom<string | null>(null);

export type KanbanVisibileOptionsAtom = {
  showVisaPillars: boolean;
  showAssignee: boolean;
};

export const kanbanVisibileOptionsAtom = atom<KanbanVisibileOptionsAtom>({
  showVisaPillars: true,
  showAssignee: true,
});

export const isInteractableAtom = atom<boolean>(false);

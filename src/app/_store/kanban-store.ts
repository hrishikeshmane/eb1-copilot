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

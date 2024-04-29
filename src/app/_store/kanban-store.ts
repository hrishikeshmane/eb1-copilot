/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type IPillars, visaPillars } from "@/lib/constants";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type KanbanStore = {
  selectedPillars: IPillars[];
  selectedTicket: SelectedTicket | null;

  actions: KanbanStoreActions;
};

type SelectedTicket = {
  id: string;
  title: string;
  description: string;
  customerId: string;
  pillars: IPillars[];
  column: string;
  order: number;
  assigneeId: string;
  createdBy: string;
};

type KanbanStoreActions = {
  setSelectedPillars: (pillars: IPillars[]) => void;
};

const useKanbanStore = create<KanbanStore>()(
  devtools((set, get) => ({
    selectedPillars: visaPillars,
    selectedTicket: null,

    actions: {
      setSelectedPillars: (pillars: IPillars[]) => {
        set({ selectedPillars: pillars });
      },
    },
  })),
);

export const useSelectedPillars = (): IPillars[] =>
  useKanbanStore((state) => state.selectedPillars);

export const useKanbanActions = (): KanbanStoreActions =>
  useKanbanStore((state) => state.actions);

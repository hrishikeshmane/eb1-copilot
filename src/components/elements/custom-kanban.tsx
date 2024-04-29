"use client";

import React, { use, useState, type DragEvent } from "react";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  DragHandleDots2Icon,
  MixerHorizontalIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "../ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { type IPillars, visaPillars } from "@/lib/constants";
import { getLableForPillars } from "@/lib/utils";
import { api } from "@/trpc/react";
import PillarButton from "@/app/dashboard/builder/_components/pillar-button";
import AssigneeButton from "@/app/dashboard/builder/_components/assignee-button";
import StatusButton from "@/app/dashboard/builder/_components/status-button";
import NewTicketButton from "@/app/dashboard/builder/_components/new-ticket-button";
import {
  useKanbanActions,
  useSelectedPillars,
} from "@/app/_store/kanban-store";
import { Loader2 } from "lucide-react";
import { type User } from "@clerk/nextjs/server";
import { type ISelectTickets } from "@/server/db/schema";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

type CustomKanbanProps = {
  children?: React.ReactNode;
  customer?: User;
};

export const CustomKanban = ({ children, customer }: CustomKanbanProps) => {
  let ticketQuery: ReturnType<typeof api.kanban.getAllUsersTickets.useQuery>;
  if (customer) {
    ticketQuery = api.kanban.getTicketsByUserId.useQuery({
      userId: customer.id,
    });
  } else {
    ticketQuery = api.kanban.getAllUsersTickets.useQuery();
  }

  return (
    <>
      <ScrollArea className="h-full w-[calc(100vw-30px)] md:w-[calc(100vw-261px)]">
        {ticketQuery.status === "pending" && (
          <div className="h-full w-full items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        )}
        {ticketQuery.status === "success" && (
          <div className="h-full">
            <Filterbar customerSelect={children} customer={customer} />
            <Board tickets={ticketQuery.data as ISelectTickets[]} />
            <ScrollBar orientation="vertical" />
            <ScrollBar orientation="horizontal" />
          </div>
        )}
      </ScrollArea>
    </>
  );
};

type FilterbarProps = { customerSelect?: React.ReactNode; customer?: User };

const Filterbar = ({ customerSelect, customer }: FilterbarProps) => {
  const [openVisaFilter, setOpenVisaFilter] = React.useState(false);
  const selectedPillars = useSelectedPillars();
  const kanbanActions = useKanbanActions();
  const setSelectedPillars = kanbanActions.setSelectedPillars;

  const { user } = useUser();
  const userRole = user?.publicMetadata.role;

  const pathName = usePathname();

  return (
    <div className="sticky left-1 mb-4 flex w-[calc(100vw-30px)] gap-3 border-b p-2 pt-0 text-sm md:w-[calc(100vw-290px)]">
      <div className="flex items-center gap-2">
        {customerSelect}
        <Popover open={openVisaFilter} onOpenChange={setOpenVisaFilter}>
          <PopoverTrigger asChild>
            <Button
              className="-ml-2 flex items-center gap-1 pr-1"
              size={"sm"}
              variant="outline"
            >
              <PlusIcon className="" />
              Visa Pillars
              <Separator orientation="vertical" className="ml-2" />
              <div className="flex max-w-[30rem] gap-1 overflow-x-hidden font-mono">
                {selectedPillars.length == 10 && (
                  <div className="rounded-sm bg-secondary px-2 py-1">
                    All Selected
                  </div>
                )}
                {selectedPillars.length >= 4 && selectedPillars.length < 10 && (
                  <div className="rounded-sm bg-secondary px-2 py-1">
                    {selectedPillars.length} Selected
                  </div>
                )}
                {selectedPillars.length < 4 &&
                  selectedPillars.map((vp) => (
                    <div
                      key={vp.value}
                      className="rounded-sm bg-secondary px-2 py-1"
                    >
                      {vp.label}
                    </div>
                  ))}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Select Pillars..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem onSelect={() => setSelectedPillars(visaPillars)}>
                    --Select All--
                  </CommandItem>
                  {visaPillars.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      className="flex items-center gap-2"
                      onSelect={(value) => {
                        const newPillar = visaPillars.find(
                          (pillar) => pillar.value === value,
                        );
                        if (!newPillar) return;

                        // if new pillar is already in the selectedPillars, remove it
                        if (
                          selectedPillars.some(
                            (pillar) => pillar.value === newPillar.value,
                          )
                        ) {
                          setSelectedPillars(
                            selectedPillars.filter(
                              (pillar) => pillar.value !== newPillar.value,
                            ),
                          );
                          return;
                        }

                        setSelectedPillars([...selectedPillars, newPillar]);
                      }}
                    >
                      <Checkbox
                        id={status.value}
                        checked={selectedPillars.some(
                          (pillar) => pillar.value === status.value,
                        )}
                      />
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="ml-auto flex gap-2">
        {userRole === "admin" && pathName.includes("/ticket-management") && (
          <NewTicketButton customer={customer} />
        )}
        <Popover>
          <PopoverTrigger asChild>
            <div>
              <Button size={"sm"} variant={"outline"} className="px-2">
                <MixerHorizontalIcon />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="mr-6 p-0" side="bottom" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  <CommandItem className="flex gap-1">
                    <Checkbox checked={true} />
                    Show Visa Pillars
                  </CommandItem>
                  <CommandItem className="flex gap-1">
                    <Checkbox checked={true} />
                    Show Assignee
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const Board = ({ tickets }: { tickets: ISelectTickets[] }) => {
  return (
    <div className="flex h-full gap-3">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={tickets}
        // setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-600 dark:text-yellow-200"
        cards={tickets}
        // setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-600 dark:text-blue-200"
        cards={tickets}
        // setCards={setCards}
      />
      <Column
        title="In Review"
        column="review"
        headingColor="text-violet-600 dark:text-violet-200"
        cards={tickets}
        // setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-600 dark:text-emerald-200"
        cards={tickets}
        // setCards={setCards}
      />
      {/* <BurnBarrel setCards={setCards} /> */}
    </div>
  );
};

export type ColumProps = {
  title: string;
  column: "backlog" | "todo" | "doing" | "review" | "done";
  headingColor: string;
  cards: ISelectTickets[];
  // setCards: React.Dispatch<React.SetStateAction<IKanbanCard[]>>;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  // setCards,
}: ColumProps) => {
  const [active, setActive] = useState(false);

  const utils = api.useUtils();
  const updateTicketMutation = api.kanban.addTicket.useMutation({
    onSettled: async () => {
      await utils.kanban.getAllUsersTickets.invalidate();
    },
  });

  const handleDragStart = (e: DragEvent<HTMLDivElement>, card: IKanbanCard) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights(undefined);

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element?.dataset.before ?? "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.ticketId === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.ticketId !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.ticketId === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      // setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els: HTMLDivElement[] | undefined) => {
    const indicators = els ?? getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    if (el.element) {
      el.element.style.opacity = "1";
    }
  };

  const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLDivElement[],
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  };

  const getIndicators = () => {
    // eslint-disable-next-line  @typescript-eslint/no-unnecessary-type-assertion
    return Array.from(
      document.querySelectorAll(`[data-column="${column}"]`),
    ) as HTMLDivElement[];
  };

  const handleDragLeave = () => {
    clearHighlights(undefined);
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="max-h-full w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active
            ? "bg-neutral-200/50 dark:bg-neutral-800/50"
            : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <KanbanCard
              key={c.ticketId}
              id={c.ticketId}
              {...c}
              handleDragStart={handleDragStart}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        {/* <AddCard column={column} setCards={setCards} /> */}
      </div>
    </div>
  );
};

const KanbanCard = ({
  id,
  title,
  column,
  handleDragStart,
  pillars,
}: {
  id: string;
  title: string;
  column: string;
  pillars: string[];
  handleDragStart: (
    e: DragEvent<HTMLDivElement>,
    {
      title,
      id,
      column,
      pillars,
    }: { title: string; id: string; column: string; pillars: string[] },
  ) => void;
}) => {
  // const [ticketTitle, setTicketTitle] = React.useState(title);
  // const [status, setStatus] = React.useState<
  //   "backlog" | "todo" | "doing" | "review" | "done"
  // >(column);
  // const [selectedPillars, setSelectedPillars] = React.useState<IPillars[]>([]);
  // const [assignee, setAssignee] = React.useState<User>(); // get from tickets data

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleDragStart(e as any as DragEvent<HTMLDivElement>, {
            title,
            id,
            column,
            pillars,
          })
        }
        className="relative cursor-pointer rounded border bg-card p-3 active:cursor-grabbing"
      >
        <Sheet>
          <SheetTrigger asChild>
            <div>
              <DragHandleDots2Icon className="absolute left-2 top-3.5 -ml-1 h-4 w-4" />
              <div className="flex pl-3">
                <p className="text-sm">{title}</p>
              </div>
              <div className="mt-1 flex flex-wrap gap-1 pl-3">
                {pillars.map((pillar) => (
                  <Badge
                    variant="secondary"
                    className="font-mono font-light"
                    key={pillar}
                  >
                    {getLableForPillars(pillar)}
                  </Badge>
                ))}
              </div>
            </div>
          </SheetTrigger>
          <SheetContent className="flex h-full flex-col sm:w-[750px] sm:max-w-[750px]">
            <SheetHeader>
              <>
                <SheetTitle>
                  <input
                    className="inline-block w-full border-none bg-transparent p-0 outline-none ring-0"
                    value={title}
                  ></input>
                </SheetTitle>
                <SheetDescription className="flex flex-col gap-2 space-y-1 border-b pb-2">
                  <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                    <p className="">Status:</p>
                    <StatusButton />
                  </div>

                  <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                    <p className="">Visa Pillars:</p>
                    <PillarButton />
                  </div>

                  <div className="grid grid-cols-[78px_1fr] items-center gap-3">
                    <p className="">Assign:</p>
                    <AssigneeButton />
                  </div>
                </SheetDescription>
              </>
            </SheetHeader>
            <div>
              {/* <p className="font-semibold">{title}</p> */}
              <div className="mt-1 flex flex-wrap gap-1">
                {/* {pillars.map((pillar) => (
                  <Badge
                    className="font-mono font-light"
                    variant="secondary"
                    key={pillar}
                  >
                    {pillar}
                  </Badge>
                ))} */}
              </div>
            </div>
            <SheetFooter>
              <div className="mt-auto flex gap-2">
                <Button size="sm" variant="outline">
                  Discard
                </Button>
                <Button size="sm">Save</Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </motion.div>
    </>
  );
};

const DropIndicator = ({
  beforeId,
  column,
}: {
  beforeId: string | null;
  column: string;
}) => {
  return (
    <div
      data-before={beforeId ?? "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-primary opacity-0"
    />
  );
};

const BurnBarrel = ({
  setCards,
}: {
  setCards: React.Dispatch<React.SetStateAction<IKanbanCard[]>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-500 bg-red-800/20 text-red-500"
          : "bg-card text-muted-foreground/20"
      }`}
    >
      {active ? <Trash className="animate-bounce" /> : <Trash />}
    </div>
  );
};

const AddCard = ({
  column,
  setCards,
}: {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<IKanbanCard[]>>;
}) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
      pillars: [],
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-primary bg-primary/20 p-3 text-sm placeholder-muted-foreground focus:outline-0 dark:placeholder-primary/80"
          />

          <div className="mt-1 flex items-center justify-end gap-1.5">
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={() => setAdding(false)}
              className="flex  items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Close
            </Button>
            <Button
              size={"sm"}
              type="submit"
              variant={"ghost"}
              className="gap-1.5 text-xs "
              //   className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <PlusIcon />
            </Button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>Add card</span>
          <PlusIcon />
        </motion.button>
      )}
    </>
  );
};

export type IKanbanCard = {
  title: string;
  id: string;
  column: string;
  pillars: string[];
};

const DEFAULT_CARDS: IKanbanCard[] = [
  // BACKLOG
  {
    title: "Look into render bug in dashboard",
    id: "1",
    column: "backlog",
    pillars: ["awards", "original-contributions"],
  },
  {
    title: "SOX compliance checklist",
    id: "2",
    column: "backlog",
    pillars: ["original-contributions", "authorship"],
  },
  {
    title: "[SPIKE] Migrate to Azure",
    id: "3",
    column: "backlog",
    pillars: ["awards"],
  },
  {
    title: "Document Notifications service",
    id: "4",
    column: "backlog",
    pillars: ["awards"],
  },
  // TODO ,pillars: ['awards']
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
    pillars: ["awards"],
  },
  {
    title: "Postmortem for outage",
    id: "6",
    column: "todo",
    pillars: ["awards"],
  },
  {
    title: "Sync with product on Q3 roadmap",
    id: "7",
    column: "todo",
    pillars: ["awards"],
  },
  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
    pillars: ["awards"],
  },
  {
    title: "Add logging to daily CRON",
    id: "9",
    column: "doing",
    pillars: ["awards"],
  },
  // REVIEW
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "11",
    column: "review",
    pillars: ["awards"],
  },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
    pillars: ["awards"],
  },
];

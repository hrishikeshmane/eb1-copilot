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
  SheetClose,
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
  customerAtom,
  FilterPillarsAtom,
  ticketTitleAtom,
  ticketStatusAtom,
  ticketPillarsAtom,
  ticketAssigneeIdAtom,
  kanbanVisibileOptionsAtom,
} from "@/app/_store/kanban-store";
import { Loader2 } from "lucide-react";
import { type User } from "@clerk/nextjs/server";
import { type ISelectTickets } from "@/server/db/schema";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

type CustomKanbanProps = {
  children?: React.ReactNode;
  customer?: User;
  interactable?: boolean;
};

export const CustomKanban = ({
  children,
  customer,
  interactable,
}: CustomKanbanProps) => {
  const setCustomer = useSetAtom(customerAtom);
  setCustomer(customer);

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
            <Filterbar
              customerSelect={children}
              tickets={ticketQuery.data as ISelectTickets[]}
            />
            <Board tickets={ticketQuery.data as ISelectTickets[]} />
            <ScrollBar orientation="vertical" />
            <ScrollBar orientation="horizontal" />
          </div>
        )}
      </ScrollArea>
    </>
  );
};

type FilterbarProps = {
  customerSelect?: React.ReactNode;
  tickets: ISelectTickets[];
};

const Filterbar = ({ customerSelect, tickets }: FilterbarProps) => {
  const [openVisaFilter, setOpenVisaFilter] = React.useState(false);
  const [filterPillars, setFilterPillars] = useAtom(FilterPillarsAtom);

  const { user } = useUser();
  const userRole = user?.publicMetadata.role;

  const pathName = usePathname();

  const [kanbanVisibileOptions, setKanbanVisibileOptions] = useAtom(
    kanbanVisibileOptionsAtom,
  );

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
                {filterPillars.length == 10 && (
                  <div className="rounded-sm bg-secondary px-2 py-1">
                    All Selected
                  </div>
                )}
                {filterPillars.length >= 4 && filterPillars.length < 10 && (
                  <div className="rounded-sm bg-secondary px-2 py-1">
                    {filterPillars.length} Selected
                  </div>
                )}
                {filterPillars.length < 4 &&
                  filterPillars.map((vp) => (
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
                  <CommandItem onSelect={() => setFilterPillars(visaPillars)}>
                    --Select All--
                  </CommandItem>
                  {visaPillars.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      className="flex cursor-pointer items-center gap-2"
                      onSelect={(value) => {
                        const newPillar = visaPillars.find(
                          (pillar) => pillar.value === value,
                        );
                        if (!newPillar) return;

                        // if new pillar is already in the selectedPillars, remove it
                        if (
                          filterPillars.some(
                            (pillar) => pillar.value === newPillar.value,
                          )
                        ) {
                          setFilterPillars(
                            filterPillars.filter(
                              (pillar) => pillar.value !== newPillar.value,
                            ),
                          );
                          return;
                        }

                        setFilterPillars([...filterPillars, newPillar]);
                      }}
                    >
                      <Checkbox
                        id={status.value}
                        checked={filterPillars.some(
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
          <NewTicketButton tickets={tickets} />
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
                  <CommandItem
                    className="flex cursor-pointer gap-1"
                    onSelect={() =>
                      setKanbanVisibileOptions({
                        ...kanbanVisibileOptions,
                        showVisaPillars: !kanbanVisibileOptions.showVisaPillars,
                      })
                    }
                  >
                    <Checkbox checked={kanbanVisibileOptions.showVisaPillars} />
                    Show Visa Pillars
                  </CommandItem>
                  <CommandItem
                    className="flex cursor-pointer gap-1"
                    onSelect={() =>
                      setKanbanVisibileOptions({
                        ...kanbanVisibileOptions,
                        showAssignee: !kanbanVisibileOptions.showAssignee,
                      })
                    }
                  >
                    <Checkbox checked={kanbanVisibileOptions.showAssignee} />
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
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-600 dark:text-yellow-200"
        cards={tickets}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-600 dark:text-blue-200"
        cards={tickets}
      />
      <Column
        title="In Review"
        column="review"
        headingColor="text-violet-600 dark:text-violet-200"
        cards={tickets}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-600 dark:text-emerald-200"
        cards={tickets}
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
};

const Column = ({ title, headingColor, cards, column }: ColumProps) => {
  const customer = useAtomValue(customerAtom);

  const [active, setActive] = useState(false);
  const utils = api.useUtils();
  const updateTicketMutation = api.kanban.addTicket.useMutation({
    onSettled: async () => {
      await utils.kanban.getTicketsByUserId.invalidate();
    },
  });

  const updateTicketColumnMutation = api.kanban.updateTicketColumn.useMutation({
    onMutate: async ({ ticketId, column }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.kanban.getTicketsByUserId.cancel();

      // Get the data from the queryCache
      const previousTickets = utils.kanban.getTicketsByUserId.getData();

      // Optimistically update the data with our new ticket column
      utils.kanban.getTicketsByUserId.setData(
        { userId: customer?.id ?? "" },
        (old) => {
          if (!old) return;
          return old.map((ticket) => {
            if (ticket.ticketId === ticketId) {
              return {
                ...ticket,
                column: column,
              };
            }
            return ticket;
          });
        },
      );

      // Return the previous data so we can revert if something goes wrong
      return { previousTickets };
    },
    onError(err, newData, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.kanban.getTicketsByUserId.setData(
        { userId: customer?.id ?? "" },
        ctx?.previousTickets,
      );
    },
    onSettled: async () => {
      // Sync with server once mutation has settled
      await utils.kanban.getTicketsByUserId.invalidate();
    },
  });

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    card: ISelectTickets,
  ) => {
    e.dataTransfer.setData("cardId", card.ticketId);
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

      updateTicketColumnMutation.mutate({
        ticketId: cardId,
        column: column,
      });

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
              card={c}
              handleDragStart={handleDragStart}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

const KanbanCard = ({
  card,
  handleDragStart,
}: {
  card: ISelectTickets;
  handleDragStart: (e: DragEvent<HTMLDivElement>, card: ISelectTickets) => void;
}) => {
  const [ticketTitle, setTicketTitle] = useAtom(ticketTitleAtom);
  const [ticketStatus, setTicketStatus] = useAtom(ticketStatusAtom);
  const [ticketPillars, setTicketPillars] = useAtom(ticketPillarsAtom);
  const [ticketAssigneeId, setTicketAssigneeId] = useAtom(ticketAssigneeIdAtom);

  const kanbanVisibileOptions = useAtomValue(kanbanVisibileOptionsAtom);

  const filteredCardPillars = card.pillars.map((pillar) => {
    return visaPillars.find((vp) => vp.value === pillar);
  }) as IPillars[];

  const onSheetMount = () => {
    setTicketTitle(card.title);
    setTicketStatus(card.column);
    setTicketPillars(filteredCardPillars);
    setTicketAssigneeId(card.assigneeId);
  };
  const onUnMount = () => {
    setTicketTitle("");
    setTicketStatus("backlog");
    setTicketPillars([]);
    setTicketAssigneeId(null);
  };

  const [openSheet, setOpenSheet] = React.useState(false);
  const sheetOpenHandler = () => {
    if (openSheet) {
      onUnMount();
      setOpenSheet(false);
      return;
    }
    onSheetMount();
    setOpenSheet(true);
  };

  return (
    <>
      <DropIndicator beforeId={card.ticketId} column={card.column} />
      <motion.div
        layout
        layoutId={card.ticketId}
        draggable="true"
        onDragStart={(e) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleDragStart(e as any as DragEvent<HTMLDivElement>, card)
        }
        className="relative cursor-pointer rounded border bg-card p-3 active:cursor-grabbing"
      >
        <Sheet open={openSheet} onOpenChange={sheetOpenHandler}>
          <SheetTrigger asChild>
            <div>
              <DragHandleDots2Icon className="absolute left-2 top-3.5 -ml-1 h-4 w-4" />
              <div className="flex pl-3">
                <p className="text-sm">{card.title}</p>
              </div>
              <div className="mt-1 flex flex-wrap gap-1 pl-3">
                {kanbanVisibileOptions.showVisaPillars &&
                  card.pillars.map((pillar) => (
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
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                  ></input>
                </SheetTitle>
                <SheetDescription className="flex flex-col gap-2 space-y-1 border-b pb-2">
                  <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                    <p className="">Status:</p>
                    <StatusButton
                      status={ticketStatus}
                      setStatus={setTicketStatus}
                    />
                  </div>

                  <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                    <p className="">Visa Pillars:</p>
                    <PillarButton
                      selectedPillars={ticketPillars}
                      setSelectedPillars={setTicketPillars}
                    />
                  </div>

                  <div className="grid grid-cols-[78px_1fr] items-center gap-3">
                    <p className="">Assign:</p>
                    <AssigneeButton
                      assigneeId={ticketAssigneeId}
                      setAssigneeId={setTicketAssigneeId}
                    />
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
                  <Button size="sm">Save</Button>
                </SheetClose>
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

// const BurnBarrel = ({
//   setCards,
// }: {
//   setCards: React.Dispatch<React.SetStateAction<IKanbanCard[]>>;
// }) => {
//   const [active, setActive] = useState(false);

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setActive(true);
//   };

//   const handleDragLeave = () => {
//     setActive(false);
//   };

//   const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
//     const cardId = e.dataTransfer.getData("cardId");

//     setCards((pv) => pv.filter((c) => c.id !== cardId));

//     setActive(false);
//   };

//   return (
//     <div
//       onDrop={handleDragEnd}
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
//         active
//           ? "border-red-500 bg-red-800/20 text-red-500"
//           : "bg-card text-muted-foreground/20"
//       }`}
//     >
//       {active ? <Trash className="animate-bounce" /> : <Trash />}
//     </div>
//   );
// };

// const AddCard = ({
//   column,
//   setCards,
// }: {
//   column: string;
//   setCards: React.Dispatch<React.SetStateAction<IKanbanCard[]>>;
// }) => {
//   const [text, setText] = useState("");
//   const [adding, setAdding] = useState(false);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!text.trim().length) return;

//     const newCard = {
//       column,
//       title: text.trim(),
//       id: Math.random().toString(),
//       pillars: [],
//     };

//     setCards((pv) => [...pv, newCard]);

//     setAdding(false);
//   };

//   return (
//     <>
//       {adding ? (
//         <motion.form layout onSubmit={handleSubmit}>
//           <textarea
//             onChange={(e) => setText(e.target.value)}
//             autoFocus
//             placeholder="Add new task..."
//             className="w-full rounded border border-primary bg-primary/20 p-3 text-sm placeholder-muted-foreground focus:outline-0 dark:placeholder-primary/80"
//           />

//           <div className="mt-1 flex items-center justify-end gap-1.5">
//             <Button
//               size={"sm"}
//               variant={"ghost"}
//               onClick={() => setAdding(false)}
//               className="flex  items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Close
//             </Button>
//             <Button
//               size={"sm"}
//               type="submit"
//               variant={"ghost"}
//               className="gap-1.5 text-xs "
//               //   className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
//             >
//               <span>Add</span>
//               <PlusIcon />
//             </Button>
//           </div>
//         </motion.form>
//       ) : (
//         <motion.button
//           layout
//           onClick={() => setAdding(true)}
//           className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
//         >
//           <span>Add card</span>
//           <PlusIcon />
//         </motion.button>
//       )}
//     </>
//   );
// };

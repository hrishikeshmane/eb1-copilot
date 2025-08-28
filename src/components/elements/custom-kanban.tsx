"use client";

import React, { useEffect, useState, type DragEvent } from "react";
import { motion } from "framer-motion";
import { ImportIcon, SquareKanbanIcon, Table2Icon, Trash } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  CalendarIcon,
  DragHandleDots2Icon,
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
import {
  type IPillars,
  visaPillars,
  type VISA_PILLARS_EX,
} from "@/lib/constants";
import { cn, getLableForPillars } from "@/lib/utils";
import { api } from "@/trpc/react";
import PillarButton from "@/app/dashboard/builder/_components/pillar-button";
import AssigneeButton from "@/app/dashboard/builder/_components/assignee-button";
import StatusButton from "@/app/dashboard/builder/_components/status-button";
import NewTicketButton, {
  CommentSection,
} from "@/app/dashboard/builder/_components/new-ticket-button";
import {
  customerAtom,
  FilterPillarsAtom,
  ticketTitleAtom,
  ticketStatusAtom,
  ticketPillarsAtom,
  ticketAssigneeIdAtom,
  kanbanVisibileOptionsAtom,
  isInteractableAtom,
  ticketDescriptionAtom,
  ticketDueDateAtom,
  isKanbanViewAtom,
  FilterTicketStatusAtom,
  defaultTicketStatus,
  ticketTagsAtom,
  FilterTagsAtom,
} from "@/app/_store/kanban-store";
import { Loader2 } from "lucide-react";
import { type User } from "@clerk/nextjs/server";
import { type ITag, type ISelectTickets } from "@/server/db/schema";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import { TicketDatePicker } from "@/app/dashboard/builder/_components/ticket-date-picker-button";
import { format } from "date-fns";
import Loader from "./loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TagsButton from "@/app/dashboard/builder/_components/tags-button";

type CustomKanbanProps = {
  children?: React.ReactNode;
  customer?: User;
  customerString?: string;
  isInteractable: boolean;
  isAdmin: boolean;
};

export const CustomKanban = ({
  children,
  customer,
  customerString,
  isInteractable,
  isAdmin,
}: CustomKanbanProps) => {
  const [isKanbanView, setIsKanbanView] = useAtom(isKanbanViewAtom);
  const setIsInteractable = useSetAtom(isInteractableAtom);
  setIsInteractable(isInteractable);

  // if customer is json string, convert to User
  const setCustomer = useSetAtom(customerAtom);
  if (!!customerString) {
    const userObj = JSON.parse(customerString) as User;
    setCustomer(userObj);
  } else {
    setCustomer(customer);
  }

  let ticketQuery: ReturnType<typeof api.kanban.getAllUsersTickets.useQuery>;
  if (customer) {
    ticketQuery = api.kanban.getTicketsByUserId.useQuery({
      userId: customer.id,
    });
  } else {
    ticketQuery = api.kanban.getAllUsersTickets.useQuery();
  }

  return (
    <div className="h-full overflow-y-hidden">
      <div className="h-full w-full">
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
            {isKanbanView ? (
              <Board
                tickets={ticketQuery.data as ISelectTickets[]}
                isAdmin={isAdmin}
              />
            ) : (
              <div>
                <TicketTable tickets={ticketQuery.data as ISelectTickets[]} />
              </div>
            )}
            {/* <ScrollBar orientation="vertical" /> */}
            {/* <ScrollBar orientation="horizontal" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

type FilterbarProps = {
  customerSelect?: React.ReactNode;
  tickets: ISelectTickets[];
  disableActionButton?: boolean;
};

export const Filterbar = ({
  customerSelect,
  tickets,
  disableActionButton,
}: FilterbarProps) => {
  const [openVisaFilter, setOpenVisaFilter] = React.useState(false);
  const [openTicketStatusFilter, setOpenTicketStatusFilter] =
    React.useState(false);
  const [openTagsFilter, setOpenTagsFilter] = React.useState(false);
  const [filterPillars, setFilterPillars] = useAtom(FilterPillarsAtom);
  const [filterTicketStatus, setFilterTicketStatus] = useAtom(
    FilterTicketStatusAtom,
  );
  const [filterTags, setFilterTags] = useAtom(FilterTagsAtom);
  const [isKanbanView, setIsKanbanView] = useAtom(isKanbanViewAtom);

  const { user } = useUser();
  const userRole = user?.publicMetadata.role;

  const pathName = usePathname();
  const customer = useAtomValue(customerAtom);

  const [kanbanVisibileOptions, setKanbanVisibileOptions] = useAtom(
    kanbanVisibileOptionsAtom,
  );

  const tagsQuery = api.tag.getAllAvailableTags.useQuery();
  const allTags = tagsQuery.data ?? [];

  return (
    <div className="sticky left-1 mb-4 flex w-[98%] gap-3 border-b p-2 pt-0 text-sm">
      <div className="flex items-center gap-2">
        {!disableActionButton && (
          <Button
            size={"icon"}
            variant={"outline"}
            className="mr-2 h-8 w-8"
            onClick={() => {
              setIsKanbanView(!isKanbanView);
            }}
          >
            {isKanbanView ? (
              <SquareKanbanIcon className="h-5 w-5" />
            ) : (
              <Table2Icon className="h-5 w-5" />
            )}
          </Button>
        )}
        {customerSelect}
        <div className="flex gap-4">
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

          <Popover open={openTagsFilter} onOpenChange={setOpenTagsFilter}>
            <PopoverTrigger asChild>
              <Button
                className="-ml-2 flex items-center gap-1 pr-1"
                size={"sm"}
                variant="outline"
              >
                <PlusIcon className="" />
                Tags
                <Separator orientation="vertical" className="ml-2" />
                <div className="flex max-w-[30rem] gap-1 overflow-x-hidden font-mono">
                  {filterTags.length === allTags.length &&
                    allTags.length > 0 && (
                      <div className="rounded-sm bg-secondary px-2 py-1">
                        All Selected
                      </div>
                    )}
                  {filterTags.length >= 4 &&
                    filterTags.length < allTags.length && (
                      <div className="rounded-sm bg-secondary px-2 py-1">
                        {filterTags.length} Selected
                      </div>
                    )}
                  {filterTags.length < 4 &&
                    filterTags.map((tag) => (
                      <div
                        key={tag.tagId}
                        className="rounded-sm bg-secondary px-2 py-1"
                      >
                        {tag.name}
                      </div>
                    ))}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="right" align="start">
              <Command>
                <CommandInput placeholder="Search tags..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem onSelect={() => setFilterTags(allTags)}>
                      --Select All--
                    </CommandItem>
                    {allTags.map((tag) => (
                      <CommandItem
                        key={tag.tagId}
                        value={tag.tagId}
                        className="flex cursor-pointer items-center gap-2"
                        onSelect={() => {
                          const isSelected = filterTags.some(
                            (t) => t.tagId === tag.tagId,
                          );
                          if (isSelected) {
                            setFilterTags(
                              filterTags.filter((t) => t.tagId !== tag.tagId),
                            );
                          } else {
                            setFilterTags([...filterTags, tag]);
                          }
                        }}
                      >
                        <Checkbox
                          id={tag.tagId}
                          checked={filterTags.some(
                            (t) => t.tagId === tag.tagId,
                          )}
                        />
                        {tag.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {pathName.includes("vendor") && (
            <Popover
              open={openTicketStatusFilter}
              onOpenChange={setOpenTicketStatusFilter}
            >
              <PopoverTrigger asChild>
                <Button
                  className="-ml-2 flex items-center gap-1 pr-1"
                  size={"sm"}
                  variant="outline"
                >
                  <PlusIcon className="" />
                  Ticket Status
                  <Separator orientation="vertical" className="ml-2" />
                  <div className="flex max-w-[30rem] gap-1 overflow-x-hidden font-mono">
                    {filterTicketStatus.length == 5 && (
                      <div className="rounded-sm bg-secondary px-2 py-1">
                        All Selected
                      </div>
                    )}
                    {filterTicketStatus.length >= 4 &&
                      filterTicketStatus.length < 5 && (
                        <div className="rounded-sm bg-secondary px-2 py-1">
                          {filterTicketStatus.length} Selected
                        </div>
                      )}
                    {filterTicketStatus.length < 4 &&
                      filterTicketStatus.map((vp) => (
                        <div
                          key={vp}
                          className="rounded-sm bg-secondary px-2 py-1"
                        >
                          {vp}
                        </div>
                      ))}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="right" align="start">
                <Command>
                  <CommandInput placeholder="Select Status..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() =>
                          setFilterTicketStatus(defaultTicketStatus)
                        }
                      >
                        --Select All--
                      </CommandItem>
                      {defaultTicketStatus.map((status) => (
                        <CommandItem
                          key={status}
                          value={status}
                          className="flex cursor-pointer items-center gap-2"
                          onSelect={(value) => {
                            const newStatus = defaultTicketStatus.find(
                              (pillar) => pillar === value,
                            );
                            if (!newStatus) return;

                            if (
                              filterTicketStatus.some(
                                (pillar) => pillar === newStatus,
                              )
                            ) {
                              setFilterTicketStatus(
                                filterTicketStatus.filter(
                                  (pillar) => pillar !== newStatus,
                                ),
                              );
                              return;
                            }

                            setFilterTicketStatus([
                              ...filterTicketStatus,
                              newStatus,
                            ]);
                          }}
                        >
                          <Checkbox
                            id={status}
                            checked={filterTicketStatus.some(
                              (value) => value === status,
                            )}
                          />
                          <span className="capitalize">{status}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {!disableActionButton && (
        <div className="ml-auto flex gap-2">
          {(userRole === "customer" || userRole === "admin") && (
            <Link href={`/dashboard/builder/import?customer=${customer?.id}`}>
              <Button className="flex gap-2">
                <ImportIcon className="h-4 w-4" /> Import Tickets from Master
                List
              </Button>
            </Link>
          )}
          {(userRole === "customer" || userRole === "admin") && (
            <NewTicketButton tickets={tickets} customer={customer} />
          )}
        </div>
      )}
    </div>
  );
};

const Board = ({
  tickets,
  isAdmin,
}: {
  tickets: ISelectTickets[];
  isAdmin: boolean | undefined;
}) => {
  const { user } = useUser();
  const userRole = user?.publicMetadata.role;
  const isVendor = userRole === "vendor";
  const isCustomer = userRole === "customer";

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
      {!isVendor && (
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-600 dark:text-emerald-200"
          cards={tickets}
        />
      )}
      {(!!isAdmin || !!isCustomer) && <BurnBarrel />}
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
      await utils.kanban.getAllUsersTickets.invalidate();
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

  const filterPillars = useAtomValue(FilterPillarsAtom);

  //apply filters on filterPillars
  const filteredCards = cards
    .filter((c) => c.column === column)
    .filter((c) => {
      if (filterPillars.length === 0) return true;
      return filterPillars.some((p) => c.pillars.includes(p.value));
    });

  return (
    <div className="max-h-full w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <ScrollArea
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active
            ? "bg-neutral-200/50 dark:bg-neutral-800/50"
            : "bg-neutral-800/0"
        }`}
      >
        <div>
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
        <ScrollBar orientation="vertical" />
      </ScrollArea>
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
  const kanbanVisibileOptions = useAtomValue(kanbanVisibileOptionsAtom);

  const isInteractable = useAtomValue(isInteractableAtom);

  return (
    <>
      <DropIndicator beforeId={card.ticketId} column={card.column} />
      <motion.div
        layout
        layoutId={card.ticketId}
        draggable={isInteractable ? true : false}
        onDragStart={(e) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleDragStart(e as any as DragEvent<HTMLDivElement>, card)
        }
        className={cn(
          "relative cursor-pointer rounded border bg-card p-3 active:cursor-grabbing",
          isInteractable ? "pl-6" : "",
        )}
      >
        <TicketSheet card={card}>
          <div>
            {isInteractable && (
              <DragHandleDots2Icon className="absolute left-2 top-3.5 -ml-1 h-4 w-4" />
            )}
            <div className="flex ">
              <p className="text-sm">{card.title}</p>
            </div>
            <div className="mt-1 flex flex-wrap gap-1 ">
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
            <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
              <CalendarIcon className="h-3 w-3" />
              {card.dueDate ? (
                <p>{format(card.dueDate, "PPP")}</p>
              ) : (
                <p>Not set</p>
              )}
            </div>
          </div>
        </TicketSheet>
      </motion.div>
    </>
  );
};

export const TicketSheet = ({
  card,
  children,
}: {
  card: ISelectTickets;
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const userRole = user?.publicMetadata.role;
  const isAdmin = userRole === "admin";
  const isVendor = userRole === "vendor";
  const isCustomer = userRole === "customer";

  const [ticketTitle, setTicketTitle] = useAtom(ticketTitleAtom);
  const [ticketStatus, setTicketStatus] = useAtom(ticketStatusAtom);
  const [ticketPillars, setTicketPillars] = useAtom(ticketPillarsAtom);
  const [ticketAssigneeId, setTicketAssigneeId] = useAtom(ticketAssigneeIdAtom);
  const [ticketDescription, setTicketDescription] = useAtom(
    ticketDescriptionAtom,
  );
  const [ticketDueDate, setTicketDueDate] = useAtom(ticketDueDateAtom);
  const [ticketTags, setTicketTags] = useAtom(ticketTagsAtom);
  const cardTags = (card as { ticketsToTags?: ITag[] }).ticketsToTags ?? [];

  const [openSheet, setOpenSheet] = React.useState(false);

  const filteredCardPillars = card.pillars.map((pillar) => {
    return visaPillars.find((vp) => vp.value === pillar);
  }) as IPillars[];

  const onSheetMount = () => {
    setTicketTitle(card.title);
    setTicketStatus(card.column);
    setTicketPillars(filteredCardPillars);
    setTicketAssigneeId(card.assigneeId);
    setTicketDescription(card.description);
    setTicketDueDate(card.dueDate ?? undefined);
    setTicketTags(cardTags.map((tag) => tag.tag as ITag));
  };
  const onUnMount = () => {
    setTicketTitle("");
    setTicketStatus("backlog");
    setTicketPillars([]);
    setTicketAssigneeId(null);
    setTicketDescription(null);
    setTicketDueDate(undefined);
    setTicketTags([]);
  };

  const sheetOpenHandler = () => {
    if (openSheet) {
      onUnMount();
      setOpenSheet(false);
      return;
    }
    onSheetMount();
    setOpenSheet(true);
  };

  const { data: AllTags } = api.tag.getAllAvailableTags.useQuery();

  const utils = api.useUtils();
  const updateTicketMutation = api.kanban.updateTicket.useMutation({
    onMutate: () => {
      toast.info("Updating ticket...");
    },
    onError: () => {
      toast.error("Failed to update ticket");
    },
    onSuccess: () => {
      toast.success("Ticket updated successfully");
    },
    onSettled: async () => {
      await utils.kanban.getTicketsByUserId.invalidate();
      await utils.kanban.getAllUsersTickets.invalidate();
      await utils.kanban.getVendorTickets.invalidate();
    },
  });

  const saveTicketHandler = ({
    ticketId,
    title,
    description,
    customerId,
    pillars,
    column,
    dueDate,
    order,
    assigneeId,
  }: SaveTicketHandlerParameters) => {
    const tagIds = ticketTags.map((tag) => tag.tagId);
    updateTicketMutation.mutate({
      ticketId,
      title,
      description,
      customerId,
      pillars,
      column,
      dueDate,
      // order,
      assigneeId,
      tagIds,
    });
  };

  return (
    <Sheet open={openSheet} onOpenChange={sheetOpenHandler}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex h-full flex-col sm:w-[750px] sm:max-w-[750px]">
        <SheetHeader>
          <>
            <SheetTitle>
              {isAdmin || isCustomer ? (
                <input
                  className="inline-block w-full border-none bg-transparent p-0 outline-none ring-0"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                ></input>
              ) : (
                <p>{ticketTitle}</p>
              )}
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-2 space-y-1 border-b pb-2">
              <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                <p className="">Status:</p>
                <StatusButton
                  // disabled={isCustomer}
                  disabled={false}
                  status={ticketStatus}
                  setStatus={setTicketStatus}
                />
              </div>

              <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                <p className="">Visa Pillars:</p>
                <PillarButton
                  isInteractable={!isVendor}
                  // disabled={!isAdmin}
                  disabled={false}
                  selectedPillars={ticketPillars}
                  setSelectedPillars={setTicketPillars}
                />
              </div>
              <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                <p className="">Tags:</p>
                <TagsButton
                  isInteractable={!isVendor}
                  disabled={false}
                  availableTags={AllTags ?? []}
                  selectedTags={ticketTags}
                  setSelectedTags={setTicketTags}
                />
              </div>

              {isAdmin && (
                <div className="grid grid-cols-[78px_1fr] items-center gap-3">
                  <p className="">Assign:</p>
                  <AssigneeButton
                    isInteractable={!isVendor}
                    disabled={!isAdmin}
                    assigneeId={ticketAssigneeId}
                    setAssigneeId={setTicketAssigneeId}
                  />
                </div>
              )}

              <div className="grid grid-cols-[78px_1fr] items-start gap-3">
                <p className="">Due Date:</p>
                <TicketDatePicker
                  isInteractable={!isVendor}
                  ticketDueDate={ticketDueDate}
                  setTicketDueDate={setTicketDueDate}
                />
              </div>

              {isAdmin || isCustomer ? (
                <Textarea
                  className="border-y-1 inline-block w-full rounded-none border-x-0 bg-transparent p-0 py-1 shadow-none outline-none focus-visible:ring-0"
                  value={ticketDescription ?? ""}
                  placeholder="Ticket Description..."
                  onChange={(e) => {
                    setTicketDescription(e.target.value);
                  }}
                />
              ) : (
                <p className="border-y-1 inline-block w-full rounded-none border-x-0 bg-transparent p-0 py-1  shadow-none outline-none focus-visible:ring-0">
                  {ticketDescription}
                </p>
              )}
            </SheetDescription>
          </>
        </SheetHeader>
        <ScrollArea className="h-full w-full">
          <CommentSection ticketId={card.ticketId} />
        </ScrollArea>
        <SheetFooter>
          <div className="mt-auto flex gap-2">
            <SheetClose asChild>
              <Button size="sm" variant="outline">
                Discard
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                onClick={() =>
                  saveTicketHandler({
                    ticketId: card.ticketId,
                    title: ticketTitle,
                    description: ticketDescription,
                    customerId: card.customerId,
                    pillars: ticketPillars.map((p) => p.value),
                    column: ticketStatus,
                    order: card.order,
                    assigneeId: ticketAssigneeId,
                    dueDate: ticketDueDate,
                  })
                }
                size="sm"
              >
                Save
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const TicketTable = ({ tickets }: { tickets: ISelectTickets[] }) => {
  const filterPillars = useAtomValue(FilterPillarsAtom);
  const filterTags = useAtomValue(FilterTagsAtom);

  //apply filters
  const filteredCards = tickets.filter((c) => {
    if (filterPillars.length === 0 && filterTags.length === 0) return true;
    const hasPillar =
      filterPillars.length === 0 ||
      filterPillars.some((p) => c.pillars.includes(p.value));
    const hasTag =
      filterTags.length === 0 ||
      (c.ticketsToTags &&
        c.ticketsToTags.some((tt) =>
          filterTags.some((ft) => ft.tagId === tt.tag.tagId),
        ));
    return hasPillar && hasTag;
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[150px]">Ticket ID</TableHead> */}
            <TableHead className="w-[150px]">Title</TableHead>
            <TableHead className="w-[350px]">Description</TableHead>
            <TableHead className="w-[350px]">Pillars</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[250px]">Assignee ID</TableHead>
            <TableHead> Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCards.map((ticket) => {
            const dueDate = new Date(ticket.dueDate);
            const today = new Date();
            const diffDays = Math.ceil(
              (dueDate - today) / (1000 * 60 * 60 * 24),
            );
            const dueDateStatus =
              diffDays > 0
                ? `In ${diffDays} days`
                : `${Math.abs(diffDays)} days ago`;

            return (
              <TicketSheet key={ticket.ticketId} card={ticket}>
                <TableRow
                  key={ticket.ticketId}
                  // onClick={() => handleRowClick(ticket)}
                  className="cursor-pointer"
                >
                  {/* <TableCell className="text-sm">{ticket.ticketId}</TableCell> */}
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell>
                    {ticket.description?.length > 50
                      ? `${ticket.description?.slice(0, 50)}...`
                      : ticket.description}
                  </TableCell>
                  <TableCell className="flex flex-wrap gap-2">
                    {ticket.pillars.map((pillar, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        // className="mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
                      >
                        {pillar}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="font-semibold capitalize">
                    {ticket.column}
                  </TableCell>
                  <TableCell>{ticket.assigneeId?.slice(0, 8)}...</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        `mr-2 `,
                        diffDays > 7
                          ? "bg-emerald-500 hover:bg-emerald-500/80"
                          : diffDays > 0
                            ? "bg-yellow-500 hover:bg-yellow-500/80"
                            : "bg-red-500 text-destructive-foreground hover:bg-red-500/80",
                      )}
                    >
                      {dueDateStatus}
                    </Badge>
                    {format(dueDate, "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              </TicketSheet>
            );
          })}
        </TableBody>
      </Table>
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

const BurnBarrel = () => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };
  const utils = api.useUtils();
  const deleteTicketMutation = api.kanban.deleteTicketById.useMutation({
    onMutate: () => {
      toast.info("Deleting ticket...");
    },
    onError: () => {
      toast.error("Failed to delete ticket");
    },
    onSuccess: () => {
      toast.success("Ticket deleted successfully");
    },
    onSettled: async () => {
      await utils.kanban.getTicketsByUserId.invalidate();
      await utils.kanban.getAllUsersTickets.invalidate();
    },
  });

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    deleteTicketMutation.mutate({ ticketId: cardId });

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`sticky top-5 mt-10 grid h-[80vh] w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-500 bg-red-800/20 text-red-500"
          : "bg-card text-muted-foreground/20"
      }`}
    >
      {active ? <Trash className="animate-bounce" /> : <Trash />}
    </div>
  );
};

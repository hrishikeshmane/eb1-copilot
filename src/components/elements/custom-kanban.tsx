"use client";

import React, { useState, type DragEvent } from "react";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export const CustomKanban = () => {
  return (
    <ScrollArea className="h-full w-[calc(100vw-261px)] ">
      <Board />
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const Board = () => {
  const [cards, setCards] = useState<IKanbanCard[]>(DEFAULT_CARDS);

  return (
    <div className="flex gap-3">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-600 dark:text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-600 dark:text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In Review"
        column="review"
        headingColor="text-violet-600 dark:text-violet-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-600 dark:text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

export type ColumProps = {
  title: string;
  column: string;
  headingColor: string;
  cards: IKanbanCard[];
  setCards: React.Dispatch<React.SetStateAction<IKanbanCard[]>>;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}: ColumProps) => {
  const [active, setActive] = useState(false);

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

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
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
    <div className="w-56 shrink-0">
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
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Card = ({
  title,
  id,
  column,
  handleDragStart,
}: {
  title: string;
  id: string;
  column: string;
  handleDragStart: (
    e: DragEvent<HTMLDivElement>,
    { title, id, column }: { title: string; id: string; column: string },
  ) => void;
}) => {
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
          })
        }
        className="cursor-grab rounded border bg-card p-3 active:cursor-grabbing"
      >
        <p className="text-sm">{title}</p>
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
            className="w-full rounded border border-primary bg-primary/20 p-3 text-sm placeholder-primary/80 focus:outline-0"
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
};

const DEFAULT_CARDS: IKanbanCard[] = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },
  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // REVIEW
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "11",
    column: "review",
  },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];
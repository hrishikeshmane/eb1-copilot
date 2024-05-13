import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  type ISelectTickets,
  type ISelectUserVisaPillarDetails,
} from "@/server/db/schema";
import { VISA_PILLARS_EX_LIST, visaPillars } from "@/lib/constants";
import React from "react";

type TrackerBoardProps = {
  userPillars: ISelectUserVisaPillarDetails[];
  completedTickets: ISelectTickets[];
};

const TrackerBoard = ({ userPillars, completedTickets }: TrackerBoardProps) => {
  return (
    <div className=" flex h-[calc(98vh-4rem)] w-[calc(100vw-30px)] gap-3 overflow-y-clip overflow-x-scroll text-sm md:w-[calc(100vw-261px)]">
      {VISA_PILLARS_EX_LIST.map((pillar) => {
        const pillarDetails = userPillars.filter((p) => p.pillar === pillar);
        return (
          <TrackerBoardColumn
            key={pillar}
            title={pillar}
            cards={pillarDetails}
            completedTickets={completedTickets.filter((t) =>
              t.pillars.includes(pillar),
            )}
          />
        );
      })}
    </div>
  );
};

type TrackerBoardColumnProps = {
  title: string;
  cards: ISelectUserVisaPillarDetails[];
  completedTickets: ISelectTickets[];
};

const TrackerBoardColumn = ({
  title,
  cards,
  completedTickets,
}: TrackerBoardColumnProps) => {
  return (
    <div>
      <div className="sticky top-0 mb-2 w-64 rounded-t-sm bg-secondary p-2 font-semibold">
        <p>
          {visaPillars.find((pillar) => pillar.value === title)?.label ??
            "Miscellaneous"}
        </p>
      </div>
      <ScrollArea className="h-full ">
        <div className="flex flex-col gap-2 pb-20">
          {cards.map((card) => {
            return (
              <div
                key={card.id}
                className="w-64 rounded-sm border bg-card p-2 shadow-sm"
              >
                <p className="pb-2 font-medium">{card.title}</p>
                <p>{card.detail}</p>
              </div>
            );
          })}
          {completedTickets.map((ticket) => {
            return (
              <div
                key={ticket.ticketId}
                className="relative w-64 overflow-hidden rounded-sm border bg-card p-[0.5px] backdrop-blur-3xl"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#2dd4bf_0%,#84cc16_50%,#84cc16_100%)]" />
                <div className="inline-flex h-full w-full flex-col rounded-sm bg-card px-3 py-1 text-sm backdrop-blur-3xl">
                  <p className="pb-2 font-medium">{ticket.title}</p>
                  <p>{ticket.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default TrackerBoard;

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  type ISelectUserInfo,
  type ISelectUserVisaPillarDetails,
} from "@/server/db/schema";
import { VISA_PILLARS_EX_LIST, visaPillars } from "@/lib/constants";
import React from "react";

type TrackerBoardProps = {
  userInfo: ISelectUserInfo | undefined;
  userPillars: ISelectUserVisaPillarDetails[];
};

const TrackerBoard = ({ userInfo, userPillars }: TrackerBoardProps) => {
  return (
    <div>
      <ScrollArea className="h-[calc(98vh-4rem)] w-[calc(100vw-30px)] text-sm md:w-[calc(100vw-261px)]">
        <div className="mr-8 flex gap-3">
          {VISA_PILLARS_EX_LIST.map((pillar) => {
            const pillarDetails = userPillars.filter(
              (p) => p.pillar === pillar,
            );
            return (
              <TrackerBoardColumn
                key={pillar}
                title={pillar}
                cards={pillarDetails}
              />
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

type TrackerBoardColumnProps = {
  title: string;
  cards: ISelectUserVisaPillarDetails[];
};

const TrackerBoardColumn = ({ title, cards }: TrackerBoardColumnProps) => {
  return (
    <ScrollArea>
      <div className="sticky top-0 mb-2 rounded-t-sm bg-secondary p-2 font-semibold">
        <p>
          {visaPillars.find((pillar) => pillar.value === title)?.label ??
            "Miscellaneous"}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className="w-64 rounded-sm border bg-card p-2 shadow-sm"
            >
              <p className="font-medium">{card.title}</p>
              <p>{card.detail}</p>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default TrackerBoard;

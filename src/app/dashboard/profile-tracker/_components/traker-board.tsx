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
    <div className=" flex h-[calc(98vh-4rem)] w-[calc(100vw-30px)] gap-3 overflow-y-clip overflow-x-scroll text-sm md:w-[calc(100vw-261px)]">
      {VISA_PILLARS_EX_LIST.map((pillar) => {
        const pillarDetails = userPillars.filter((p) => p.pillar === pillar);
        return (
          <TrackerBoardColumn
            key={pillar}
            title={pillar}
            cards={pillarDetails}
          />
        );
      })}
    </div>
    // <ScrollArea className="h-[calc(98vh-4rem)] w-[calc(100vw-30px)] bg-green-100 text-sm md:w-[calc(100vw-261px)]">
    //   <div className="mr-8 flex gap-3 overflow-y-clip">
    //     {VISA_PILLARS_EX_LIST.map((pillar) => {
    //       const pillarDetails = userPillars.filter((p) => p.pillar === pillar);
    //       return (
    //         <TrackerBoardColumn
    //           key={pillar}
    //           title={pillar}
    //           cards={pillarDetails}
    //         />
    //       );
    //     })}
    //   </div>
    //   <ScrollBar orientation="horizontal" />
    // </ScrollArea>
  );
};

type TrackerBoardColumnProps = {
  title: string;
  cards: ISelectUserVisaPillarDetails[];
};

const TrackerBoardColumn = ({ title, cards }: TrackerBoardColumnProps) => {
  return (
    <div>
      <div className="sticky top-0 mb-2 w-64 rounded-t-sm bg-secondary p-2 font-semibold">
        <p>
          {visaPillars.find((pillar) => pillar.value === title)?.label ??
            "Miscellaneous"}
        </p>
      </div>
      <ScrollArea className="h-full ">
        <div className="flex flex-col gap-2">
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
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default TrackerBoard;

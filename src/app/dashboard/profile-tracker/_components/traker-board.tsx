"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  type ISelectTickets,
  type ISelectUserVisaPillarDetails,
} from "@/server/db/schema";
import { VISA_PILLARS_EX_LIST, visaPillars } from "@/lib/constants";
import React from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type TrackerBoardProps = {
  userPillars: ISelectUserVisaPillarDetails[];
  completedTickets: ISelectTickets[];
};

const TrackerBoard = ({ userPillars, completedTickets }: TrackerBoardProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-[calc(98vh-6rem)] w-[calc(100vw-30px)] gap-4 overflow-y-clip overflow-x-scroll pr-11 text-sm md:w-[calc(100vw-261px)]",
        pathname.includes("profile-tracker") ? " h-[calc(98vh-3.5rem)]" : "",
      )}
    >
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
  const [editMode, setEditMode] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState("");
  const [editedDetail, setEditedDetail] = React.useState("");

  const utils = api.useUtils();
  const updateUserPillarDetailsByIdMutaiton =
    api.userDetails.updateUserPillarDetailsById.useMutation({
      onSuccess: async () => {
        await utils.userDetails.getUserPillars.refetch();
        await utils.userDetails.getUserPillarsByUserId.refetch();
      },
    });

  const editHandler = (pillarId: string, title: string, detail: string) => {
    if (editMode) {
      // save changes
      updateUserPillarDetailsByIdMutaiton.mutate({
        pillarId: pillarId,
        title: editedTitle,
        detail: editedDetail,
      });
    } else {
      setEditMode(true);
      setEditedTitle(title);
      setEditedDetail(detail);
    }
  };

  const editTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const editDetailHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDetail(e.target.value);
  };

  return (
    <div>
      <div className="sticky top-0 mb-2 w-[20rem] rounded-t-sm bg-secondary p-2 font-semibold">
        <p>
          {visaPillars.find((pillar) => pillar.value === title)?.label ??
            "Miscellaneous"}
        </p>
      </div>
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-3 pb-20">
          {cards.map((card) => {
            return (
              <div key={card.id}>
                <Dialog onOpenChange={() => setEditMode(false)}>
                  <DialogTrigger>
                    <Card className="w-[20rem] cursor-pointer rounded-sm p-4 text-left transition delay-75 duration-200 hover:bg-lime-100/45 dark:bg-neutral-950 dark:hover:bg-neutral-900/20">
                      <p className="pb-2 font-medium ">{card.title}</p>
                      <p className="">{card.detail}</p>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="w-2xl max-w-2xl pt-10 ">
                    <DialogHeader>
                      {editMode ? (
                        <>
                          <DialogTitle>
                            <Input
                              value={editedTitle}
                              onChange={editTitleHandler}
                            />
                          </DialogTitle>
                          <DialogDescription className="py-4 text-primary-foreground dark:text-secondary-foreground">
                            <Textarea
                              className="h-72 max-h-[40rem]"
                              value={editedDetail}
                              onChange={editDetailHandler}
                            />
                          </DialogDescription>
                        </>
                      ) : (
                        <>
                          <DialogTitle>{card.title}</DialogTitle>
                          <DialogDescription className="py-4 text-primary-foreground dark:text-secondary-foreground">
                            {card.detail}
                          </DialogDescription>
                        </>
                      )}
                    </DialogHeader>
                    <DialogFooter>
                      {/* <Button
                        onClick={() =>
                          editHandler(card.id, card.title, card.detail)
                        }
                        type="submit"
                      >
                        {editMode ? "Save" : "Edit"}
                      </Button> */}
                      {editMode ? (
                        <DialogClose asChild>
                          <Button
                            onClick={() =>
                              editHandler(card.id, card.title, card.detail)
                            }
                            type="submit"
                          >
                            Save
                          </Button>
                        </DialogClose>
                      ) : (
                        <Button
                          onClick={() =>
                            editHandler(card.id, card.title, card.detail)
                          }
                          type="submit"
                        >
                          Edit
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            );
          })}
          {completedTickets.map((ticket) => {
            return (
              <div key={ticket.ticketId}>
                <Dialog>
                  <DialogTrigger>
                    <Card className="relative w-[20rem] overflow-hidden rounded-sm p-[0.75px] text-left backdrop-blur-3xl">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#2dd4bf_0%,#84cc16_50%,#84cc16_100%)]" />
                      <div className="inline-flex h-full w-full flex-col rounded-sm bg-card px-3 py-4 text-sm backdrop-blur-3xl hover:bg-lime-100 dark:bg-neutral-950 dark:hover:bg-neutral-900">
                        <p className="pb-2 font-medium">{ticket.title}</p>
                        <p>{ticket.description}</p>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="w-2xl max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{ticket.title}</DialogTitle>
                      <DialogDescription className="py-4 text-primary-foreground">
                        {ticket.description}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
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

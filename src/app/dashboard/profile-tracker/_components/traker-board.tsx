"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  type ISelectTickets,
  type ISelectUserVisaPillarDetails,
} from "@/server/db/schema";
import {
  type IPillarsEx,
  VISA_PILLARS_EX_LIST,
  visaPillars,
} from "@/lib/constants";
import React, { useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

type TrackerBoardProps = {
  addButton?: boolean;
  userPillars: ISelectUserVisaPillarDetails[];
  completedTickets: ISelectTickets[];
};

const TrackerBoard = ({
  userPillars,
  completedTickets,
  addButton,
}: TrackerBoardProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex h-[calc(100vh-6rem)] w-full gap-4 overflow-y-clip overflow-x-scroll pr-11 text-sm md:w-full",
        pathname.includes("profile-tracker") ? " h-[calc(98vh-3.5rem)]" : "",
      )}
    >
      {VISA_PILLARS_EX_LIST.map((pillar) => {
        const pillarDetails = userPillars.filter((p) => p.pillar === pillar);
        return (
          <TrackerBoardColumn
            addButton={addButton}
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
  addButton?: boolean;
  title: string;
  cards: ISelectUserVisaPillarDetails[];
  completedTickets: ISelectTickets[];
};

const TrackerBoardColumn = ({
  addButton,
  title,
  cards,
  completedTickets,
}: TrackerBoardColumnProps) => {
  const router = useRouter();
  const [editMode, setEditMode] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState("");
  const [editedDetail, setEditedDetail] = React.useState("");

  const [openNewUserPillar, setOpenNewUserPillar] = React.useState(false);
  const [userPillarTitle, setUserPillarTitle] = React.useState("");
  const [userPillarDetail, setUserPillarDetail] = React.useState("");

  const utils = api.useUtils();
  const addUserPillarDetailsMutation =
    api.userDetails.addSingularPillarDetails.useMutation({
      onSuccess: async () => {
        toast.success("Visa Pillar Details added successfully");
        router.refresh();
      },
      onError: (error) => {
        toast.error("An error occured- " + error.message, { duration: 30000 });
      },
    });

  const userPillarTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPillarTitle(e.target.value);
  };

  const userPillarDetailHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setUserPillarDetail(e.target.value);
  };

  const userPillarSaveHandler = () => {
    if (!userPillarTitle) {
      toast.error("Please enter a title");
      return;
    }
    if (!userPillarDetail) {
      toast.error("Please enter a Description");
      return;
    }
    addUserPillarDetailsMutation.mutate({
      title: userPillarTitle,
      detail: userPillarDetail,
      pillar: pillar.value,
    });
    setUserPillarTitle("");
    setUserPillarDetail("");
    setOpenNewUserPillar(false);
  };

  const updateUserPillarDetailsByIdMutaiton =
    api.userDetails.updateUserPillarDetailsById.useMutation({
      onSuccess: async () => {
        // await utils.userDetails.getUserPillars.refetch();
        // await utils.userDetails.getUserPillarsByUserId.refetch();
        router.refresh();
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

  const pillar: IPillarsEx = visaPillars.find(
    (pillar) => pillar.value === title,
  ) ?? { value: "misc", label: "Miscellaneous" };

  return (
    <div>
      <div className="sticky top-0 z-50 mb-2 flex w-[20rem] justify-between rounded-t-sm bg-secondary p-2 font-semibold">
        <p>{`${pillar.label} (${cards.length + completedTickets.length})`}</p>
        {!!addButton && (
          <>
            <Button
              onClick={() => setOpenNewUserPillar(true)}
              className="h-5 w-5 p-0"
            >
              <PlusIcon />
            </Button>
            <Dialog
              open={openNewUserPillar}
              onOpenChange={() => setOpenNewUserPillar(false)}
            >
              {/* <DialogTrigger>
            </DialogTrigger> */}
              <DialogContent className="w-2xl max-w-2xl pt-10 ">
                <DialogHeader>
                  <>
                    <DialogTitle>
                      <Input
                        value={userPillarTitle}
                        onChange={userPillarTitleHandler}
                        placeholder={`${pillar.label} Title`}
                      />
                    </DialogTitle>
                    <DialogDescription className="py-4  dark:text-secondary-foreground">
                      <Textarea
                        placeholder={`${pillar.label} Description`}
                        className="h-72 max-h-[40rem]"
                        value={userPillarDetail}
                        onChange={userPillarDetailHandler}
                      />
                    </DialogDescription>
                  </>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={userPillarSaveHandler} type="submit">
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-3 pb-20">
          {cards.map((card) => {
            return (
              <div key={card.id}>
                <Dialog onOpenChange={() => setEditMode(false)}>
                  <DialogTrigger>
                    <Card className="w-[20rem] cursor-pointer rounded-sm p-4 text-left transition delay-75 duration-200 hover:bg-lime-100/25 dark:bg-neutral-950 dark:hover:bg-neutral-900/20">
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
                          <DialogDescription className="py-4  dark:text-secondary-foreground">
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
                          <DialogDescription className="py-4 dark:text-secondary-foreground">
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
                    <Card className="w-[20rem] cursor-pointer rounded-sm border-primary/80 p-4 text-left transition delay-75 duration-200 hover:bg-lime-100/25 dark:bg-neutral-950 dark:hover:bg-neutral-900/20">
                      <p className="pb-2 font-medium ">{ticket.title}</p>
                      <p className="">{ticket.description}</p>
                    </Card>
                    {/* <Card className="box-border w-[20rem] cursor-pointer rounded-sm border-primary text-left transition delay-75 duration-200 hover:bg-lime-100/25 dark:bg-neutral-950 dark:hover:bg-neutral-900/20 ">
                      <div className="inline-flex h-full w-full flex-col rounded-sm bg-card px-3 py-4 text-sm ">
                        <p className="pb-2 font-medium">{ticket.title}</p>
                        <p>{ticket.description}</p>
                      </div>
                    </Card> */}
                  </DialogTrigger>
                  <DialogContent className="w-2xl max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{ticket.title}</DialogTitle>
                      <DialogDescription className="py-4">
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

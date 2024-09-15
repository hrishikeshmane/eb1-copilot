"use client";

import React, { useState } from "react";
import TrackerBoard from "../profile-tracker/_components/traker-board";
import {
  type ISelectTickets,
  type ISelectUserVisaPillarDetails,
} from "@/server/db/schema";
import MasterBoard from "./_component/master-board";
import TestComponent from "./_component/v0-test";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import Loader from "@/components/elements/loader";
import { on } from "events";

const MasterList = () => {
  const utils = api.useUtils();
  const { data, isLoading, isError } = api.masterList.getAll.useQuery();
  const addListMutation = api.masterList.addToMasterList.useMutation({
    onSuccess: () => {
      utils.masterList.getAll.invalidate();
    },
  });

  const createListHandler = async () => {
    addListMutation.mutate({
      title: listTitle,
      description: listDesc,
    });
  };

  const [listTitle, setListTitle] = useState("");
  const [listDesc, setListDesc] = useState("");

  if (isError) {
    return <div>Error Fetching Master lists</div>;
  }

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 rounded-md bg-card p-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4 w-full gap-1">
              <PlusIcon /> New List
            </Button>
          </DialogTrigger>
          <DialogContent className="w-2xl max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create a New Master List</DialogTitle>
              <DialogDescription>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="title"
                      placeholder="Cybersecurity List"
                      className="col-span-3 text-foreground"
                      value={listTitle}
                      onChange={(e) => setListTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Tickets to be assigned to Cybersecurity Experts"
                      value={listDesc}
                      className="col-span-3 text-foreground"
                      onChange={(e) => setListDesc(e.target.value)}
                    />
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button type="submit" onClick={createListHandler}>
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {!data ? (
          <div>No Records for Master List</div>
        ) : (
          data.map((list) => (
            <Link
              href={`/dashboard/master-list/${list.id}`}
              key={list.id}
              className="flex w-full justify-between border-b p-2 hover:bg-muted"
            >
              <span className="font-semibold">{list.title}</span>
              <span className="text-muted-foreground">{list.description}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MasterList;

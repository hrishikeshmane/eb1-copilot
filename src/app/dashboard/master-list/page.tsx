import React from "react";
import TrackerBoard from "../profile-tracker/_components/traker-board";
import {
  ISelectTickets,
  ISelectUserVisaPillarDetails,
} from "@/server/db/schema";

const createDummyTickets = () => {
  const dummyTickets: ISelectTickets[] = [];
  for (let i = 0; i < 5; i++) {
    dummyTickets.push({
      ticketId: i.toString(),
      title: `awards/press Ticket ${i}`,
      description: `Description for awards/press Ticket ${i}`,
      customerId: "customer-id",
      pillars: ["awards", "press"],
      column: "backlog",
      order: i,
      assigneeId: "assignee-id",
      createdBy: "created-by",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  for (let i = 0; i < 5; i++) {
    dummyTickets.push({
      ticketId: i.toString(),
      title: `original-contributions Ticket ${i}`,
      description: `Description for original-contributions Ticket ${i}`,
      customerId: "customer-id",
      pillars: ["original-contributions"],
      column: "backlog",
      order: i,
      assigneeId: "assignee-id",
      createdBy: "created-by",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  for (let i = 0; i < 5; i++) {
    dummyTickets.push({
      ticketId: i.toString(),
      title: `authorship Ticket ${i}`,
      description: `Description for authorship Ticket ${i}`,
      customerId: "customer-id",
      pillars: ["authorship"],
      column: "backlog",
      order: i,
      assigneeId: "assignee-id",
      createdBy: "created-by",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  for (let i = 0; i < 5; i++) {
    dummyTickets.push({
      ticketId: i.toString(),
      title: `judging Ticket ${i}`,
      description: `Description for judging Ticket ${i}`,
      customerId: "customer-id",
      pillars: ["judging"],
      column: "backlog",
      order: i,
      assigneeId: "assignee-id",
      createdBy: "created-by",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return dummyTickets;
};

const MasterList = () => {
  const dummyUserPillars: ISelectUserVisaPillarDetails[] = [];
  const dummyMasterList: ISelectTickets[] = createDummyTickets();
  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      <TrackerBoard
        userPillars={dummyUserPillars}
        completedTickets={dummyMasterList}
      />
    </div>
  );
};

export default MasterList;

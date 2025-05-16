import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export async function VendorDashboard() {
  const usersTickets = (await api.kanban.getAllUsersTickets()) ?? [];

  const completedTicketsCount =
    usersTickets.filter((ticket) => ticket.column === "done").length ?? 0;
  const inProgressTicketsCount =
    usersTickets.filter((ticket) => ticket.column === "doing").length ?? 0;
  const openTicketsCount =
    usersTickets.filter(
      (ticket) => ticket.column === "backlog" || ticket.column === "todo",
    ).length ?? 0;

  return (
    <div className="my-6 flex flex-col gap-4 pr-2 ">
      <div className="flex w-full flex-col rounded-md border bg-card p-4">
        <div className="flex w-full items-center">
          <h3 className="font-semibold">{`Track your Profile`}</h3>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/profile-tracker">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col rounded-md border bg-card p-4">
        <div className="flex w-full items-center">
          <h3 className=" font-semibold">{`You have ${usersTickets.length} Tickets`}</h3>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/builder">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex max-w-[16rem] flex-col gap-1">
          <Badge variant={"secondary"}>
            {`Completed Tickets- ${completedTicketsCount} `}
          </Badge>
          <Badge variant={"secondary"}>
            {`In progress Tickets- ${inProgressTicketsCount} `}
          </Badge>
          <Badge variant={"secondary"}>
            {`Open Tickets- ${openTicketsCount} `}
          </Badge>
        </div>
      </div>
    </div>
  );
}

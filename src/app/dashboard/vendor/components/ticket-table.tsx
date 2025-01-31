"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { useAtomValue } from "jotai";

import { ArrowRight, ArrowUpDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterPillarsAtom } from "@/app/_store/kanban-store";
import { TicketSheet } from "@/components/elements/custom-kanban";
import { clerkClient } from "@clerk/nextjs";
import Link from "next/link";

export interface ISelectTickets {
  ticketId: string;
  title: string;
  description?: string;
  pillars: string[];
  column: string;
  assigneeId?: string;
  dueDate: string;
}

export const VendorTicketTable = ({
  tickets,
}: {
  tickets: ISelectTickets[];
}) => {
  const filterPillars = useAtomValue(FilterPillarsAtom);

  const filteredData = useMemo(() => {
    return tickets.filter((ticket) => {
      if (filterPillars.length === 0) return true;
      return filterPillars.some((p) => ticket.pillars.includes(p.value));
    });
  }, [tickets, filterPillars]);

  const columns = useMemo<ColumnDef<ISelectTickets>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => (
          <div className="w-[150px] font-medium">
            {info.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => {
          const description = info.getValue() as string;
          return (
            <p className="w-[350px]">
              {description?.length > 50
                ? `${description.slice(0, 50)}...`
                : description}
            </p>
          );
        },
      },
      {
        accessorKey: "pillars",
        header: "Pillars",
        cell: (info) => (
          <div className="flex w-[300px] flex-wrap gap-2">
            {(info.getValue() as string[]).map((pillar, index) => (
              <Badge key={index} variant="secondary">
                {pillar}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "column",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: (info) => (
          <div className="w-[100px] font-semibold capitalize">
            {info.getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "dueDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Due Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: (info) => {
          const dueDate = new Date(info.getValue() as string);
          const today = new Date();
          const diffDays = Math.ceil(
            (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
          );
          const dueDateStatus =
            diffDays > 0
              ? `In ${diffDays} days`
              : `${Math.abs(diffDays)} days ago`;

          return (
            <>
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
            </>
          );
        },
      },
      {
        accessorKey: "customerId",
        header: "Customer",
        cell: (info) => {
          return (
            <div className="flex w-[200px] flex-col">
              <span className="mr-2 text-xs">{info.getValue() as string}</span>
              <Link
                className="flex text-xs text-primary underline"
                target="_blank"
                href={`/dashboard/profile-management/${info.getValue() as string}`}
              >
                Customer Details <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          );
        },
      },
    ],
    [],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TicketSheet key={row.original.ticketId} card={row.original}>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TicketSheet>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

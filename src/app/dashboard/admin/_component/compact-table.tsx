"use client";

import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/trpc/react";
import Loader from "@/components/elements/loader";
import Link from "next/link";
import { type TransformedUser } from "@/types/globals";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { profileStatusOptions } from "@/lib/constants";

type User = any;

// Sample status list for dropdown
const statusOptions = ["Not Started", "In Progress", "Completed"];

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => (
      <div className="w-[280px] text-sm">{row.getValue("userId")}</div>
    ),
  },
  {
    accessorKey: "user.firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name & Email
          <ArrowUpDown className="ml-2 h-2 w-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex w-[280px] items-center gap-2">
          <Avatar>
            <AvatarImage
              src={user.imageUrl}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="font-sm">{`${user.firstName} ${user.lastName}`}</div>
            <div className="text-xs text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "accountManager",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account Manager
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const adminUsers =
        api.userManagement.getAccountManagerAndResearchAssistants.useQuery();
      const AMs = adminUsers.data?.accountManagers;

      const editCustomerDetailsMutation =
        api.userManagement.editCustomerDetails.useMutation();

      const userId = row.getValue("userId") as string;

      const handleAccountManagerChange = async (AMId: string) => {
        await editCustomerDetailsMutation.mutateAsync({
          userId,
          accountManager: AMId,
        });
      };

      return (
        <Select
          onValueChange={(value) => handleAccountManagerChange(value)}
          defaultValue={row.getValue("accountManager")}
        >
          <SelectTrigger className="h-8 w-[180px] px-1 py-0">
            <SelectValue placeholder="Select Account Manager" />
          </SelectTrigger>
          <SelectContent>
            {AMs?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.firstName + " " + user.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "researchAssistant",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Research Assistant
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const adminUsers =
        api.userManagement.getAccountManagerAndResearchAssistants.useQuery();
      const RAs = adminUsers.data?.researchAssistants;

      return (
        <Select defaultValue={row.getValue("researchAssistant")}>
          <SelectTrigger className="h-8 w-[180px] px-1 py-0">
            <SelectValue placeholder="Select Research Assistant" />
          </SelectTrigger>
          <SelectContent>
            {RAs?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.firstName + " " + user.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "profileStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profile Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Select defaultValue={row.getValue("profileStatus")}>
        <SelectTrigger className="h-8 w-[150px] px-1 py-0">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          {profileStatusOptions.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="mx-auto w-[80px]">{row.getValue("startDate")}</p>
    ),
  },
  {
    accessorKey: "raIntroCallDone",
    header: "RA Intro Call Done",
    cell: ({ row }) => (
      <Select defaultValue={row.getValue("raIntroCallDone") ? "Yes" : "No"}>
        <SelectTrigger className="h-8 w-[80px] px-1 py-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Yes">Yes</SelectItem>
          <SelectItem value="No">No</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "attorneyCall",
    header: "Attorney Call",
    cell: ({ row }) => (
      <Select defaultValue={row.getValue("attorneyCall") ? "Yes" : "No"}>
        <SelectTrigger className="h-8 w-[80px] px-1 py-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Yes">Yes</SelectItem>
          <SelectItem value="No">No</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "user.customerType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Program
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="mx-auto w-[80px] capitalize">{row.original.customerType}</p>
    ),
  },
  {
    accessorKey: "profileProgress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profile Progress
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[100px]">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${row.getValue("profileProgress")}%` }}
          ></div>
        </div>
        <div className="mt-1 text-center text-xs">
          {row.getValue("profileProgress")}%
        </div>
      </div>
    ),
  },
];

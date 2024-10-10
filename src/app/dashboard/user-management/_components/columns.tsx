"use client";

import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
// import {DataTableColumnHeader} from "./data-table-column-header";

export const columns: ColumnDef<TransformedUser>[] = [
  {
    id: "user",
    accessorKey: "userInfo",
    filterFn: (row, columnId, filterValue) => {
      const searchString = (
        row.original.firstName +
        " " +
        row.original.lastName
      ).toLowerCase();
      if (searchString.includes(String(filterValue).toLowerCase())) {
        return true;
      }
      return false;
    },
    header: () => {
      return <span>User Info</span>;
    },
    cell: ({ row }) => {
      const userData = row.original;
      const firstName = userData.firstName!;
      const lastName = userData.lastName!;
      const emailAddresses = userData.emailAddresses;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData.imageUrl} />
            <AvatarFallback>
              {firstName.charAt(0) + lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{firstName + " " + lastName}</span>
            <span className="lowercase text-muted-foreground">
              {emailAddresses}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: () => {
      return <span>Contact</span>;
    },
    cell: ({ row }) => {
      const userData = row.original;
      const userId = userData.id;
      // const emailAddresses = userData.emailAddresses;

      // const phoneNumberAndLinkedin =
      //   api.userManagement.getUserInfoById.useQuery({
      //     userId: String(userId),
      //   });

      // if (phoneNumberAndLinkedin.status === "pending") {
      //   return <Loader className="p-0" />;
      // }
      // if (phoneNumberAndLinkedin.status === "error") {
      //   return <p>---</p>;
      // }

      // return (
      //   <div className="flex flex-col">
      //     <Link
      //       href={phoneNumberAndLinkedin.data?.linkedIn ?? ""}
      //       target="_blank"
      //       rel="noopener noreferrer"
      //       className="text-blue-500"
      //     >
      //       LinkedIn
      //     </Link>
      //     <span>{phoneNumberAndLinkedin.data?.phone}</span>
      //   </div>
      // );

      return (
        <div className="flex flex-col">
          {userData.linkedin && (
            <Link
              href={userData.linkedin ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              LinkedIn
            </Link>
          )}
          <span>{userData.phone}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "onBoarded",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          On Boarded
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
        // <DataTableColumnHeader column={column} title="On Boarded" />
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      const onboarded = userData.onBoarded;
      return (
        <div className="w-[80px] text-center">{onboarded ? "Yes" : "No"}</div>
      );
    },
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priorityCallSheduled",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority Call Scheduled
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
        // <DataTableColumnHeader column={column} title="On Boarded" />
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      const priorityCallSheduled = userData.priorityCallSheduled;
      return (
        <div className="w-[80px] text-center">
          {priorityCallSheduled ? "Yes" : "No"}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "role",
    filterFn: (row, id, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
        // <DataTableColumnHeader column={column} title="Role" />
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      return (
        <div className="w-[80px] text-center font-medium capitalize">
          {userData.role}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const userId = row.original.id;
      const userFullName = row.original.firstName + " " + row.original.lastName;
      const userRole = row.original.role;

      const utils = api.useUtils();
      const updateRoleMutation = api.userManagement.updateUserRole.useMutation({
        onSettled: async () => {
          await utils.userManagement.getAllUsers.invalidate();
        },
      });

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {userRole !== "admin" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateRoleMutation.mutate({
                      userId: userId ?? "",
                      role: "admin",
                    })
                  }
                >
                  Change Role to Admin
                </DropdownMenuItem>
              )}
              {userRole !== "vendor" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateRoleMutation.mutate({
                      userId: String(userId),
                      role: "vendor",
                    })
                  }
                >
                  Change Role to Vendor
                </DropdownMenuItem>
              )}
              {userRole !== "customer" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateRoleMutation.mutate({
                      userId: userId ?? "",
                      role: "customer",
                    })
                  }
                >
                  Change Role to Customer
                </DropdownMenuItem>
              )}
              {/* <DropdownMenuItem>
                    <DialogTrigger>Change Role</DialogTrigger>
                  </DropdownMenuItem> */}

              {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Change Role</DialogTitle>
                <DialogDescription>
                  {`User role will be changed for ${userFullName ?? "a user"}`}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Select defaultValue={userRole}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="customer">Cutomer</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                {/* <DialogClose asChild>
                      <Button type="button" >
                        Save
                      </Button>
                    </DialogClose> */}
              </DialogFooter>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];

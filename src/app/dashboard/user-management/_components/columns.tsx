"use client";

import React, { useState } from "react";
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
  DialogTrigger,
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useProjectDatasets } from "sanity";
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
            {/* TODO: fix this weird thing */}
            <AvatarImage src={userData.imageUrl ?? undefined} />
            <AvatarFallback>
              {firstName.charAt(0) + lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link
              href={`/dashboard/profile-management/${userData.id}`}
              className="hover:underline"
            >
              {firstName + " " + lastName}
            </Link>
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
      const userData = row.original;
      const userId = row.original.id;
      const userFullName = row.original.firstName + " " + row.original.lastName;
      const userRole = row.original.role;

      const utils = api.useUtils();
      const updateRoleMutation = api.userManagement.updateUserRole.useMutation({
        onSettled: async () => {
          await utils.userManagement.getAllUsers.invalidate();
        },
      });

      const disableOnboardingFormMutation =
        api.userManagement.disableOnboardingForm.useMutation({
          onSettled: async () => {
            await utils.userManagement.getAllUsers.invalidate();
          },
        });

      // ESlint fails to understand that cell is also a react component
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [userProgramForm, setUserProgramForm] = useState({
        accountManager: "",
        researchAssistant: "",
        customerType: "",
      });
      const addUserToProgramMutation =
        api.userManagement.addUserToProgram.useMutation({
          onSuccess: () => {
            toast.success("User added to program successfully");
          },
          onError: () => {
            toast.error("Failed to add user to program");
          },
        });
      const handleAddUserToProgram = async () => {
        console.log("Selected values:", userProgramForm);
        // validate form
        if (
          !userProgramForm.accountManager ||
          !userProgramForm.researchAssistant ||
          !userProgramForm.customerType
        ) {
          toast.error("Please fill all fields");
          return;
        }

        addUserToProgramMutation.mutate({
          userId: userId!,
          accountMangerId: userProgramForm.accountManager,
          researchAssistantId: userProgramForm.researchAssistant,
          customerType: userProgramForm.customerType as "copilot" | "autopilot",
        });
      };

      const adminUsers =
        api.userManagement.getAccountManagerAndResearchAssistants.useQuery();
      const AMs = adminUsers.data?.accountManagers;
      const RAs = adminUsers.data?.researchAssistants;

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
              {userRole === "customer" && (
                <DropdownMenuItem
                  // disabled={
                  //   userData.onBoarded ||
                  //   (userData.disableOnboardingForm ?? false)
                  // }
                  onClick={() =>
                    disableOnboardingFormMutation.mutate({
                      userId: userId ?? "",
                    })
                  }
                >
                  Disable Onboarding Form
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="border-primary">
                <DialogTrigger className="font-semibold text-primary">
                  Add User to Program
                </DialogTrigger>
              </DropdownMenuItem>

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
                <DialogTitle>Add User to Program</DialogTitle>
                <DialogDescription>
                  {`This action will mark ${userFullName ?? "user"} as a paid customer`}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label>Select Account Manger</Label>
                  <Select
                    onValueChange={(value) =>
                      setUserProgramForm((prev) => ({
                        ...prev,
                        accountManager: value,
                      }))
                    }
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Account Manger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Account Mangers</SelectLabel>
                        {AMs?.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.firstName + " " + user.lastName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label>Select Research Assistant</Label>
                  <Select
                    onValueChange={(value) =>
                      setUserProgramForm((prev) => ({
                        ...prev,
                        researchAssistant: value,
                      }))
                    }
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select Research Assistant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Research Assistants</SelectLabel>
                        {RAs?.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.firstName + " " + user.lastName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label>Select Customer Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setUserProgramForm((prev) => ({
                        ...prev,
                        customerType: value,
                      }))
                    }
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Customer Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Customer Types</SelectLabel>
                        <SelectItem value="copilot">EB1 Copilot</SelectItem>
                        <SelectItem value="autopilot">EB1 Autopilot</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Discard
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleAddUserToProgram}>
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];

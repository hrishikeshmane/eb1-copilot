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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useProjectDatasets } from "sanity";
import { User } from "@clerk/nextjs/server";

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

      const isOnboarded = row.original.onBoarded;

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
            {isOnboarded ? (
              <Link
                href={`/dashboard/profile-management/${userData.id}`}
                className="hover:underline"
              >
                {firstName + " " + lastName}
              </Link>
            ) : (
              <span>{firstName + " " + lastName}</span>
            )}
            <span className="lowercase text-muted-foreground">
              {emailAddresses}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    filterFn: (row, columnId, value) => {
      const date = row.getValue(columnId);
      if (!(date instanceof Date)) {
        console.error(
          `Value of column "${columnId}" is expected to be a date, but got ${date}`,
        );
        return false;
      }

      if (value === undefined) {
        return true;
      }

      const { from, to } = value;
      if (
        !(from instanceof Date || from === undefined) ||
        !(to instanceof Date || to === undefined)
      ) {
        console.error(
          `Filter value of column "${columnId}" is expected to be an array of two dates, but got ${value}`,
        );
        return false;
      }

      if ((from || to) && !date) {
        return false;
      }

      if (from && !to) {
        return date.getTime() >= from.getTime();
      } else if (!from && to) {
        return date.getTime() <= to.getTime();
      } else if (from && to) {
        return (
          date.getTime() >= from.getTime() && date.getTime() <= to.getTime()
        );
      }

      return true;
    },
    header: () => {
      return <span>Created At</span>;
    },
    cell: ({ row }) => {
      const userData = row.original;
      const createdAt = userData.createdAt;
      return <span>{createdAt.toLocaleDateString()}</span>;
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
      const userEmail = userData.emailAddresses;

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

      const [isDialogOpen, setIsDialogOpen] = useState(false)

      const addUserToProgramMutation =
        api.userManagement.addUserToProgram.useMutation({
          onSuccess: (data) => {
            toast.success(data.message);
          },
          onError: (error) => {
            toast.error(error.message);
          },
          onSettled: () => {
            setIsDialogOpen(false)
          }
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

        const selectedAM = AMs?.find(user => user.id === userProgramForm.accountManager);
        const selectedRA = RAs?.find(user => user.id === userProgramForm.researchAssistant);

        addUserToProgramMutation.mutate({
          userId: userId!,
          accountMangerId: userProgramForm.accountManager,
          researchAssistantId: userProgramForm.researchAssistant,
          customerType: userProgramForm.customerType as "copilot" | "autopilot",
          readEmails: [userEmail],
          writeEmails: [selectedRA?.emailAddresses[0]?.emailAddress ?? '', selectedAM?.emailAddresses[0]?.emailAddress ?? ''],
          userName: userFullName,
        });
      };

      const adminUsers =
        api.userManagement.getAccountManagerAndResearchAssistants.useQuery();
      const AMs = adminUsers.data?.accountManagers;
      const RAs = adminUsers.data?.researchAssistants;

      const [newComment, setNewComment] = useState("");
      const addCommentMutation = api.userManagement.addComment.useMutation({
        onSuccess: async () => {
          toast.success("Comment added successfully");
          await utils.userManagement.getAllUsers.invalidate();
        },
        onError: () => {
          toast.error("Failed to add comment");
        },
      });

      const addCommentHandler = () => {
        if (!newComment) {
          toast.error("Please enter a comment");
          return;
        }
        addCommentMutation.mutate({
          userId: userId!,
          comments: userData.comments ?? [],
          newComment: newComment,
        });
        setNewComment("");
      };

      return (
        <>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Sheet>
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
                      onClick={() =>
                        disableOnboardingFormMutation.mutate({
                          userId: userId ?? "",
                        })
                      }
                    >
                      Disable Onboarding Form
                    </DropdownMenuItem>
                  )}
              {
                userData.dataRoomLink && (
                  <DropdownMenuItem>
                    <Link
                      href={userData.dataRoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary"
                    >
                      View Data Room
                    </Link>
                  </DropdownMenuItem>
                )
              }
              {!userData.dataRoomLink &&
                    <DropdownMenuItem className="border-primary">
                      <DialogTrigger className="font-semibold text-primary">
                        Add User to Program
                      </DialogTrigger>
                    </DropdownMenuItem>
              }
                  <DropdownMenuItem className="border-blue-500">
                    <SheetTrigger className="font-semibold text-blue-600">
                      Manage Comments
                    </SheetTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <SheetContent className="sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-base">Manage Comments</SheetTitle>
                  <SheetDescription>{`View and add comments for ${userFullName ?? "user"}`}</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="new-comment">Add New Comment</Label>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      id="new-comment"
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Enter your comment here..."
                    />
                  </div>
                  <Button
                    className="w-full"
                    type="submit"
                    onClick={addCommentHandler}
                  >
                    Add Comment
                  </Button>
                  <div className="grid gap-2">
                    <Label>Previous Comments</Label>
                    <div className="h-[calc(100vh-21rem)] overflow-y-auto rounded-md border p-4">
                      <div className="space-y-4">
                        {/* Display fetched comments */}
                        {[...(userData.comments ?? [])]
                          .reverse()
                          .map((comment, idx) => (
                            <UserComment key={idx} comment={comment} />
                            // <div key={idx} className="border-b pb-2">
                            //   <div className="flex items-center justify-between">
                            //     <span className="font-medium">
                            //       {comment.userId}
                            //     </span>
                            //     <span className="text-sm text-muted-foreground">
                            //       {new Date(
                            //         parseInt(comment.timestamp),
                            //       ).toLocaleDateString()}
                            //     </span>
                            //   </div>
                            //   <p className="mt-1 text-sm">{comment.comment}</p>
                            // </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <SheetFooter className="sm:justify-end">
                  {/* <Button
                    className="w-full"
                    type="submit"
                    onClick={addCommentHandler}
                  >
                    Add Comment
                  </Button> */}
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add User to Program</DialogTitle>
                <DialogDescription>
                  {`This action will mark ${userFullName ?? "user"} as a paid customer 
                  and create a dataroom with write access for 
                  Research Assistants and Account Managers, 
                  while providing view access to ${userFullName ?? "the customer"}`}
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
                  <Button type="button" variant="secondary" disabled={addUserToProgramMutation.isPending}>
                    Discard
                  </Button>
                </DialogClose>
                  <Button type="submit" onClick={handleAddUserToProgram} disabled={addUserToProgramMutation.isPending}>
                    {addUserToProgramMutation.isPending ? 
                      "Adding User to Program..." : 
                      "Save"
                    }
                  </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];

const UserComment = ({
  comment,
}: {
  comment: {
    comment: string;
    timestamp: string;
    userId: string;
  };
}) => {
  const userDetails = api.userManagement.getUser.useQuery({
    userId: comment.userId,
  });

  return (
    <div className="border-b pb-2">
      <div className="flex items-center justify-between">
        {userDetails.isSuccess ? (
          <span className="font-medium">
            {userDetails.data.firstName} {userDetails.data.lastName}
          </span>
        ) : (
          <span className="font-medium">User Undefined</span>
        )}

        <span className="text-sm text-muted-foreground">
          {new Date(parseInt(comment.timestamp)).toLocaleDateString()}
        </span>
      </div>
      <p className="mt-1 text-sm">{comment.comment}</p>
    </div>
  );
};

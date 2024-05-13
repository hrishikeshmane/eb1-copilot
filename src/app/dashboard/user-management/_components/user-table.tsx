/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { use } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { type User } from "@clerk/nextjs/server";
import { api } from "@/trpc/react";
import Loader from "@/components/elements/loader";
import { clerkClient } from "@clerk/nextjs";
import { toast } from "sonner";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross2Icon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export const userRolesMap = [
  {
    label: "Customer",
    value: "customer",
    // icon: ArrowDownIcon,
  },
  {
    label: "Vendor",
    value: "vendor",
    // icon: ArrowRightIcon,
  },
  {
    label: "Admin",
    value: "admin",
    // icon: ArrowUpIcon,
  },
];

export const onBoardedMap = [
  {
    label: "Yes",
    value: "true",
    // icon: ArrowDownIcon,
  },
  {
    label: "No",
    value: "false",
    // icon: ArrowRightIcon,
  },
];

export const UserTable = () => {
  const users = api.userManagement.getAllUsers.useQuery();
  if (users.status === "pending") {
    return <Loader className="p-4" />;
  }
  if (users.status === "success") {
    const userData = users.data;
    return (
      <div className="">
        <DataTableDemo users={userData} />
      </div>
    );
  }

  return <p>Error Loading users</p>;
};

const setRole = async (userId: string, role: string) => {
  console.log(userId, role);
  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: role },
    });
  } catch (e) {
    toast.error("Error updating role");
    console.log(e);
  }
};

export const columns: ColumnDef<User>[] = [
  {
    id: "user",
    filterFn: (row, columnId, filterValue) => {
      // return // true or false based on your custom logic
      const searchString = (
        row.original.firstName +
        " " +
        row.original.lastName
      ).toLowerCase();
      if (searchString.includes(filterValue.toLowerCase())) {
        return true;
      }
      return false;
    },
    header: ({ column }) => {
      return (
        <span>User Info</span>
        // <Button
        //   variant="ghost"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        //   User
        //   <ArrowUpDown className="ml-2 h-4 w-4" />
        // </Button>
      );
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
              {emailAddresses.at(0)?.emailAddress}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => {
      return (
        <span>Contact</span>
        // <Button
        //   variant="ghost"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        //   Contact
        //   <ArrowUpDown className="ml-2 h-4 w-4" />
        // </Button>
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      const userId = userData.id;
      const emailAddresses = userData.emailAddresses;

      const phoneNumberAndLinkedin =
        api.userManagement.getUserInfoById.useQuery({
          userId: userId,
        });

      if (phoneNumberAndLinkedin.status === "pending") {
        return <Loader className="p-0" />;
      }
      if (phoneNumberAndLinkedin.status === "error") {
        return <p>---</p>;
      }

      // const userInfo = await clerkClient.users.getUser(userId);
      // console.log(userInfo);

      return (
        <div className="flex flex-col">
          <Link
            href={phoneNumberAndLinkedin.data?.linkedIn ?? ""}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            LinkedIn
          </Link>
          <span>{phoneNumberAndLinkedin.data?.phone}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "onBoarded",
    header: ({ column }) => {
      return (
        <span>On boarded</span>
        // <Button
        //   variant="ghost"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        //   On boarded
        //   <ArrowUpDown className="ml-2 h-4 w-4" />
        // </Button>
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      const userMetadata =
        userData.publicMetadata as CustomJwtSessionClaims["metadata"];
      const onboarded = userMetadata.onBoarded;
      // return <div className="w-[80px]">{onboarded ? "Yes" : "No"}</div>;
      return <div className="w-[80px]">{onboarded ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "role",
    filterFn: (row, columnId, filterValue) => {
      // return // true or false based on your custom logic
      const userData = row.original;
      const metadata = userData.publicMetadata as CustomJwtSessionClaims;
      const searchString = (metadata.role as string) ?? "";
      console.log("filterValue?", filterValue);
      // if (searchString.includes(filterValue)) {
      //   return true;
      // }
      return false;
    },
    header: ({ column }) => {
      return (
        <span>Role {column.getCanFilter() ? "yes" : "no"}</span>
        //   <Button
        //     className=""
        //     variant="ghost"
        //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //   >
        //     Role
        //     <ArrowUpDown className="ml-2 h-4 w-4" />
        //   </Button>
      );
    },
    cell: ({ row }) => {
      const userData = row.original;
      const metadata = userData.publicMetadata as CustomJwtSessionClaims;
      return (
        <div className="font-medium capitalize">{metadata.role as string}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const userId = row.original.id;
      const userFullName = row.original.firstName + " " + row.original.lastName;
      const userRole = row.original.publicMetadata
        ?.role as CustomJwtSessionClaims["metadata"]["role"];

      const utils = api.useUtils();
      const updateRoleMutation = api.userDetails.updateUserRole.useMutation({
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
                    updateRoleMutation.mutate({ userId: userId, role: "admin" })
                  }
                >
                  Change Role to Admin
                </DropdownMenuItem>
              )}
              {userRole !== "vendor" && (
                <DropdownMenuItem
                  onClick={() =>
                    updateRoleMutation.mutate({
                      userId: userId,
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
                      userId: userId,
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

export function DataTableDemo({ users }: { users: User[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  // console.log(
  //   "getFacetedUniqueValues?",
  //   table.getColumn("role")?.getFacetedRowModel(),
  // );

  return (
    <div className="w-full px-6">
      <div className="flex items-center gap-2 py-4">
        <Input
          // TODO: filter for name and role
          placeholder="Filter Name..."
          value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            return table.getColumn("user")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("onBoarded") && (
          <DataTableFacetedFilter
            column={table.getColumn("onBoarded")}
            title="On boarded"
            options={onBoardedMap}
          />
        )}
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={userRolesMap}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto" size="sm">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm font-medium">
          Total users: {table.getRowCount()}
        </div>
        <div className="flex space-x-2">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button> */}
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className=" hidden w-fit items-center justify-center px-2 text-sm font-medium md:flex">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* <pre>
        {JSON.stringify(
          { columnFilters: table.getState().columnFilters },
          null,
          2,
        )}
      </pre> */}
    </div>
  );
}

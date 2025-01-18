"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { profileStatusOptions } from "@/lib/constants";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter name or email..."
          value={
            (table.getColumn("user.firstName")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("user.firstName")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("profileStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("profileStatus")}
            title="Profile Status"
            options={profileStatusOptions}
          />
        )}
        <p>{table.getColumn("customerType")}</p>
        {table.getColumn("user.customerType") && (
          <DataTableFacetedFilter
            column={table.getColumn("user.customerType")}
            title="Customer Type"
            options={[
              { label: "Autopilot", value: "autopilot" },
              { label: "Manual", value: "manual" },
            ]}
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
      </div>
      <div className="flex items-center space-x-2">
        {table.getSelectedRowModel().rows.length > 0 && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"}>Bulk Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Bulk Edit</DialogTitle>
                  <DialogDescription>
                    This action will affect{" "}
                    {table.getSelectedRowModel().rows.length} selected rows.
                    <br />
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Select>
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Bulk edit..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="account-manager">
                  Change Account Manager
                </SelectItem>
                <SelectItem value="research-assistant">
                  Change Research Assistant
                </SelectItem>
                <SelectItem value="profile-status">
                  Change Profile Status
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => {
                console.log("Bulk edit", table.getSelectedRowModel().rows);
              }}
            >
              Apply
            </Button>
          </>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

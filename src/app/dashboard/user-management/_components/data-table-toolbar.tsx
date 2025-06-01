"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import { onBoardedMap, userRolesMap } from "@/lib/constants";
import { DatePickerWithRange } from "./date-range-picker";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const exportToCSV = (table: Table<any>) => {
  const filteredRows = table.getFilteredRowModel().rows;
  const csvData = filteredRows.map(row => {
    const data = row.original;
    return {
      "Full Name": `${data.firstName} ${data.lastName}`,
      "Email": data.emailAddresses,
      "Created At": data.createdAt.toLocaleDateString(),
      "Contact": data.phone || 'none',
      "On Boarded": data.onBoarded ? 'Yes' : 'No',
      "Priority Call Scheduled": data.priorityCallSheduled ? 'Yes' : 'No',
      "Role": data.role
    };
  });

  if (csvData.length === 0) {
    toast.error("No data to export");
    return;
  }

  const headers = [
    "Full Name",
    "Email",
    "Created At",
    "Contact",
    "On Boarded",
    "Priority Call Scheduled",
    "Role"
  ];

  const csvString = [
    headers.join(','),
    ...csvData.map(row => [
      row["Full Name"],
      row["Email"],
      row["Created At"],
      row["Contact"],
      row["On Boarded"],
      row["Priority Call Scheduled"],
      row["Role"]
    ].map(value => `"${value}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'user_data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          // TODO: filter for name and role
          placeholder="Filter Name..."
          value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            return table.getColumn("user")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("createdAt") && (
          <DatePickerWithRange
            date={
              table.getColumn("createdAt")?.getFilterValue() as
                | DateRange
                | undefined
            }
            setDate={(date) => {
              table.getColumn("createdAt")?.setFilterValue(date);
            }}
          />
        )}
        {table.getColumn("onBoarded") &&
          (console.log(
            "table.getColumn('onBoarded')",
            table.getColumn("onBoarded"),
          ),
          (
            <DataTableFacetedFilter
              column={table.getColumn("onBoarded")}
              title="On boarded"
              options={onBoardedMap}
            />
          ))}
        {table.getColumn("priorityCallSheduled") &&
          (console.log(
            "table.getColumn('priorityCallSheduled')",
            table.getColumn("priorityCallSheduled"),
          ),
          (
            <DataTableFacetedFilter
              column={table.getColumn("priorityCallSheduled")}
              title="Priority Call Scheduled"
              options={onBoardedMap}
            />
          ))}
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
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => exportToCSV(table)}
          className="h-8"
        >
          Export to CSV
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

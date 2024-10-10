"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import { onBoardedMap, userRolesMap } from "@/lib/constants";

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
          // TODO: filter for name and role
          placeholder="Filter Name..."
          value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            return table.getColumn("user")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
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
      <DataTableViewOptions table={table} />
    </div>
  );
}

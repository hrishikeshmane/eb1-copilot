import { Table } from "@tanstack/react-table"
import { Trash } from 'lucide-react'

import { Button } from "@/components/ui/button"

interface DataTableSelectedRowsActionsProps<TData> {
  table: Table<TData>
}

export function DataTableSelectedRowsActions<TData>({
  table,
}: DataTableSelectedRowsActionsProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          // Handle bulk delete action
          console.log("Deleting", selectedRows.length, "rows")
        }}
        disabled={selectedRows.length === 0}
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete {selectedRows.length} {selectedRows.length === 1 ? "Row" : "Rows"}
      </Button>
    </div>
  )
}


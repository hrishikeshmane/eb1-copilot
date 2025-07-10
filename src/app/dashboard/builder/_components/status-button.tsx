import React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ticketStatus } from "@/lib/constants";

type StatusButtonProps = {
  status: "backlog" | "todo" | "doing" | "review" | "done";
  setStatus: React.Dispatch<
    React.SetStateAction<"backlog" | "todo" | "doing" | "review" | "done">
  >;
  disabled: boolean;
};

const StatusButton = ({ status, setStatus, disabled }: StatusButtonProps) => {
  const [openStatusPopover, setOpenStatusPopover] = React.useState(false);

  const { user } = useUser();
  const userRole = user?.publicMetadata.role;

  // let selectTicketStatus: TicketStatus[];
  // if (userRole === "vendor") {
  //   selectTicketStatus = ticketStatus.filter((s) => s.value !== "done");
  // } else {
  //   selectTicketStatus = ticketStatus;
  // }
  const selectTicketStatus = ticketStatus;

  return (
    <div>
      <Popover
        modal={true}
        open={openStatusPopover}
        onOpenChange={setOpenStatusPopover}
      >
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            className="flex h-full w-full flex-wrap items-center justify-start gap-1 text-sm"
            size={"sm"}
            variant="ghost"
          >
            <div
              className={cn(
                "flex w-full flex-wrap gap-1 font-mono",
                selectTicketStatus.find((s) => s.value === status)?.css,
              )}
            >
              {selectTicketStatus.find((s) => s.value === status)?.lable ?? (
                <div className="flex gap-1 rounded-sm px-2 py-1 text-foreground">
                  <PlusIcon className="" />
                  Status
                </div>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="h-full max-h-full p-0"
          side="bottom"
          align="start"
        >
          <Command
            filter={(value, search) => {
              if (search && value) {
                const selectedStatus = selectTicketStatus.find(
                  (s) => s.value === value,
                );
                if (!selectedStatus) return 0;
                if (
                  selectedStatus.lable
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return 1;
                }
              }

              return 0;
            }}
          >
            <CommandInput placeholder="Select Ticket Status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {selectTicketStatus.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    className={cn("flex items-center gap-2", status.css)}
                    onSelect={() => {
                      setStatus(status.value);
                      setOpenStatusPopover(false);
                    }}
                  >
                    {status.lable}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StatusButton;

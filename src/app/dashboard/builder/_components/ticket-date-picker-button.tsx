"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TicektDatePickerProps = {
  ticketDueDate: Date | undefined;
  setTicketDueDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export function TicektDatePicker({
  ticketDueDate,
  setTicketDueDate,
}: TicektDatePickerProps) {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h-7 w-[240px] justify-start border-none py-0 text-left font-normal shadow-none",
            !ticketDueDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {ticketDueDate ? (
            format(ticketDueDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value) => {
            setTicketDueDate(addDays(new Date(), parseInt(value)));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
            <SelectItem value="14">In 2 weeks</SelectItem>
            <SelectItem value="30">In a month</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={ticketDueDate}
            onSelect={setTicketDueDate}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

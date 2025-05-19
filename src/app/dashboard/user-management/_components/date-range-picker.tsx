"use client";

import * as React from "react";
import {
  addDays,
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  const today = new Date();

  const quickSelectOptions = [
    {
      label: "Today",
      value: () => ({ from: today, to: today }),
    },
    {
      label: "Yesterday",
      value: () => ({ from: subDays(today, 1), to: subDays(today, 1) }),
    },
    {
      label: "This Week",
      value: () => ({ from: startOfWeek(today), to: endOfWeek(today) }),
    },
    {
      label: "Last Week",
      value: () => ({
        from: startOfWeek(subWeeks(today, 1)),
        to: endOfWeek(subWeeks(today, 1)),
      }),
    },
    {
      label: "This Month",
      value: () => ({ from: startOfMonth(today), to: endOfMonth(today) }),
    },
    {
      label: "Last Month",
      value: () => ({
        from: startOfMonth(subMonths(today, 1)),
        to: endOfMonth(subMonths(today, 1)),
      }),
    },
  ];

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "border-dashed text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <div className="border-r p-2">
              <div className="mb-2 text-sm font-medium">Quick Select</div>
              <div className="grid gap-1">
                {quickSelectOptions.map((option) => (
                  <Button
                    key={option.label}
                    variant="ghost"
                    className="h-8 justify-start text-left text-sm"
                    onClick={() => setDate(option.value())}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

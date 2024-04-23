import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import {
  BOOLEAN_RESPONSES,
  INTRESTED_IN,
  type intrestedInOptions,
  type BooleanOption,
  CURRENT_VISA_OPTIONS,
  currentVisaOptions,
  YEARS,
  INDUSTRY_TYPE,
} from "@/lib/constants";
import { type FormType } from "./form-utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type SubFormProps = {
  form: UseFormReturn<FormType>;
};

const CurrentStatusForm = ({ form }: SubFormProps) => {
  return (
    <ul className="mx-1 grid grid-cols-2 gap-4 lg:grid-cols-3">
      <li className="col-span-1">
        <FormField
          control={form.control}
          name="currentlyInUS"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Are you currently in the United States?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BOOLEAN_RESPONSES.map((option: BooleanOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="everBeenToUS"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Have you ever been to the U.S?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BOOLEAN_RESPONSES.map((option: BooleanOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="everAppliedForGreenCard"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Have you ever applied for a Green Card?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BOOLEAN_RESPONSES.map((option: BooleanOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      {/* <li className="col-span-1">
        <FormField
          control={form.control}
          name="everBeenJ1OrJ2"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>
                Have you EVER been a J-1 exchange visitor or a J-2 dependent?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BOOLEAN_RESPONSES.map((option: BooleanOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li> */}

      {/* <li className="col-span-1">
        <FormField
          control={form.control}
          name="haveCriminalRecord"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Do you have a criminal record? </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BOOLEAN_RESPONSES.map((option: BooleanOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li> */}

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="addFamilyMembers"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>
                Would you like to add any family members to your petition?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BOOLEAN_RESPONSES.map((option: BooleanOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="currentEmployerInUS"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>
                Do you have a current employer in the United States?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BOOLEAN_RESPONSES.map((option: BooleanOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="currentVisa"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>What is your current US Visa?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CURRENT_VISA_OPTIONS.map((option: currentVisaOptions) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="isStudent"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Are you a Student?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BOOLEAN_RESPONSES.map((option: BooleanOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>What year did/will you graduate?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="currentRole"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>What is your current role?</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="industryType"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>What Industry do you work in?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INDUSTRY_TYPE.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="priorityDateIfAny"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>
                What is your current priority date, if you have one?
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("2000-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="interestedIn"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>
                What type of Visa or Green Card are you interested in?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Response" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INTRESTED_IN.map((option: intrestedInOptions) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="fieldExpertIn"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Your field of expertise</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineering" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>
    </ul>
  );
};

export default CurrentStatusForm;

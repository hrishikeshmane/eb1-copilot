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
import { type FormType } from "../page";
import {
  BOOLEAN_RESPONSES,
  INTRESTED_IN,
  type intrestedInOptions,
  type BooleanOption,
  DESCRIBES_YOU,
  type describesYouOptions,
} from "@/lib/constants";

type SubFormProps = {
  form: UseFormReturn<FormType>;
};

const VisaPillarForm = ({ form }: SubFormProps) => {
  return (
    <ul className="mx-1 grid grid-cols-2  gap-4 lg:grid-cols-2">
      <li className="col-span-1">
        <FormField
          control={form.control}
          name="planToStartBusinessInUS"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Do you plan to start a business in the U.S.?
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
          name="bestDescribesYou"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How would you best describe yourself</FormLabel>
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
                    {DESCRIBES_YOU.map((option: describesYouOptions) => (
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
          name="haveAwards"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you or your own company received any national or
                international awards for excellence in the field?
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
          name="haveRaiseFunds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you ever taken part in fundraising for venture capital?{" "}
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
          name="haveParticipatedInIncubator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you or your company ever participated in a recognized
                startup incubator or accelerator?
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
          name="haveMembership"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Are you a member of any group or organization with a highly
                selective standard for admission?
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
          name="haveJudged"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you ever served as a judge or evaluator for any contest or
                competition?
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
          name="haveReviewed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you ever served as a reviewer for any professional
                publication, proceedings of a conference, or the like?
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
          name="havePress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you or your own company ever attracted any press attention
                for your work?
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
          name="haveAuthored"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you authored any articles in scholarly journals, major
                media or similar outlets?
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
          name="haveCriticalCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you ever been employed in a critical or essential capacity?
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
          name="havePatents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Are you a named inventor of any patents in the U.S. or abroad?
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
          name="haveContrubutionsToField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you made any significant contributions to your industry?
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
          name="haveHighCompensation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you earned a high compensation in the last five years, that
                could be evidenced?
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
          name="fieldExpertIn"
          render={({ field }) => (
            <FormItem>
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

export default VisaPillarForm;

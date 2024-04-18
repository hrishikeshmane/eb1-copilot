import React from "react";
import { type UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { type FormType } from "./form-utils";

type SubFormProps = {
  form: UseFormReturn<FormType>;
};

const GettingStartedForm = ({ form }: SubFormProps) => {
  return (
    <div className="mx-1 flex flex-col gap-3">
      <div className="flex flex-col gap-3 text-sm">
        <h3 className="text-lg font-bold">
          This form takes around 30 minutes to complete. You might need a strong
          cup of coffee for this.
        </h3>
        <p>
          The first step towards nailing our game plan is to understand
          everything that you already have going for you. All your work,
          achievements, strong points, leverage, etc.
        </p>
        <p>
          This exercise contains a series of detailed questions to help us get
          everything you already have down on paper, to understand where you
          stand. Sort of like a brain dump. This is purely for a deep initial
          evaluation, so don’t worry about being very formal in the way you put
          your thoughts down. Ideally draft them as bullet points.
        </p>
        <p>
          Also, while going down this list, you might feel that you have a good
          amount of these, or maybe very little of these. Do not arrive at
          conclusions about your eligibility. Try to be with an unbiased mind.
          Remember, the point here is to see everything you have till now so we
          can plan what you need to do next.
        </p>
        <p>
          You not having a lot of content for each question now does not mean
          you will not have it ever. Helping you build your profile
          strategically from where it is at, is in fact the intent.
        </p>
        <p>
          When answering the questions, please make sure you are very detailed
          in your responses. Also, when answering the questions, approach them
          from 2 angles:
        </p>
        <ol className="ml-4 font-semibold">
          <li> 1. What facts exist </li>
          <li>
            2. What all material or opinion-based evidence exists currently to
            support those facts
          </li>
        </ol>
        <p>
          You may have some facts, but you might just not have the evidence to
          prove that, and that’s okay for now. We want you to bring out
          everything. Later, we can focus on seeing how you can get material
          evidence to prove those facts.
        </p>
        <p>
          You might also see that a single fact or evidence might serve as an
          answer to multiple questions, across different requirement criteria of
          the EB-1A. That’s okay. Make sure you note and everything down, even
          if it is redundant. Also, do not limit yourself to work and evidence
          from the US. Apply this to every country you associated yourself with.
        </p>
      </div>
      <div className="col-span-full">
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-3 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I consent to the use of my details to receive information
                  about currently offered services and promotions.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default GettingStartedForm;

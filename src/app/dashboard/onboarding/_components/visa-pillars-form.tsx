import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { type UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import { type FormType } from "./form-utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";
import ScrollToTop from "@/components/elements/scroll-to-top";

type WatchFiledName =
  | "haveAwards"
  | "haveOriginalContribution"
  | "haveAuthored"
  | "haveJudged"
  | "havePress"
  | "haveMembership"
  | "haveCriticalCapacity"
  | "haveExhibited"
  | "haveHighCompensation"
  | "haveCommercialSuccess"
  | "haveVolunteeredOrLed"
  | "haveExpertLORSupport"
  | "haveYourSpace"
  | "haveWorkedWithPrevailingIssues";

type FieldName =
  | "awards"
  | "originalContribution"
  | "authored"
  | "judged"
  | "press"
  | "membership"
  | "criticalCapacity"
  | "exhibited"
  | "highCompensation"
  | "commercialSuccess"
  | "volunteeredOrLed"
  | "expertLORSupport"
  | "yourSpace"
  | "workedWithPrevailingIssues";

type CardInputFormProps = {
  form: UseFormReturn<FormType>;
  watchFieldName: WatchFiledName;
  fieldName: FieldName;
  addButtonLabel: string;
};

const MemoTextarea = React.memo(Textarea);
const MemoRadioGroupItem = React.memo(RadioGroupItem);

const CardInputForm = React.memo(
  ({ form, fieldName, watchFieldName, addButtonLabel }: CardInputFormProps) => {
    const watchField = useWatch({
      control: form.control,
      name: watchFieldName,
    });

    const arrayFileds = useFieldArray({
      control: form.control,
      name: fieldName,
    });

    return (
      <div className="mb-4">
        <div className="w-full max-w-4xl">
          {arrayFileds.fields.map((arrayElement, index) => {
            return (
              <div className="flex gap-2" key={arrayElement.id}>
                <FormField
                  control={form.control}
                  name={`${fieldName}.${index}.title`}
                  render={({ field }) =>
                    watchField === "yes" ? (
                      <FormItem className="flex h-full w-1/2 flex-col justify-between">
                        <FormLabel>{`${addButtonLabel} Title`}</FormLabel>
                        <FormControl>
                          <MemoTextarea
                            {...field}
                            placeholder="Write a short title here"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    ) : (
                      <></>
                    )
                  }
                />

                <FormField
                  control={form.control}
                  name={`${fieldName}.${index}.detail`}
                  render={({ field }) =>
                    watchField === "yes" ? (
                      <FormItem className="flex h-full w-1/2 flex-col justify-between">
                        <FormLabel>{`${addButtonLabel} Detail`}</FormLabel>
                        <FormControl>
                          <MemoTextarea
                            {...field}
                            placeholder="Write a detailed description here"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    ) : (
                      <></>
                    )
                  }
                />

                {watchField === "yes" && (
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    className="mt-6"
                    onClick={() => arrayFileds.remove(index)}
                  >
                    <TrashIcon />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        {watchField === "yes" && (
          <Button
            className="w-full max-w-4xl"
            variant={"secondary"}
            onClick={() =>
              arrayFileds.append({ id: nanoid(), title: "", detail: "" })
            }
          >
            {`+ Add ${addButtonLabel}`}
          </Button>
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.form.formState.isDirty === nextProps.form.formState.isDirty,
);

CardInputForm.displayName = "CardInputForm";

type SubFormProps = {
  form: UseFormReturn<FormType>;
};

const VisaPillarForm = ({ form }: SubFormProps) => {
  const onNoResponse = (fieldName: FieldName) => {
    console.log("onNoResponse", fieldName);
    // when user selects no after slelecting yes, set the fields to undefined
    // Example: if user selects yes for haveAwards, then select no, then the fields for awards will be set to undefined
    form.setValue(fieldName, undefined);
  };

  return (
    <ol className="mx-1 grid grid-cols-1 gap-3 text-sm">
      <ScrollToTop />
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">Awards for excellence</h3>
          <p>
            List all the awards you have won so far, and what you have to prove
            them (certificates, press coverage, etc.). Include every award you
            have won since college/undergrad, and what those awards are for.
            Also, describe more about each of the awards, which organization
            gave them, and talk about how many other people have competed and
            won them. Also, talk about the caliber and profile of the other
            people who won those awards.
          </p>
          <p>A few points to think around are:</p>
          <ol className="ml-4 list-disc">
            <li>The criteria used to give the prizes or awards.</li>
            <li>
              National or international media coverage of prizes or awards
            </li>
            <li>How many prizes or awards are awarded each year?</li>
            <li>
              The reputation of the organization granting the prizes or awards
            </li>
            <li>
              Who is considered for the prizes or awards, including the
              geographic scope from which candidates may apply?
            </li>
            <li>Previous winners</li>
            <li>
              How prizes or awards are given for excellence in your field.
            </li>
          </ol>
          <p>Some evidence types can be:</p>
          <ol className="ml-4 list-disc">
            <li>A copy of each prize or award certificate.</li>
            <li>
              A copy of each prize or award certificate, A clear photograph of
              each prize or award.
            </li>
            <li>
              A public announcement regarding the awarding of the prizes or
              awards issued by the grating organization.
            </li>
          </ol>
          <div className="space-y-2 font-semibold">
            <p>
              Any scholarships, fellowships, or competitive assistantships that
              you ever got?
            </p>
            <p>
              Any public or private grants that you or your immediate
              lab/organization ever got? It can be for research, or otherwise.
            </p>
            <p>
              Any public recognition or government award you won from any
              government? Is it for science, technology, invention, business,
              education excellence, etc.?
            </p>
            <p>
              Any best paper award in any conference or event? Any patents that
              got awarded to you? Do you have any patent review documents and
              application documents to prove it?
            </p>
            <p>
              (Note that you might be able to present patent awards to
              supplement your list of awards, but you cannot rely on patents
              alone to qualify as evidence towards the awards criteria)
            </p>
            <p>
              Anything else that is comparable, but not covered above that you
              think might help?
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveAwards"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you or your own company received any national or
                  international awards for excellence?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("awards")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            fieldName="awards"
            watchFieldName="haveAwards"
            addButtonLabel="Award"
          />
        </div>
      </li>

      {/* Original Contribution */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">Original Contributions</h3>
          <div className="space-y-2 font-semibold">
            <p>
              Do you have any original work (at all) that you published? Where
              did they get published? Also, what recognition and widespread
              commentary did those attract?
            </p>
            <p>
              Did you do any work at your workplace that not only impacted the
              workplace, but an entire field (even outside that organization or
              company)? Be creative and think hard of anything.
            </p>
            <p>
              Do you have patents? What is the application of this patent, and
              how is it significant? What value does it fetch the overall field,
              or the business? Do you have evidence of other people who are
              already using it?
            </p>
            <p>
              Do you have any non-patented inventions? Same follow up questions
              as above, and what evidence do you think is necessary to show that
              the inventions are your own?
            </p>
            <p>
              Is there a tool, or process, or something that you developed at
              work that was useful and implemented across the company?
            </p>
            <p>
              If you have a thesis document, do you know the impact your thesis
              had in your space? Do you have people (experts) that can provide
              you with supporting letters that strongly argue that your research
              work was impactful?
            </p>
            <p>
              Anything else big or small you can think of that can be used to
              argue that you did something that was impactful to a lot of people
              and/or the entire field?
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveOriginalContribution"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you made any significant contributions to your field or
                  workplace that had a substantial impact, such as published
                  works, patents, inventions, or impactful research?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("originalContribution")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            fieldName="originalContribution"
            watchFieldName="haveOriginalContribution"
            addButtonLabel="Original Contribution"
          />
        </div>
      </li>

      {/* Original Authorship */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">Original Authorship</h3>
          <div className="space-y-2 font-semibold">
            <p>
              Have you published any articles in Scholarly journals? In what
              journals? Dig up the citation count, details about how “major” the
              journal is, and all other details.
            </p>
            <p>
              Have you published any articles in Trade journals? In what
              journals? Dig up the citation count, details about how “major” the
              journal is, and all other details.
            </p>
            <p>
              Have you published any articles anywhere else? White papers, blog
              posts, internal company publications, etc. Anything else at all
              that is useful for other learned people in your field? Please
              provide a detailed explanation.
            </p>
            <p>
              Have you produced any literature like a product manual, or a
              troubleshooting guide, etc., that has been downloaded several
              times, and/or been extremely useful to a large number of people
              within your company, or a large number of clients?
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveAuthored"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you authored any articles in scholarly journals, major
                  media or similar outlets?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("authored")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveAuthored"
            fieldName="authored"
            addButtonLabel="Original Authorship"
          />
        </div>
      </li>

      {/* Judging the work of Peers */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">Judging the work of Peers</h3>
          <div className="space-y-2 font-semibold">
            <p>
              Have you ever reviewed any literature as a peer before the
              publication of it in a journal or conference? Please explain them
              in detail.
            </p>
            <p>
              Have you ever been on the editorial team or an editor of any
              outlet (company internal or external, or company independent),
              where you had to review the work of peers? Please explain
              everything you did.
            </p>
            <p>
              Have you ever been a moderator of any discussion panel, or in a
              conference? Please explain everything you did.
            </p>
            <p>
              Have you served on the thesis review panel of a Master’s or PhD
              student?
            </p>
            <p>
              Were you in a position where you had to do a review of a peer’s or
              multiple peers’ work at your workplace (code reviews, design
              reviews etc.), with that responsibility not being a part of your
              day-to-day job (E.g., Teacher grading papers does not count)?
            </p>
            <p>
              Did you serve any other role where you had to review the work of
              other peers in any other sense, however tiny it is?
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveJudged"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you ever served as a judge or evaluator for any contest
                  or competition OR have you ever served as a reviewer for any
                  professional publication, proceedings of a conference, or the
                  like?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("judged")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveJudged"
            fieldName="judged"
            addButtonLabel="Judging"
          />
        </div>
      </li>

      {/* Media Coverage */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">Media Coverage</h3>
          <div className="space-y-2 font-semibold">
            <p>
              Has there been any press coverage about you and/or your work at
              all? Please explain in detail where all.
            </p>
            <p>
              Have you been featured in any news, TV shows, podcasts, broadcasts
              etc.? Please explain in detail.
            </p>
            <p>
              Was there any instance and/or evidence of other people talking and
              praising your work? Please explain in detail.
            </p>
            <p>
              Is there press coverage about any particular product that you are
              working on or have worked on? Please explain in detail. Also, note
              if there is any mention of you on the press item?
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="havePress"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you or your own company ever attracted any press
                  attention for your work?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("press")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="havePress"
            fieldName="press"
            addButtonLabel="Media Coverage"
          />
        </div>
      </li>

      {/* Memberships in Elite Associations */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">
            Memberships in Elite Associations
          </h3>
          <div className="space-y-2 font-semibold">
            <p>
              Are you a member of any association in your trade or specialty?
              What are the qualifications needed to gain entry into those
              associations? Who are the other people in those associations?
              Please explain in detail.
            </p>
            <p>
              Are you part of a business incubator, or any other organization
              where the entry is limited to a few people who are carefully
              selected to be a part of it? Please explain in detail.
            </p>
            <p>
              Have you been part of any association where entry might not be
              super restricted to extremely qualified people, but you have risen
              the ranks to the board of the association, and are playing an
              important role?
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveMembership"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Are you a member of any group or organization with a highly
                  selective standard for admission?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("membership")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveMembership"
            fieldName="membership"
            addButtonLabel="Membership"
          />
        </div>
      </li>

      {/* Critical Role */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">Critical Role</h3>
          <div className="space-y-2 font-semibold">
            <p>
              Please describe what you do at work, and in your past workplaces,
              in detail. Tell us the story of your career.
            </p>
            <p>
              Are you in a management or leadership position in your
              organization, directly or indirectly? What do you do? Explain in
              detail the end impact of the people who report to you.
            </p>
            <p>
              Whether you are in a management position or not, how does your
              work tie into a critical aspect of your employer or company’s
              success?
            </p>
            <p>
              Do you manage a budget of millions of Dollars? Or does any work
              that you or a team you managed did produce a large financial
              impact on your organization or company? Please explain in detail.
            </p>
            <p>
              Is there any press or documentation that speaks to some technical
              or commercial success of a product or service of your company?
              Also mention if that makes a mention of you.
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveCriticalCapacity"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you ever been employed in a critical or essential
                  capacity?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("criticalCapacity")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveCriticalCapacity"
            fieldName="criticalCapacity"
            addButtonLabel="Critical Role"
          />
        </div>
      </li>

      {/* Exhibitions and Showcases */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">Exhibitions and Showcases</h3>
          <div className="space-y-2 font-semibold">
            <p>
              Have you been invited to or presented your work at any
              conferences, exhibitions, expos? Please provide details of that
              event and the reception of your display, in detail.
            </p>
            <p>
              Have you been invited to speak, guest lecture, or as a resource
              person in any event?
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveExhibited"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you ever been invited to give a talk, lecture,
                  conferences, exhibitions, expos?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("exhibited")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveExhibited"
            fieldName="exhibited"
            addButtonLabel="Exhibition OR Showcase"
          />
        </div>
      </li>

      {/* High Remuneration */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">High Remuneration</h3>
          <div className="space-y-2 font-semibold">
            <p>
              What is your annual remuneration? Please detail out all aspects of
              it, i.e., was it a contract or a full-time role? Outline the
              components of it, i.e., base salary, RSU, bonus, benefits etc.
            </p>
            <p>
              How does your salary compare to overall geographical statistics
              for people in a similar craft? (we will work this out with you
              anyway, but would like to get an initial unbiased understanding
              from you)
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveHighCompensation"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you earned a high compensation in the last five years,
                  that could be evidenced?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("highCompensation")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveHighCompensation"
            fieldName="highCompensation"
            addButtonLabel="High Remuneration"
          />
        </div>
      </li>

      {/* Commercial Success */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">Commercial Success</h3>
          <div className="space-y-2 font-semibold">
            <p>
              Is there any creation of yours, or a product that you were a
              critical part of building that saw a large number of sales, press,
              praise, downloads, usage or any possible indicators of commercial
              success? Please discuss in detail.
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveCommercialSuccess"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you earned a high compensation in the last five years,
                  that could be evidenced?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("commercialSuccess")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveCommercialSuccess"
            fieldName="commercialSuccess"
            addButtonLabel="Commercial Success"
          />
        </div>
      </li>

      {/* Miscellaneous */}
      <li>
        <div className="mb-4 flex flex-col gap-3 text-sm">
          <h3 className="text-lg font-bold">Miscellaneous</h3>
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveVolunteeredOrLed"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Have you volunteered as a lead or major participant for a
                  charity organization, government organization, or made any
                  public service announcements (Letters from the organizations,
                  press, internet, etc.)? What was your title, performance, and
                  duties?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("volunteeredOrLed")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveVolunteeredOrLed"
            fieldName="volunteeredOrLed"
            addButtonLabel=""
          />
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveExpertLORSupport"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Who are the experts in your field that you think can write
                  strong letters of recommendation / support for you? Try to
                  think for people that are arguably the best in your narrow
                  niche field. They could be people that you worked with, or
                  people don’t know you personally, but are familiar with your
                  work and its impact. Explain in detail their qualifications
                  and achievements as well that can be used to argue that they
                  are considered experts in your field, and what they will be
                  able to talk about you, and preferably link their LinkedIn URL
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("expertLORSupport")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveExpertLORSupport"
            fieldName="expertLORSupport"
            addButtonLabel=""
          />
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveYourSpace"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Is there any place where you are already showing a lot of
                  thought leadership in your space? I.e., YouTube, LinkedIn,
                  Blog, etc.
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() => onNoResponse("yourSpace")}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveYourSpace"
            fieldName="yourSpace"
            addButtonLabel=""
          />
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="haveWorkedWithPrevailingIssues"
            render={({ field }) => (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Does any part of your work directly or indirectly resonate
                  with prevailing issues of popular attention currently, such as
                  global warming, housing, data privacy, cybersecurity,
                  pandemic, supply chain, gender issues, etc.?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1 "
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <MemoRadioGroupItem
                          value="no"
                          onClick={() =>
                            onNoResponse("workedWithPrevailingIssues")
                          }
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardInputForm
            form={form}
            watchFieldName="haveWorkedWithPrevailingIssues"
            fieldName="workedWithPrevailingIssues"
            addButtonLabel=""
          />
        </div>
      </li>
    </ol>
  );
};

export default VisaPillarForm;

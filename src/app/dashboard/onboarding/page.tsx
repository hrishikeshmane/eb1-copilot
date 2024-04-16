"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PersonalInfoForm from "./_components/personal-info-form";
import FormWrapper from "./_components/from-wrapper";
import CurrentStatusForm from "./_components/current-status-form";
import VisaPillarForm from "./_components/visa-pillars-form";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import GettingStartedForm from "./_components/getting-started-form";
import useFormPersist from "react-hook-form-persist";
import { auth } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const formSchema = z.object({
  // Getting started
  consent: z.boolean(),

  // Personal Information
  fullName: z.string().min(2, {
    message: "Full Name is required.",
  }),
  email: z
    .string()
    .min(2, {
      message: "Email is required.",
    })
    .email(),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  linkedIn: z.string().url(),
  highestEducation: z.enum(
    ["phd", "masters", "bachelors", "noDegree", "other"],
    {
      errorMap: () => ({ message: "Select an option" }),
    },
  ),
  major: z.string().min(2, {
    message: "Your Major is required.",
  }),
  brithCountry: z.string().min(2, {
    message: "Your Birth Country is required.",
  }),
  nationalityCountry: z.string().min(2, {
    message: "Your National Country is required.",
  }),
  hearAboutUs: z.enum(["socialMedia", "friend", "onlineSearch", "other"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  // resume: z
  //   .instanceof(File)
  //   .refine((file) => {
  //     return !file || file?.size <= MAX_UPLOAD_SIZE;
  //   }, "File size must be less than 6MB")
  //   .refine((file) => {
  //     return ACCEPTED_FILE_TYPES.includes(file?.type);
  //   }, "File must be a PDF"),

  // Current Status
  currentlyInUS: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  everBeenToUS: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  everAppliedForGreenCard: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  everBeenJ1OrJ2: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveCriminalRecord: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  addFamilyMembers: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  currentEmployerInUS: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  interestedIn: z.enum(["o1A", "o1b", "eb1a", "notSure", "other"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  fieldExpertIn: z.string().min(2, {
    message: "Your field of expertise is required.",
  }),

  // Visa Pillars
  haveAwards: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  awardDetails: z.string().optional(),

  haveOriginalContribution: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  originalContributionDetails: z.string().optional(),

  haveAuthored: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  authoredDetails: z.string().optional(),

  haveJudged: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  judgedDetails: z.string().optional(),

  havePress: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  pressDetails: z.string().optional(),

  haveMembership: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  membershipDetails: z.string().optional(),

  haveCriticalCapacity: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  criticalCapacityDetails: z.string().optional(),

  haveExhibited: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  exhibitedDetails: z.string().optional(),

  haveHighCompensation: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  highCompensationDetails: z.string().optional(),

  haveCommercialSuccess: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  commercialSuccessDetails: z.string().optional(),

  haveVolunteeredOrLed: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  volunteeredOrLedDetails: z.string().optional(),

  haveExpertLORSupport: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  expertLORSupportDetails: z.string().optional(),

  haveYourSpace: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  yourSpaceDetails: z.string().optional(),

  haveWorkedWithPrevailingIssues: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  workedWithPrevailingIssuesDetails: z.string().optional(),
});

export type FormType = z.infer<typeof formSchema>;
export type FormFileds = keyof FormType;

type Step = {
  id: string;
  name: string;
  fields: FormFileds[] | [];
};

const steps: Step[] = [
  {
    id: "Step 1",
    name: "Getting Started",
    fields: ["consent"],
  },
  {
    id: "Step 2",
    name: "Personal Information",
    fields: [
      "fullName",
      "email",
      "phone",
      "linkedIn",
      // "resume",
      "highestEducation",
      "major",
      "brithCountry",
      "nationalityCountry",
      "hearAboutUs",
    ],
  },
  {
    id: "Step 3",
    name: "Current Status",
    fields: [
      "currentlyInUS",
      "everBeenToUS",
      "everAppliedForGreenCard",
      "everBeenJ1OrJ2",
      "haveCriminalRecord",
      "addFamilyMembers",
      "currentEmployerInUS",
      "interestedIn",
      "fieldExpertIn",
    ],
  },
  {
    id: "Step 4",
    name: "Visa Pillars",
    fields: [
      "haveAwards",
      "awardDetails",
      "haveOriginalContribution",
      "originalContributionDetails",
      "haveAuthored",
      "authoredDetails",
      "haveJudged",
      "judgedDetails",
      "havePress",
      "pressDetails",
      "haveMembership",
      "membershipDetails",
      "haveCriticalCapacity",
      "criticalCapacityDetails",
      "haveExhibited",
      "exhibitedDetails",
      "haveHighCompensation",
      "highCompensationDetails",
      "haveCommercialSuccess",
      "commercialSuccessDetails",
      "haveVolunteeredOrLed",
      "volunteeredOrLedDetails",
      "haveExpertLORSupport",
      "expertLORSupportDetails",
      "haveYourSpace",
      "yourSpaceDetails",
      "haveWorkedWithPrevailingIssues",
      "workedWithPrevailingIssuesDetails",
    ],
  },
  { id: "Step 5", name: "Complete", fields: [] },
];

const OnboardingPage = () => {
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => console.log(e.data.payload),
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Getting started
      consent: undefined,

      //  Personal Information
      fullName: "",
      email: "",
      phone: "",
      linkedIn: "" as FormType["linkedIn"],
      highestEducation: "" as FormType["highestEducation"],
      major: "" as FormType["major"],
      brithCountry: "" as FormType["brithCountry"],
      nationalityCountry: "" as FormType["nationalityCountry"],
      hearAboutUs: "" as FormType["hearAboutUs"],

      // Current Status
      currentlyInUS: "" as FormType["currentlyInUS"],
      everBeenToUS: "" as FormType["everBeenToUS"],
      everAppliedForGreenCard: "" as FormType["everAppliedForGreenCard"],
      everBeenJ1OrJ2: "" as FormType["everBeenJ1OrJ2"],
      haveCriminalRecord: "" as FormType["haveCriminalRecord"],
      addFamilyMembers: "" as FormType["addFamilyMembers"],
      currentEmployerInUS: "" as FormType["currentEmployerInUS"],
      interestedIn: "" as FormType["interestedIn"],
      fieldExpertIn: "" as FormType["fieldExpertIn"],

      // Visa Pillars
      haveAwards: "" as FormType["haveAwards"],
      awardDetails: "" as FormType["awardDetails"],
      haveOriginalContribution: "" as FormType["haveOriginalContribution"],
      originalContributionDetails:
        "" as FormType["originalContributionDetails"],
      haveAuthored: "" as FormType["haveAuthored"],
      authoredDetails: "" as FormType["authoredDetails"],
      haveJudged: "" as FormType["haveJudged"],
      judgedDetails: "" as FormType["judgedDetails"],
      havePress: "" as FormType["havePress"],
      pressDetails: "" as FormType["pressDetails"],
      haveMembership: "" as FormType["haveMembership"],
      membershipDetails: "" as FormType["membershipDetails"],
      haveCriticalCapacity: "" as FormType["haveCriticalCapacity"],
      criticalCapacityDetails: "" as FormType["criticalCapacityDetails"],
      haveExhibited: "" as FormType["haveExhibited"],
      exhibitedDetails: "" as FormType["exhibitedDetails"],
      haveHighCompensation: "" as FormType["haveHighCompensation"],
      highCompensationDetails: "" as FormType["highCompensationDetails"],
      haveCommercialSuccess: "" as FormType["haveCommercialSuccess"],
      commercialSuccessDetails: "" as FormType["commercialSuccessDetails"],
      haveVolunteeredOrLed: "" as FormType["haveVolunteeredOrLed"],
      volunteeredOrLedDetails: "" as FormType["volunteeredOrLedDetails"],
      haveExpertLORSupport: "" as FormType["haveExpertLORSupport"],
      expertLORSupportDetails: "" as FormType["expertLORSupportDetails"],
      haveYourSpace: "" as FormType["haveYourSpace"],
      yourSpaceDetails: "" as FormType["yourSpaceDetails"],
      haveWorkedWithPrevailingIssues:
        "" as FormType["haveWorkedWithPrevailingIssues"],
      workedWithPrevailingIssuesDetails:
        "" as FormType["workedWithPrevailingIssuesDetails"],

      // resume: new File([], ""),
      // planToStartBusinessInUS: "" as FormType["planToStartBusinessInUS"],
      // bestDescribesYou: "" as FormType["bestDescribesYou"],
      // haveRaiseFunds: "" as FormType["haveRaiseFunds"],
      // haveParticipatedInIncubator:
      //   "" as FormType["haveParticipatedInIncubator"],
      // haveMembership: "" as FormType["haveMembership"],
      // haveJudged: "" as FormType["haveJudged"],
      // haveReviewed: "" as FormType["haveReviewed"],
      // havePress: "" as FormType["havePress"],
      // haveAuthored: "" as FormType["haveAuthored"],
      // haveCriticalCapacity: "" as FormType["haveCriticalCapacity"],
      // havePatents: "" as FormType["havePatents"],
      // haveContrubutionsToField: "" as FormType["haveContrubutionsToField"],
      // haveHighCompensation: "" as FormType["haveHighCompensation"],
    },
  });

  useFormPersist("onboarding-form", {
    watch: form.watch,
    setValue: form.setValue,
  });

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(3);
  const delta = currentStep - previousStep;

  const processForm: SubmitHandler<FormType> = (data) => {
    console.log(data);
    form.reset();
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast("Your Response has been submitted.");
  }

  const next = async () => {
    const fields = steps[currentStep]?.fields;
    const output = await form.trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep === steps.length - 1) {
      await form.handleSubmit(processForm)();
    }
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <ScrollArea className="mx-auto h-full w-full overflow-x-hidden p-6 pb-0 pt-0">
      {/* steps */}
      <nav
        aria-label="Progress"
        className="sticky top-0 z-10 mb-6 border-b bg-background pb-6 pt-4"
      >
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-primary-foreground py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-bold">{step.id}</span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4  py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-bold text-muted-foreground transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {step.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <div className="mt-6 flex flex-col justify-items-stretch">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {currentStep === 0 && (
              <FormWrapper delta={delta}>
                <GettingStartedForm form={form} />
              </FormWrapper>
            )}

            {currentStep === 1 && (
              <FormWrapper delta={delta}>
                <PersonalInfoForm form={form} />
              </FormWrapper>
            )}

            {currentStep === 2 && (
              <FormWrapper delta={delta}>
                <CurrentStatusForm form={form} />
              </FormWrapper>
            )}

            {currentStep === 3 && (
              <FormWrapper delta={delta}>
                <VisaPillarForm form={form} />
              </FormWrapper>
            )}

            {currentStep === 4 && (
              <FormWrapper delta={delta}>
                {/* <InlineWidget
                  styles={{
                    height: "1000px",
                    margin: "-4rem 0px -5rem 0px",
                    padding: "0px",
                  }}
                  url="https://calendly.com/ihrishi/ama-w-hrishi"
                /> */}
                <div className="flex flex-col space-y-2">
                  <h3 className="text-lg font-bold">
                    You have completed the onboarding steps.
                  </h3>
                  <p className="text-sm">
                    Click Submit and we will reach out to you within 48hrs
                  </p>
                </div>
              </FormWrapper>
            )}

            <div className="my-4 mt-auto flex w-full justify-end gap-4 py-4">
              <Button
                type="button"
                variant={"secondary"}
                onClick={prev}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={next}
                // disabled={currentStep === steps.length - 1}
              >
                {currentStep < 4 ? "Next" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default OnboardingPage;

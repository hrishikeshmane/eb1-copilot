"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import PersonalInfoForm from "./_component/personal-info-form";
import FormWrapper from "./_component/from-wrapper";
import CurrentStatusForm from "./_component/current-status-form";
import VisaPillarForm from "./_component/visa-pillars-form";

const formSchema = z.object({
  consent: z.boolean(),
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
  resume: z
    .instanceof(File)
    .refine((file) => {
      return !file || file?.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 6MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file?.type);
    }, "File must be a PDF"),

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

  planToStartBusinessInUS: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  bestDescribesYou: z.enum(["expert", "entrepreneur"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveAwards: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveRaiseFunds: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveParticipatedInIncubator: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveMembership: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveJudged: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveReviewed: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  havePress: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveAuthored: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveCriticalCapacity: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  havePatents: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveContrubutionsToField: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  haveHighCompensation: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
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
    name: "Personal Information",
    fields: [
      "consent",
      "fullName",
      "email",
      "phone",
      "hearAboutUs",
      "resume",
      "highestEducation",
      "major",
      "brithCountry",
      "nationalityCountry",
      "linkedIn",
    ],
  },
  {
    id: "Step 2",
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
    id: "Step 3",
    name: "Visa Pillars",
    fields: [
      "planToStartBusinessInUS",
      "bestDescribesYou",
      "haveAwards",
      "haveRaiseFunds",
      "haveParticipatedInIncubator",
      "haveMembership",
      "haveJudged",
      "haveReviewed",
      "havePress",
      "haveAuthored",
      "haveCriticalCapacity",
      "havePatents",
      "haveContrubutionsToField",
      "haveHighCompensation",
    ],
  },
  { id: "Step 4", name: "Complete", fields: [] },
];

const OnboardingPage = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: undefined,
      fullName: "",
      email: "",
      phone: "",
      hearAboutUs: "" as FormType["hearAboutUs"],
      interestedIn: "" as FormType["interestedIn"],
      fieldExpertIn: "" as FormType["fieldExpertIn"],
      linkedIn: "" as FormType["linkedIn"],
      resume: new File([], ""),
      highestEducation: "" as FormType["highestEducation"],
      major: "" as FormType["major"],
      brithCountry: "" as FormType["brithCountry"],
      nationalityCountry: "" as FormType["nationalityCountry"],
      currentlyInUS: "" as FormType["currentlyInUS"],
      everBeenToUS: "" as FormType["everBeenToUS"],
      everAppliedForGreenCard: "" as FormType["everAppliedForGreenCard"],
      everBeenJ1OrJ2: "" as FormType["everBeenJ1OrJ2"],
      haveCriminalRecord: "" as FormType["haveCriminalRecord"],
      addFamilyMembers: "" as FormType["addFamilyMembers"],
      currentEmployerInUS: "" as FormType["currentEmployerInUS"],
      planToStartBusinessInUS: "" as FormType["planToStartBusinessInUS"],
      bestDescribesYou: "" as FormType["bestDescribesYou"],
      haveAwards: "" as FormType["haveAwards"],
      haveRaiseFunds: "" as FormType["haveRaiseFunds"],
      haveParticipatedInIncubator:
        "" as FormType["haveParticipatedInIncubator"],
      haveMembership: "" as FormType["haveMembership"],
      haveJudged: "" as FormType["haveJudged"],
      haveReviewed: "" as FormType["haveReviewed"],
      havePress: "" as FormType["havePress"],
      haveAuthored: "" as FormType["haveAuthored"],
      haveCriticalCapacity: "" as FormType["haveCriticalCapacity"],
      havePatents: "" as FormType["havePatents"],
      haveContrubutionsToField: "" as FormType["haveContrubutionsToField"],
      haveHighCompensation: "" as FormType["haveHighCompensation"],
    },
  });

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const processForm: SubmitHandler<FormType> = (data) => {
    console.log(data);
    form.reset();
  };

  const next = async () => {
    const fields = steps[currentStep]?.fields;
    const output = await form.trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <ScrollArea className="mx-2 h-full p-6">
      {/* steps */}
      <nav aria-label="Progress" className="mb-12">
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

      <Separator />

      {/* Form */}
      <div className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {currentStep === 0 && (
              <FormWrapper delta={delta}>
                <PersonalInfoForm form={form} />
              </FormWrapper>
            )}

            {currentStep === 1 && (
              <FormWrapper delta={delta}>
                <CurrentStatusForm form={form} />
              </FormWrapper>
            )}

            {currentStep === 2 && (
              <FormWrapper delta={delta}>
                <VisaPillarForm form={form} />
              </FormWrapper>
            )}

            {currentStep === 3 && (
              <FormWrapper delta={delta}>
                <CurrentStatusForm form={form} />
              </FormWrapper>
            )}

            <div className="mt-4 flex w-full justify-end gap-2">
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
                disabled={currentStep === steps.length - 1}
              >
                {currentStep < 3 ? "Next" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default OnboardingPage;

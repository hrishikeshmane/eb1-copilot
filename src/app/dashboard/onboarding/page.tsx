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
import { api } from "@/trpc/react";
import {
  type Step,
  steps,
  formSchema,
  FormType,
  FormFileds,
} from "./_components/form-utils";

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
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const addUserMutaion = api.userDetails.addUser.useMutation({
    onSuccess: () => {
      toast.success("Your Response has been submitted.");
      // await clerkClient.users.updateUserMetadata(userId, {
      //   publicMetadata:{
      //     "example": "metadata"
      //   }
      // });
    },
    onError: (error) => {
      toast.error("An error occured- " + error.message);
      console.error("Error submitting onboarding form", error);
    },
  });

  const processForm: SubmitHandler<FormType> = async (data) => {
    // TODO: Add logic to see if everything in each form step is validated
    const msg = await addUserMutaion.mutate({ formData: data });
    console.log("msg", msg);
  };

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
        className="top-0 z-10 mb-6 border-b bg-background pb-6 pt-4 sm:sticky"
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
          <form onSubmit={form.handleSubmit(processForm)}>
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

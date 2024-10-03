"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PersonalInfoForm from "./_components/personal-info-form";
import FormWrapper from "./_components/from-wrapper";
import CurrentStatusForm from "./_components/current-status-form";
import VisaPillarForm from "./_components/visa-pillars-form";
import {
  InlineWidget,
  PopupButton,
  useCalendlyEventListener,
} from "react-calendly";
import GettingStartedForm from "./_components/getting-started-form";
import useFormPersist from "react-hook-form-persist";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { steps, formSchema, type FormType } from "./_components/form-utils";
import { useUser } from "@clerk/nextjs";
import { DevTool } from "@hookform/devtools";
import UserInfoDetails from "./_components/user-info-details";
import Loader from "@/components/elements/loader";
import ScrollToTop from "@/components/elements/scroll-to-top";
import { useLogger } from "next-axiom";

//TODO: make this server component and move form page to a new client component
const OnboardingPage = () => {
  //For calendly
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      if (e.data.event === "calendly.event_scheduled") {
        fetchEventDetails(e.data.payload.event.uri);
      }
    },
  });
  const [scheduledDateTime, setScheduledDateTime] =
    useState<ScheduledDateTime | null>(null);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const fetchEventDetails = async (eventUri: string): Promise<void> => {
    try {
      // You need to replace 'YOUR_CALENDLY_API_TOKEN' with your actual Calendly API token
      const response = await fetch(eventUri, {
        method: "GET",
        headers: {
          Authorization: "Bearer YOUR_CALENDLY_API_TOKEN",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { start_time, end_time } = data.resource;
      setScheduledDateTime({ start_time, end_time });
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useEffect(() => {
    // Wait for the component to be mounted before setting the rootElement
    if (typeof window !== "undefined") {
      setRootElement(document.getElementById("__next"));
    }
  }, []);

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
      resumeUrl: undefined,

      // Current Status
      currentlyInUS: "" as FormType["currentlyInUS"],
      everBeenToUS: "" as FormType["everBeenToUS"],
      everAppliedForGreenCard: "" as FormType["everAppliedForGreenCard"],
      addFamilyMembers: "" as FormType["addFamilyMembers"],
      currentEmployerInUS: "" as FormType["currentEmployerInUS"],
      currentVisa: "" as FormType["currentVisa"],
      interestedIn: "" as FormType["interestedIn"],
      isStudent: "" as FormType["isStudent"],
      graduationYear: "" as FormType["graduationYear"],
      currentRole: "" as FormType["currentRole"],
      industryType: "" as FormType["industryType"],
      priorityDateIfAny: undefined,
      fieldExpertIn: "" as FormType["fieldExpertIn"],

      // Visa Pillars
      haveAwards: "" as FormType["haveAwards"],
      awards: undefined,
      // awardDetails: "" as FormType["awardDetails"],

      haveOriginalContribution: "" as FormType["haveOriginalContribution"],
      originalContribution: undefined,
      // originalContributionDetails:
      // "" as FormType["originalContributionDetails"],

      haveAuthored: "" as FormType["haveAuthored"],
      authored: undefined,
      // authoredDetails: "" as FormType["authoredDetails"],

      haveJudged: "" as FormType["haveJudged"],
      judged: undefined,
      // judgedDetails: "" as FormType["judgedDetails"],

      havePress: "" as FormType["havePress"],
      press: undefined,
      // pressDetails: "" as FormType["pressDetails"],

      haveMembership: "" as FormType["haveMembership"],
      membership: undefined,
      // membershipDetails: "" as FormType["membershipDetails"],

      haveCriticalCapacity: "" as FormType["haveCriticalCapacity"],
      criticalCapacity: undefined,
      // criticalCapacityDetails: "" as FormType["criticalCapacityDetails"],

      haveExhibited: "" as FormType["haveExhibited"],
      exhibited: undefined,
      // exhibitedDetails: "" as FormType["exhibitedDetails"],

      haveHighCompensation: "" as FormType["haveHighCompensation"],
      highCompensation: undefined,
      // highCompensationDetails: "" as FormType["highCompensationDetails"],

      haveCommercialSuccess: "" as FormType["haveCommercialSuccess"],
      commercialSuccess: undefined,
      // commercialSuccessDetails: "" as FormType["commercialSuccessDetails"],

      haveVolunteeredOrLed: "" as FormType["haveVolunteeredOrLed"],
      volunteeredOrLed: undefined,
      // volunteeredOrLedDetails: "" as FormType["volunteeredOrLedDetails"],

      haveExpertLORSupport: "" as FormType["haveExpertLORSupport"],
      expertLORSupport: undefined,
      // expertLORSupportDetails: "" as FormType["expertLORSupportDetails"],

      haveYourSpace: "" as FormType["haveYourSpace"],
      yourSpace: undefined,
      // yourSpaceDetails: "" as FormType["yourSpaceDetails"],

      haveWorkedWithPrevailingIssues:
        "" as FormType["haveWorkedWithPrevailingIssues"],
      workedWithPrevailingIssues: undefined,
      // workedWithPrevailingIssuesDetails:
      // "" as FormType["workedWithPrevailingIssuesDetails"],
    },
  });

  const { user, isLoaded } = useUser();
  const log = useLogger().with({ userId: user?.id });

  // useFormPersist("onboarding-form", {
  //   watch: form.watch,
  //   setValue: form.setValue,
  // });

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const router = useRouter();
  const addUserMutaion = api.userDetails.addUser.useMutation({
    onSuccess: () => {
      setIsSubmitting(false);
      toast.success("Your Response has been submitted.");
      // router.push("/dashboard/profile");
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast.error("An error occured- " + error.message, { duration: 30000 });
      console.error("Error submitting onboarding form", error);
      log.error("Error submitting onboarding form", {
        message: error.message,
        error: error,
        data: form.getValues(),
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const processForm: SubmitHandler<FormType> = (data, errors) => {
    console.log("data", data);
    console.log("errors", errors);
    // TODO: Add logic to see if everything in each form step is validated

    const msg = addUserMutaion.mutate({ formData: data });
    console.log("msg", msg);
  };

  const next = async () => {
    const fields = steps[currentStep]?.fields;
    const output = await form.trigger(fields, { shouldFocus: true });

    console.log("formErrors", form.formState.errors);
    if (!output) {
      toast.error(
        "Please complete the form with valid response before proceeding.",
      );
      return;
    }

    if (currentStep === steps.length - 1) {
      setIsSubmitting(true);
      toast.info("Submitting your response...");
      await form.handleSubmit(processForm, (errors) =>
        console.log("handleSubmitError", errors),
      )();
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

  const userMetadata =
    user?.publicMetadata as CustomJwtSessionClaims["metadata"];
  const onBoarded = userMetadata?.onBoarded;

  if (!isLoaded) {
    return <Loader className="p-4" />;
  }

  if (onBoarded) {
    return <UserInfoDetails></UserInfoDetails>;
  }

  return (
    // <div>
    //   <h1> This page is under maintenance. Please come back later</h1>
    // </div>
    <ScrollArea className="mx-auto h-full w-full overflow-x-hidden p-6 pb-0 pt-0">
      {/* steps */}
      <nav
        aria-label="Progress"
        className="top-0 z-10 mb-6 border-b pb-6 pt-4 md:sticky"
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
      {/*  TODO: only display if not onbarded */}
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
                <ScrollToTop />
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
                    You have completed the onboarding form.
                  </h3>
                  <p className="text-sm">
                    Click submt to submit your responses
                  </p>
                  {/* <p className="text-sm">
                    Schedule a call with our team and click Submit.
                  </p> */}
                  <div className="h-full scale-90 overflow-hidden">
                    {/* <PopupButton
                      className="rounded-md bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                      url="https://calendly.com/ihrishi/ama-w-hrishi"
                      rootElement={rootElement || document.body}
                      text="Schedule Appointment" 
                    />*/}
                    {/* <InlineWidget
                      styles={{
                        height: "660px",
                      }}
                      url="https://calendly.com/ihrishi/ama-w-hrishi"
                    /> */}
                  </div>
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
              <Button type="button" onClick={next} disabled={isSubmitting}>
                {currentStep < 4 ? "Next" : "Submit"}
              </Button>
            </div>
          </form>
          <DevTool control={form.control} />
        </Form>
      </div>
    </ScrollArea>
  );
};

export default OnboardingPage;

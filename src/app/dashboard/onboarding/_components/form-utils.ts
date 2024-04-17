import { VISA_PILLARS } from "@/lib/constants";
import { z } from "zod";

export const formSchema = z
  .object({
    // Getting started
    consent: z.boolean(),

    // Personal Information
    fullName: z
      .string()
      .min(2, {
        message: "Full Name is required.",
      })
      .max(126, { message: "Full Name should be less than 126 characters." }),
    email: z
      .string()
      .min(2, {
        message: "Email is required.",
      })
      .max(126, { message: "Email should be less than 126 characters." })
      .email(),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 characters.",
      })
      .max(15, { message: "Phone number should be less than 15 characters." }),
    linkedIn: z
      .string()
      .max(126, { message: "URL should be less than 126 characters." })
      .url(),
    highestEducation: z.enum(
      ["phd", "masters", "bachelors", "noDegree", "other"],
      {
        errorMap: () => ({ message: "Select an option" }),
      },
    ),
    major: z
      .string()
      .min(2, {
        message: "Your Major is required.",
      })
      .max(50, { message: "Your Major should be less than 50 characters." }),
    brithCountry: z
      .string()
      .min(2, {
        message: "Your Birth Country is required.",
      })
      .max(50, { message: "Your Birth Country be less than 50 characters." }),
    nationalityCountry: z
      .string()
      .min(2, {
        message: "Your National Country is required.",
      })
      .max(50, {
        message: "Your National Country be less than 50 characters.",
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
    fieldExpertIn: z
      .string()
      .min(2, {
        message: "Your field of expertise is required.",
      })
      .max(50, {
        message: "Your field of expertise should be less than 50 characters.",
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
  })
  .superRefine((data, refinementContext) => {
    if (
      data.haveAwards === "yes" &&
      (!data.awardDetails || data.awardDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["awardDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveOriginalContribution === "yes" &&
      (!data.originalContributionDetails ||
        data.originalContributionDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["originalContributionDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveAuthored === "yes" &&
      (!data.authoredDetails || data.authoredDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["authoredDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveJudged === "yes" &&
      (!data.judgedDetails || data.judgedDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["judgedDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.havePress === "yes" &&
      (!data.pressDetails || data.pressDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pressDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveMembership === "yes" &&
      (!data.membershipDetails || data.membershipDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["membershipDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveCriticalCapacity === "yes" &&
      (!data.criticalCapacityDetails || data.criticalCapacityDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["criticalCapacityDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveExhibited === "yes" &&
      (!data.exhibitedDetails || data.exhibitedDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["exhibitedDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveHighCompensation === "yes" &&
      (!data.highCompensationDetails || data.highCompensationDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["highCompensationDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveCommercialSuccess === "yes" &&
      (!data.commercialSuccessDetails || data.commercialSuccessDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["commercialSuccessDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveVolunteeredOrLed === "yes" &&
      (!data.volunteeredOrLedDetails || data.volunteeredOrLedDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["volunteeredOrLedDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveExpertLORSupport === "yes" &&
      (!data.expertLORSupportDetails || data.expertLORSupportDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["expertLORSupportDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveYourSpace === "yes" &&
      (!data.yourSpaceDetails || data.yourSpaceDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["yourSpaceDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
    if (
      data.haveWorkedWithPrevailingIssues === "yes" &&
      (!data.workedWithPrevailingIssuesDetails ||
        data.workedWithPrevailingIssuesDetails === "")
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["workedWithPrevailingIssuesDetails"],
        message: "Response is required if above response is `Yes`.",
      });
    }
  });

export type FormType = z.infer<typeof formSchema>;
export type FormFileds = keyof FormType;

export type Step = {
  id: string;
  name: string;
  fields: FormFileds[] | [];
};

export const steps: Step[] = [
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
  { id: "Step 5", name: "Complete", fields: ["consent"] },
];

export type DetailsField =
  | "haveAwards"
  | "awardDetails"
  | "originalContributionDetails"
  | "authoredDetails"
  | "judgedDetails"
  | "pressDetails"
  | "membershipDetails"
  | "criticalCapacityDetails"
  | "exhibitedDetails"
  | "highCompensationDetails"
  | "commercialSuccessDetails"
  | "volunteeredOrLedDetails"
  | "expertLORSupportDetails"
  | "yourSpaceDetails"
  | "workedWithPrevailingIssuesDetails";

export type IVisaPillarFields = {
  key: FormFileds;
  pillar: VISA_PILLARS | "misc";
  detailsField: DetailsField;
};

export const visaPillarFields: IVisaPillarFields[] = [
  { key: "haveAwards", pillar: "awards", detailsField: "awardDetails" },
  {
    key: "haveOriginalContribution",
    pillar: "original-contributions",
    detailsField: "originalContributionDetails",
  },
  {
    key: "haveAuthored",
    pillar: "authorship",
    detailsField: "authoredDetails",
  },
  { key: "haveJudged", pillar: "judging", detailsField: "judgedDetails" },
  { key: "havePress", pillar: "press", detailsField: "pressDetails" },
  {
    key: "haveMembership",
    pillar: "memberships",
    detailsField: "membershipDetails",
  },
  {
    key: "haveCriticalCapacity",
    pillar: "critical-role",
    detailsField: "criticalCapacityDetails",
  },
  {
    key: "haveExhibited",
    pillar: "exhibitions",
    detailsField: "exhibitedDetails",
  },
  {
    key: "haveHighCompensation",
    pillar: "high-remuneration",
    detailsField: "highCompensationDetails",
  },
  {
    key: "haveCommercialSuccess",
    pillar: "commercial-success",
    detailsField: "commercialSuccessDetails",
  },
  {
    key: "haveVolunteeredOrLed",
    pillar: "misc",
    detailsField: "volunteeredOrLedDetails",
  },
  {
    key: "haveExpertLORSupport",
    pillar: "misc",
    detailsField: "expertLORSupportDetails",
  },
  {
    key: "haveYourSpace",
    pillar: "misc",
    detailsField: "yourSpaceDetails",
  },
  {
    key: "haveWorkedWithPrevailingIssues",
    pillar: "misc",
    detailsField: "workedWithPrevailingIssuesDetails",
  },
];

import { type VISA_PILLARS } from "@/lib/constants";
import { z } from "zod";

export const formSchema = z.object({
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
  addFamilyMembers: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  currentEmployerInUS: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  currentVisa: z.enum(
    [
      "b1/b2",
      "f1",
      "j1",
      "h1b",
      "h2a",
      "h2b",
      "l1",
      "o1",
      "eb1",
      "eb2",
      "eb3",
      "other",
    ],
    {
      errorMap: () => ({ message: "Select an option" }),
    },
  ),
  interestedIn: z.enum(["o1A", "o1b", "eb1a", "notSure", "other"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  isStudent: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  graduationYear: z.string(),
  currentRole: z.string(),
  industryType: z.enum(
    [
      "Manufacturing",
      "Finance",
      "Transportation",
      "Agriculture",
      "Construction",
      "Mining",
      "Retail",
      "Entertainment",
      "Hospitality",
      "Secondary",
      "Quaternary",
      "Tertiary",
      "Energy",
      "Foodservice",
      "Aerospace",
      "Computer and Technology",
      "Fashion",
      "Media",
      "Healthcare",
      "Pharaceutucal",
      "Education",
      "Other",
    ],
    {
      errorMap: () => ({ message: "Select an option" }),
    },
  ),
  priorityDateIfAny: z.date().optional(),
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
  awards: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  awardDetails: z.string().optional(),

  haveOriginalContribution: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  originalContribution: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  originalContributionDetails: z.string().optional(),

  haveAuthored: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  authored: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  authoredDetails: z.string().optional(),

  haveJudged: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  judged: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  judgedDetails: z.string().optional(),

  havePress: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  press: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  pressDetails: z.string().optional(),

  haveMembership: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  membership: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  membershipDetails: z.string().optional(),

  haveCriticalCapacity: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  criticalCapacity: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  criticalCapacityDetails: z.string().optional(),

  haveExhibited: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  exhibited: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  exhibitedDetails: z.string().optional(),

  haveHighCompensation: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  highCompensation: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  highCompensationDetails: z.string().optional(),

  haveCommercialSuccess: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  commercialSuccess: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  commercialSuccessDetails: z.string().optional(),

  haveVolunteeredOrLed: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  volunteeredOrLed: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  volunteeredOrLedDetails: z.string().optional(),

  haveExpertLORSupport: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  expertLORSupport: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  expertLORSupportDetails: z.string().optional(),

  haveYourSpace: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  yourSpace: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  yourSpaceDetails: z.string().optional(),

  haveWorkedWithPrevailingIssues: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Select an option" }),
  }),
  workedWithPrevailingIssues: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(200, {
            message: "Your response should be less than 2000 characters.",
          }),
        detail: z
          .string()
          .min(2, {
            message: "Your response is required.",
          })
          .max(2000, {
            message: "Your response should be less than 2000 characters.",
          }),
      }),
    )
    .optional(),
  workedWithPrevailingIssuesDetails: z.string().optional(),
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
      "addFamilyMembers",
      "currentEmployerInUS",
      "currentVisa",
      "interestedIn",
      "isStudent",
      "graduationYear",
      "currentRole",
      "industryType",
      "priorityDateIfAny",
      "fieldExpertIn",
    ],
  },
  {
    id: "Step 4",
    name: "Visa Pillars",
    fields: [
      "haveAwards",
      "awards",
      // "awardDetails",
      "haveOriginalContribution",
      "originalContribution",
      // "originalContributionDetails",
      "haveAuthored",
      "authored",
      // "authoredDetails",
      "haveJudged",
      "judged",
      // "judgedDetails",
      "havePress",
      "press",
      // "pressDetails",
      "haveMembership",
      "membership",
      // "membershipDetails",
      "haveCriticalCapacity",
      "criticalCapacity",
      // "criticalCapacityDetails",
      "haveExhibited",
      "exhibited",
      // "exhibitedDetails",
      "haveHighCompensation",
      "highCompensation",
      // "highCompensationDetails",
      "haveCommercialSuccess",
      "commercialSuccess",
      // "commercialSuccessDetails",
      "haveVolunteeredOrLed",
      "volunteeredOrLed",
      // "volunteeredOrLedDetails",
      "haveExpertLORSupport",
      "expertLORSupport",
      // "expertLORSupportDetails",
      "haveYourSpace",
      "yourSpace",
      // "yourSpaceDetails",
      "haveWorkedWithPrevailingIssues",
      "workedWithPrevailingIssues",
      // "workedWithPrevailingIssuesDetails",
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
  // detailsField: DetailsField;
  detailsBlob:
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
};

export const visaPillarFields: IVisaPillarFields[] = [
  {
    key: "haveAwards",
    pillar: "awards",
    // detailsField: "awardDetails",
    detailsBlob: "awards",
  },
  {
    key: "haveOriginalContribution",
    pillar: "original-contributions",
    // detailsField: "originalContributionDetails",
    detailsBlob: "originalContribution",
  },
  {
    key: "haveAuthored",
    pillar: "authorship",
    // detailsField: "authoredDetails",
    detailsBlob: "authored",
  },
  {
    key: "haveJudged",
    pillar: "judging",
    // detailsField: "judgedDetails",
    detailsBlob: "judged",
  },
  {
    key: "havePress",
    pillar: "press",
    // detailsField: "pressDetails",
    detailsBlob: "press",
  },
  {
    key: "haveMembership",
    pillar: "memberships",
    // detailsField: "membershipDetails",
    detailsBlob: "membership",
  },
  {
    key: "haveCriticalCapacity",
    pillar: "critical-role",
    // detailsField: "criticalCapacityDetails",
    detailsBlob: "criticalCapacity",
  },
  {
    key: "haveExhibited",
    pillar: "exhibitions",
    // detailsField: "exhibitedDetails",
    detailsBlob: "exhibited",
  },
  {
    key: "haveHighCompensation",
    pillar: "high-remuneration",
    // detailsField: "highCompensationDetails",
    detailsBlob: "highCompensation",
  },
  {
    key: "haveCommercialSuccess",
    pillar: "commercial-success",
    // detailsField: "commercialSuccessDetails",
    detailsBlob: "commercialSuccess",
  },
  {
    key: "haveVolunteeredOrLed",
    pillar: "misc",
    // detailsField: "volunteeredOrLedDetails",
    detailsBlob: "volunteeredOrLed",
  },
  {
    key: "haveExpertLORSupport",
    pillar: "misc",
    // detailsField: "expertLORSupportDetails",
    detailsBlob: "expertLORSupport",
  },
  {
    key: "haveYourSpace",
    pillar: "misc",
    // detailsField: "yourSpaceDetails",
    detailsBlob: "yourSpace",
  },
  {
    key: "haveWorkedWithPrevailingIssues",
    pillar: "misc",
    // detailsField: "workedWithPrevailingIssuesDetails",
    detailsBlob: "workedWithPrevailingIssues",
  },
];

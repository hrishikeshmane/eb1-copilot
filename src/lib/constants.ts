export const MAX_UPLOAD_SIZE = 1024 * 1024 * 8; // 8MB
export const ACCEPTED_FILE_TYPES = ["application/pdf"];

export type HearAboutUsOption = {
  label: string;
  value: string;
};
export const HEAR_ABOUT_US: HearAboutUsOption[] = [
  { label: "Social Media", value: "socialMedia" },
  { label: "Friend", value: "friend" },
  { label: "Online Search", value: "onlineSearch" },
  { label: "Other", value: "other" },
];

export type EducationOptions = {
  label: string;
  value: string;
};
export const EDUCATION: EducationOptions[] = [
  { label: "PHD", value: "phd" },
  { label: "Masters", value: "masters" },
  { label: "Bachelors", value: "bachelors" },
  { label: "No Degree", value: "noDegree" },
  { label: "Other", value: "other" },
];

export type BooleanOption = {
  label: string;
  value: string;
};
export const BOOLEAN_RESPONSES: BooleanOption[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export type intrestedInOptions = {
  label: string;
  value: string;
};
export const INTRESTED_IN: intrestedInOptions[] = [
  { label: "O1A", value: "o1A" },
  { label: "O1B", value: "o1b" },
  { label: "EB1A", value: "eb1a" },
  { label: "Not Sure", value: "notSure" },
  { label: "Other", value: "other" },
];

export type currentVisaOptions = {
  label: string;
  value: string;
};

export const CURRENT_VISA_OPTIONS: currentVisaOptions[] = [
  { label: "B1/B2", value: "b1/b2" },
  { label: "F1", value: "f1" },
  { label: "J1", value: "j1" },
  { label: "H1B", value: "h1b" },
  { label: "H2A", value: "h2a" },
  { label: "H2B", value: "h2b" },
  { label: "L1", value: "l1" },
  { label: "O1", value: "o1" },
  { label: "EB1", value: "eb1" },
  { label: "EB2", value: "eb2" },
  { label: "EB3", value: "eb3" },
  { label: "Other", value: "other" },
];

export const INDUSTRY_TYPE = [
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
];

export const MIN_YEAR = 1920;

export const MAX_YEAR: number = new Date().getFullYear() + 10;

export const YEARS: string[] = Array.from(
  { length: MAX_YEAR - MIN_YEAR + 1 },
  (_, i) => (i + MIN_YEAR).toString(),
);

export type describesYouOptions = {
  label: string;
  value: string;
};
export const DESCRIBES_YOU: describesYouOptions[] = [
  { label: "Expert in a Field", value: "expert" },
  { label: "Entrepreneur", value: "entrepreneur" },
];

export type VISA_PILLARS =
  | "awards"
  | "original-contributions"
  | "authorship"
  | "judging"
  | "press"
  | "memberships"
  | "critical-role"
  | "exhibitions"
  | "high-remuneration"
  | "commercial-success";

export type VISA_PILLARS_EX =
  | "awards"
  | "original-contributions"
  | "authorship"
  | "judging"
  | "press"
  | "memberships"
  | "critical-role"
  | "exhibitions"
  | "high-remuneration"
  | "commercial-success"
  | "misc";

export const VISA_PILLARS_EX_LIST: VISA_PILLARS_EX[] = [
  "awards",
  "original-contributions",
  "authorship",
  "judging",
  "press",
  "memberships",
  "critical-role",
  "exhibitions",
  "high-remuneration",
  "commercial-success",
  "misc",
];

export type IPillars = {
  value: VISA_PILLARS;
  label: string;
};

export const visaPillars: IPillars[] = [
  // {
  //   value: "all",
  //   label: "All",
  // },
  {
    value: "awards",
    label: "Awards",
  },
  {
    value: "original-contributions",
    label: "Original Contributions",
  },
  {
    value: "authorship",
    label: "Authorship",
  },
  {
    value: "judging",
    label: "Judging",
  },
  {
    value: "press",
    label: "Press",
  },
  {
    value: "memberships",
    label: "Memberships",
  },
  {
    value: "critical-role",
    label: "Critical Role",
  },
  {
    value: "exhibitions",
    label: "Exhibitions",
  },
  {
    value: "high-remuneration",
    label: "High Remuneration",
  },
  {
    value: "commercial-success",
    label: "Commercial Success",
  },
];

export type IPillarsEx = {
  value: VISA_PILLARS_EX;
  label: string;
};

export const visaPillarsEx: IPillarsEx[] = [
  ...visaPillars,
  {
    value: "misc",
    label: "Miscellaneous",
  },
];

export const VISA_PILLARS_EX_Converter_to_IPillars = (
  pillarList: VISA_PILLARS_EX[],
): IPillars[] => {
  return pillarList.map((pillar) => {
    const foundPillar = visaPillars.find((item) => item.value === pillar);
    return foundPillar!;
  });
};

// export const VISA_PILLARS_EX_Converter_to_IPillars = (pillarList : VISA_PILLARS_EX[]): IPillars[] => {
//   return pillarList.map(p => {
//     if(p !== "misc"){
//       return { value: p, label: visaPillars.find(vp => vp.value === p)!.label}
//     }
//   }
//   )!
// }

// write type defination for userRolesMap
export type UserRolesMap = {
  label: string;
  value: string;
};

// write type defination for onBoardedMap
export type OnBoardedMap = {
  label: string;
  value: boolean;
};

export const userRolesMap: UserRolesMap[] = [
  {
    label: "Customer",
    value: "customer",
    // icon: ArrowDownIcon,
  },
  {
    label: "Vendor",
    value: "vendor",
    // icon: ArrowRightIcon,
  },
  {
    label: "Admin",
    value: "admin",
    // icon: ArrowUpIcon,
  },
];

export const onBoardedMap: OnBoardedMap[] = [
  {
    label: "Yes",
    value: true,
    // icon: ArrowDownIcon,
  },
  {
    label: "No",
    value: false,
    // icon: ArrowRightIcon,
  },
];

// Master Admin View Profile Status Options
// NOTE: make sure to add these options in the database schema as well and user-management.editCustomerDetails input schema
export const profileStatusOptions = [
  {
    label: "Onboarding",
    value: "onboarding",
  },
  {
    label: "Onboarded",
    value: "onboarded",
  },
  {
    label: "Profile Building",
    value: "profile-building",
  },
  {
    label: "Filing",
    value: "filing",
  },
  {
    label: "I-140 Approved",
    value: "i-140-approved",
  },
  {
    label: "I-485 Approved",
    value: "i-485-approved",
  },
  {
    label: "RFE Issued",
    value: "rfe-issued",
  },
  {
    label: "Drafting I-485",
    value: "drafting-i-485",
  },
  {
    label: "Dropped",
    value: "dropped",
  },
];

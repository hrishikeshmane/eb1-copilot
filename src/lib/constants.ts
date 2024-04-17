export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
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

export type describesYouOptions = {
  label: string;
  value: string;
};
export const DESCRIBES_YOU: describesYouOptions[] = [
  { label: "Expert in a Field", value: "expert" },
  { label: "Entrepreneur", value: "entrepreneur" },
];

export type IPillars = {
  value: string;
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

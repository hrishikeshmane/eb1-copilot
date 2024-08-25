"use server";

import { OnboardingEmail } from "@/components/email-template/onboarding";
import { type ISelectUserInfo } from "@/server/db/schema";
import { Resend } from "resend";

const FROM_EMAIL = "Greencard Inc <hello@greencard.inc>";
const RESEND_KEY = process.env.RESEND_KEY;
const GCI_ADMIN_EMAIL = [
  "hi+onboarding@readunshackled.com",
  "hello+onboarding@greencard.inc",
];

export async function sendOnBoardingEmail(userPersonalInfo: ISelectUserInfo) {
  const resend = new Resend(RESEND_KEY);

  const userEmail = userPersonalInfo.email;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [userEmail, ...GCI_ADMIN_EMAIL],
    subject: "Congratz on onboarding to Greencard Inc!",
    react: OnboardingEmail({
      userPersonalInfo: userPersonalInfo,
    }) as React.ReactElement,
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data;
}

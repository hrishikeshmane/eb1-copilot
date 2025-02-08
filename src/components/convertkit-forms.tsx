"use client";

import React from "react";
import ConvertKitForm from "convertkit-react";
import { siteConfig } from "@/lib/config";

const JOIN_NEWSLETTER_FORM_ID = 5527329;
const POPUP_FORM_ID = 5625110

export const JoinNewsletterForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={JOIN_NEWSLETTER_FORM_ID}
      submitText={`Join ${siteConfig.newsletterCount}+ immigrants`}
      buttonBackground="#098938"
    />
  );
};

export const PopupForm = () => {
  return (
    <ConvertKitForm
      template="clare"
      formId={POPUP_FORM_ID}
      submitText={`Join ${siteConfig.newsletterCount}+ immigrants`}
      buttonBackground="#098938"
    />
  );
};


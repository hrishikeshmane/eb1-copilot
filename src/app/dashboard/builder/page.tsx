import React from "react";
import { CustomKanban } from "@/components/elements/custom-kanban";
import OnboardingPlaceholder from "../_components/onboarding-placeholder";
import { auth } from "@clerk/nextjs/server";

// export const dynamic = 'force-dynamic';

const ProfileBuilderPage = () => {
  const { sessionClaims } = auth();
  const onBoarded = sessionClaims?.metadata?.onBoarded ?? false;
  const role = sessionClaims?.metadata?.role ?? "customer";

  const isInteractable = role !== "customer" ? true : false;
  const isAdmin = role === "admin" ? true : false;

  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      {!!onBoarded && (
        <CustomKanban isInteractable={isInteractable} isAdmin={isAdmin} />
      )}
      {!onBoarded && (
        <OnboardingPlaceholder className="my-2 flex h-[calc(100vh-6rem)] w-[98%]" />
      )}
    </div>
  );
};

export default ProfileBuilderPage;

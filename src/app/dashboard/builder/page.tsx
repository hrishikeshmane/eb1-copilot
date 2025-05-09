import React from "react";
import { CustomKanban } from "@/components/elements/custom-kanban";
import OnboardingPlaceholder from "../_components/onboarding-placeholder";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
// export const dynamic = 'force-dynamic';

const ProfileBuilderPage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.sub ?? "";
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.userId, userId),
  });
  const isOnboardingDisabled = user?.disableOnboardingForm ?? false;
  const onBoarded = sessionClaims?.metadata?.onBoarded ?? false;
  const role = sessionClaims?.metadata?.role ?? "customer";
  const customer = await currentUser();
  const customerString = JSON.stringify(customer);

  const isInteractable = role !== "customer" ? true : false;
  const isAdmin = role === "admin" ? true : false;

  const showOnboarding = !onBoarded && !isOnboardingDisabled;

  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      {!showOnboarding && (
        <CustomKanban
          isInteractable={true}
          isAdmin={isAdmin}
          customerString={customerString}
        />
      )}
      {showOnboarding && (
        <OnboardingPlaceholder className="my-2 flex h-[calc(100vh-6rem)] w-[98%]" />
      )}
    </div>
  );
};

export default ProfileBuilderPage;

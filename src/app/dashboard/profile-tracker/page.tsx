import React from "react";
import TrackerBoard from "./_components/traker-board";
import { api } from "@/trpc/server";
import OnboardingPlaceholder from "../_components/onboarding-placeholder";
import { auth } from "@clerk/nextjs/server";

const ProfileTrackerPage = async () => {
  const { sessionClaims } = auth();

  const userInfo = await api.userDetails.getUserInfo();
  const userPillars = await api.userDetails.getUserPillars();

  return (
    <div className="h-full w-full p-4 pb-0 pr-2">
      {!!sessionClaims?.metadata?.onBoarded && (
        <TrackerBoard userInfo={userInfo} userPillars={userPillars} />
      )}
      {!sessionClaims?.metadata?.onBoarded && (
        <OnboardingPlaceholder className="my-2 flex h-[calc(100vh-6rem)] w-[98%]" />
      )}
    </div>
  );
};

export default ProfileTrackerPage;

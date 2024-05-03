"use client";

import React from "react";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { CustomKanban } from "@/components/elements/custom-kanban";
import OnboardingPlaceholder from "../_components/onboarding-placeholder";

const ProfileBuilderPage = () => {
  const { user } = useUser();
  const metadata = user?.publicMetadata as CustomJwtSessionClaims["metadata"];

  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      {!!metadata?.onBoarded && <CustomKanban />}
      {!metadata?.onBoarded && (
        <OnboardingPlaceholder className="my-2 flex h-[calc(100vh-6rem)] w-[98%]" />
      )}
    </div>
  );
};

export default ProfileBuilderPage;

"use client";

import React from "react";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { CustomKanban } from "@/components/elements/custom-kanban";

const ProfileBuilderPage = () => {
  const { user } = useUser();
  const metadata = user?.publicMetadata as CustomJwtSessionClaims["metadata"];

  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      {/* <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-3xl">
          Hello, {user?.firstName ?? "there"}
        </h1>
      </div>
      <div className="mt-1">
        <p>Your can monitor your profile here</p>
      </div> */}
      {/* {!!metadata?.onBoarded && <p>Kanban board here</p>} */}
      {/* {!metadata?.onBoarded && (
        <div className="my-6 flex h-[calc(100vh-12rem)] w-full items-center justify-center gap-4 rounded-md border border-dashed">
          <div className="m-auto flex w-full flex-col items-center gap-1 p-14 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Let's get your profile evaluated
            </h3>
            <p className="mb-0 text-sm text-muted-foreground">
              You will be able to build your profile here after profile
              evaluation.
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              You can start your profile evaluation by filling up our
              questionnaire.
            </p>
            <Link
              href="/dashboard/onboarding"
              className="group inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Start your profile evaluation
              <ArrowRightIcon className="transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )} */}
      <CustomKanban />
    </div>
  );
};

export default ProfileBuilderPage;

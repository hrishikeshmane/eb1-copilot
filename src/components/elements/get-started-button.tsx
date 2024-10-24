"use client";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const GetStartedButton = ({ className }: { className?: string }) => {
  return (
    <>
      <SignedIn>
        <Link
          href="/dashboard"
          className={cn(
            "group inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            className,
          )}
        >
          Dashboard
          <ArrowRightIcon className="transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
        </Link>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" redirectUrl="/dashboard">
          <Button className="group gap-1">
            Get Started
            <ArrowRightIcon className="transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default GetStartedButton;

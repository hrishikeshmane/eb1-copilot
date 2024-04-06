"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";

const UserAuthButton = () => {
  return (
    <div>
      <SignedIn>
        <UserButton afterSignOutUrl="/dashboard" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={"secondary"}>Sign in</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default UserAuthButton;

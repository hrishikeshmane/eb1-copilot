import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";

const UserAuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={"secondary"}>Sign in</Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default UserAuthButton;

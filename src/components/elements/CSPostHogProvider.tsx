// app/providers.js
"use client";
import { env } from "@/env";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://app.posthog.com",
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  // const auth = useAuth();
  // useEffect(() => {
  //   if (userInfo.user) {
  //     posthog.identify(userInfo.user.id, {
  //       email: userInfo.user.emailAddresses[0]?.emailAddress,
  //       name: userInfo.user.fullName,
  //     });
  //   } else if (!auth.isSignedIn) {
  //     posthog.reset();
  //   }
  // }, [auth, userInfo]);

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        // email: user.primaryEmailAddress?.emailAddress,
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
      });
    } else {
      posthog.reset();
    }
  }, [user]);

  return children;
}

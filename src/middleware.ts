import { authMiddleware } from "@clerk/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs";
import { redirectToSignIn } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/blog",
    "/faqs",
    "/pricing",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook/clerk",
    "/api/webhook(.*)",
  ],
  afterAuth: async (auth, req: NextRequest) => {
    const { userId, sessionClaims } = auth;
    const url = new URL(req.nextUrl.origin);

    // For users visiting /onboarding, don't try to redirect
    // if (userId && req.nextUrl.pathname === "/onboarding") {
    //   return NextResponse.next();
    // }

    // If the user isn't signed in and the route is private, redirect to sign-in
    if (!userId && !auth.isPublicRoute) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      // return redirectToSignIn({ returnBackUrl: req.url });
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }

    // Catch users who do not have `onboardingComplete: true` in their publicMetadata
    // Redirect them to the /onboading route to complete onboarding
    // if (userId && !auth.isPublicRoute && !sessionClaims.metadata.onBoarded) {
    //   const onboardingUrl = new URL("/onboarding", req.url);
    //   return NextResponse.redirect(onboardingUrl);
    // }

    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    // If the user is logged in and the route is protected, let them view.
    if (userId && !auth.isPublicRoute) return NextResponse.next();
  },
  // debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

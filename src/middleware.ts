import { authMiddleware } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
// import { redirect } from "next/navigation";
// import { clerkClient } from "@clerk/nextjs";
// import { redirectToSignIn } from "@clerk/nextjs/server";

export default authMiddleware({
  afterAuth: (auth, req) => {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  },
  publicRoutes: [
    "/",
    "/v2",
    "/copilot",
    "/blog(.*)",
    "/faqs(.*)",
    "/pricing(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/terms(.*)",
    "/saas(.*)",
    "/privacy(.*)",
    "/dataprocessing(.*)",
    "/api/webhook(.*)",
    "/api/uploadthing(.*)",
    "/api/cron(.*)",
  ],
  // debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

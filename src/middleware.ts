import { authMiddleware } from "@clerk/nextjs";
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
    "/blog",
    "/faqs",
    "/pricing",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook/clerk",
    "/api/webhook(.*)",
  ],
  debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

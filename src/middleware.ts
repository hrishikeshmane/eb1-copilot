import { authMiddleware } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
// import { redirect } from "next/navigation";
// import { clerkClient } from "@clerk/nextjs";
// import { redirectToSignIn } from "@clerk/nextjs/server";

export default authMiddleware({
  afterAuth: (auth, req) => {
    const pathname = req.nextUrl.pathname;
    if (auth.isPublicRoute || pathname.startsWith("/studio")) {
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
    // "/studio(.*)",
    // "/studio/presentation(.*)",
    // "/api/draft-mode(.*)",
    // '/sanity-studio(.*)',
  ],
  ignoredRoutes: [
    "/studio(.*)",
    "/studio/presentation(.*)",
    "/api/draft-mode(.*)",
    "/sanity-studio(.*)",
    "/sitemap.xml",
    "robots.txt",
  ],
  // debug: true,
});

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

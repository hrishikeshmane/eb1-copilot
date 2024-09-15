import "@/styles/globals.css";
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/elements/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider as JotaiProvider } from "jotai";
import { AxiomWebVitals } from "next-axiom";
import { CSPostHogProvider } from "@/components/elements/CSPostHogProvider";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Greencard Inc.",
  description:
    "Your one-stop shop to Secure your Green Card with AI-Powered Expertise",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-w-screen min-h-screen bg-background font-sans antialiased ${inter.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton",
              },
              variables: {
                colorPrimary: "#D9F522",
                colorText: "#000000",
              },
            }}
          >
            <CSPostHogProvider>
              <NextSSRPlugin
                /**
                 * The `extractRouterConfig` will extract **only** the route configs
                 * from the router to prevent additional information from being
                 * leaked to the client. The data passed to the client is the same
                 * as if you were to fetch `/api/uploadthing` directly.
                 */
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              <TRPCReactProvider>
                <JotaiProvider>{children}</JotaiProvider>
                <Toaster richColors closeButton />
              </TRPCReactProvider>
            </CSPostHogProvider>
          </ClerkProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <AxiomWebVitals />
      </body>
    </html>
  );
}

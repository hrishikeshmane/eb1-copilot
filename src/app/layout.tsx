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
import { GoogleTagManager } from "@next/third-parties/google";
import { type Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GreenCard Inc. | Your Path to U.S. Permanent Residency.",
  description:
    "Greencard Inc helps high skilled immigrants navigate life in the US by providing education and guidance about talent visa (O1, EB2 NIW, EB1A) pathways",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "EB-1A Green Card",
    "Self-sponsorship",
    "AI immigration solutions",
    "u.s. permanent residency",
    "Greencard inc",
    "leading U.S. immigration attorneys",
    "u.s. green card",
    "eb-1a green card",
    "self-sponsorship",
    "ai immigration solutions",
    "US permanent residency",
    "greencard inc",
    "leading U.S. immigration attorneys",
    "u.s. green card",
  ],
  alternates: {
    canonical: "https://www.greencard.inc/",
  },
  verification: {
    google: "Ax1JTyzFVFsJ48SAd0JZwzSY20npItA57VvupdUe1qY",
    other: {
      "msvalidate.01": ["39CC291841558A0EC3039A7C6B54B83F"],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-WW2M6M6C" />
      <head>
        <meta name="robots" content="index, follow" />
      </head>
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

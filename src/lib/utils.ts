import { siteConfig } from "@/lib/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { visaPillars } from "./constants";
import { type User } from "@clerk/nextjs/server";
import { type TransformedUser } from "@/types/globals";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLableForPillars(value: string) {
  const pillar = visaPillars.find((pillar) => pillar.value === value);
  if (pillar) return pillar.label;
}

export const transformUserData = (userData: (User | null)[]): TransformedUser[] => {
  return userData
    .filter((user): user is User => user !== null)
    .map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddresses: user.emailAddresses?.[0]?.emailAddress ?? "",
      imageUrl: user.imageUrl,
      contactNumber:
        user.phoneNumbers.length > 0
          ? JSON.stringify(user.phoneNumbers[0])
          : null,
      onBoarded: user.publicMetadata.onBoarded as boolean,
      role: user.publicMetadata.role as string,
      id: user.id,
    }));
};

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${path}`;
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    title: {
      template: "%s | " + siteConfig.name,
      default: siteConfig.name,
    },
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    icons: "/favicon.ico",
    metadataBase: new URL(siteConfig.url),
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    ...props,
  };
}
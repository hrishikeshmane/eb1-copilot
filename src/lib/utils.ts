import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { visaPillars } from "./constants";
import { type User } from "@clerk/nextjs/server";
import { type TransformedUser } from "@/types/globals";

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
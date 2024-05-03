import { CustomKanban } from "@/components/elements/custom-kanban";
import { api } from "@/trpc/server";
import { auth, currentUser } from "@clerk/nextjs";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import OnboardingPlaceholder from "./_components/onboarding-placeholder";

export default async function Page() {
  const { sessionClaims } = auth();
  const user = await currentUser();

  return (
    <div className="h-full w-full p-4">
      <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-3xl">
          Hello, {user?.firstName ?? "there"}
        </h1>
      </div>
      <div className="mt-1">
        <p>Your journey to freedom begins here</p>
      </div>
      {!sessionClaims?.metadata.onBoarded && <OnboardingPlaceholder />}
    </div>
  );
}

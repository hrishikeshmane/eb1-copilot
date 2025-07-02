import Loader from "@/components/elements/loader";
import { Separator } from "@/components/ui/separator";
import { IUser, type ISelectUserInfo } from "@/server/db/schema";
import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PopupButton, useCalendlyEventListener } from "react-calendly";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { formatDateSafe } from "../../profile-management/_components/user-detail-view";

const UserInfoDetails = () => {
  const router = useRouter();
  const userResponse = api.userDetails.getUser.useQuery();
  const userInfo = api.userDetails.getUserInfo.useQuery();

  const utils = api.useUtils();
  const markUserPriorityCallSheduledMutation =
    api.userDetails.markUserPriorityCallSheduled.useMutation({
      onSettled: async () => {
        router.refresh();
        await utils.userDetails.getUser.invalidate();
      },
    });

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      if (e.data.event === "calendly.event_scheduled") {
        console.log(e.data.payload.event.uri);
        markUserPriorityCallSheduledMutation.mutate();
      }
    },
  });

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  useEffect(() => {
    // Wait for the component to be mounted before setting the rootElement
    if (typeof window !== "undefined") {
      setRootElement(document.getElementById("__next"));
    }
  }, []);

  if (userInfo.status === "pending") {
    return <Loader className="p-4" />;
  }

  if (userInfo.status === "error") {
    return <div>Error while fetching User Info...</div>;
  }

  const user = userResponse.data as IUser;
  const userData = userInfo.data as ISelectUserInfo;

  return (
    <div className="h-full w-full p-6 pb-0 pt-2">
      <h2 className="pb-4 text-2xl font-bold">You have been onboarded!</h2>
      {!(user?.priorityCallSheduled ?? false) && (
        <Alert className="mb-4 flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
            </div>
            <AlertDescription className="ml-6">
              Schedule a Priority call to get started
            </AlertDescription>
          </div>
          <PopupButton
            url={siteConfig.call.priorityScheduleCallLink}
            rootElement={rootElement ?? document.body}
            text="Schedule a priority call to get started"
            className={cn(buttonVariants({ variant: "default" }))}
          />
        </Alert>
      )}

      <div className="mb-1 grid grid-cols-3">
        <UserInfoFields label="Name" value={userData.fullName} />
        <UserInfoFields label="Email" value={userData.email} />
        <UserInfoFields label="Phone" value={userData.phone} />
        <UserInfoFields
          label="Highest Education"
          value={userData.highestEducation}
        />
        <UserInfoFields label="Major" value={userData.major} />
        <UserInfoFields label="Birth Country" value={userData.brithCountry} />
        <UserInfoFields
          label="Nationality Country"
          value={userData.nationalityCountry}
        />
      </div>
      <Separator className="my-1" />
      <div className="mt-4 grid grid-cols-3">
        <UserInfoFields
          label="Currently In US"
          value={userData.currentlyInUS ? "Yes" : "No"}
        />
        <UserInfoFields
          label="Ever Been To US"
          value={userData.everBeenToUS ? "Yes" : "No"}
        />
        <UserInfoFields
          label="Ever Applied For Green Card"
          value={userData.everAppliedForGreenCard ? "Yes" : "No"}
        />
        <UserInfoFields
          label="Add Family Members"
          value={userData.addFamilyMembers ? "Yes" : "No"}
        />
        <UserInfoFields
          label="Current Employer In US"
          value={userData.currentEmployerInUS ? "Yes" : "No"}
        />
        <UserInfoFields
          label="Current Visa"
          value={userData.currentVisa.toUpperCase()}
        />
        <UserInfoFields
          label="Interested In"
          value={userData.interestedIn.toUpperCase()}
        />
        <UserInfoFields
          label="Is a Student"
          value={userData.isStudent ? "Yes" : "No"}
        />
        <UserInfoFields
          label="Graduation Year"
          value={userData.graduationYear}
        />
        <UserInfoFields label="Current Role" value={userData.currentRole} />
        <UserInfoFields label="Industry Type" value={userData.industryType} />
        <UserInfoFields
          label="Priority Date If Any"
          value={formatDateSafe(userData.priorityDateIfAny)}
        />
        <UserInfoFields
          label="Field Expert In"
          value={userData.fieldExpertIn}
        />
      </div>
    </div>
  );
};

export default UserInfoDetails;

type UserInfoFieldsProps = {
  label: string;
  value: string;
};

const UserInfoFields = ({ label, value }: UserInfoFieldsProps) => {
  return (
    <div className="flex flex-col pb-2">
      <p className="font-medium">{label}</p>
      <p className="">{value}</p>
    </div>
  );
};

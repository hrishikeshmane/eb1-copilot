import Loader from "@/components/elements/loader";
import { Separator } from "@/components/ui/separator";
import { type ISelectUserInfo } from "@/server/db/schema";
import { api } from "@/trpc/react";
import React from "react";

const UserInfoDetails = () => {
  const userInfo = api.userDetails.getUserInfo.useQuery();

  if (userInfo.status === "pending") {
    return <Loader className="p-4" />;
  }

  if (userInfo.status === "error") {
    return <div>Error while fetching User Info...</div>;
  }

  const userData = userInfo.data as ISelectUserInfo;

  return (
    <div className="h-full w-full p-6 pb-0 pt-2">
      <h2 className="pb-4 text-2xl font-bold">You have been onboarded!</h2>

      <div className="mb-1 grid grid-cols-3">
        <UserInfoFields label="Name" value={userData.fullName} />
        <UserInfoFields label="Email" value={userData.email} />
        <UserInfoFields label="Phone" value={userData.phone} />
        <UserInfoFields
          label="Highest Education"
          value={userData.highestEducation}
        />
        <UserInfoFields label="Major" value={userData.major} />
        <UserInfoFields label="Brith Country" value={userData.brithCountry} />
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
          value={userData.priorityDateIfAny ?? "None"}
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

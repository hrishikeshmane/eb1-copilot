import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/components/elements/loader";
import { Separator } from "@/components/ui/separator";
import { type ISelectUserInfo } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { type User } from "@clerk/nextjs/server";
import TrackerBoard from "../../profile-tracker/_components/traker-board";

const UserDetailView = ({
  customer,
  children,
}: {
  customer: User;
  children: React.ReactNode;
}) => {
  const userPillars = api.userDetails.getUserPillarsById.useQuery({
    userId: customer.id,
  });
  const completedTickets = api.kanban.getCompletedTicketsByUserId.useQuery({
    userId: customer.id,
  });

  if (
    userPillars.status === "pending" ||
    completedTickets.status === "pending"
  ) {
    return <Loader className="p-4" />;
  }

  if (userPillars.status === "error" || completedTickets.status === "error") {
    return <div>Error while fetching User Pillars...</div>;
  }

  return (
    <div>
      <Tabs defaultValue="personal-info" className="w-[500px] pl-4">
        <div className="flex items-center">
          {children}
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
            <TabsTrigger value="visa-pillars">Visa Pillars</TabsTrigger>
          </TabsList>
        </div>
        <div className="h-[calc(100vh-7.8rem)] w-[calc(100vw-20px)] md:w-[calc(100vw-285px)]">
          <TabsContent className="h-full" value="personal-info">
            <CustomerInfoDetails userId={customer.id} />
          </TabsContent>
          <TabsContent
            className="h-full focus-visible:ring-0"
            value="visa-pillars"
          >
            <TrackerBoard
              userPillars={userPillars.data}
              completedTickets={completedTickets.data}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UserDetailView;

const CustomerInfoDetails = ({ userId }: { userId: string }) => {
  const userInfo = api.userManagement.getUserInfoById.useQuery({
    userId: userId,
  });

  if (userInfo.status === "pending") {
    return <Loader className="p-4" />;
  }

  if (userInfo.status === "error") {
    return <div>Error while fetching User Info...</div>;
  }

  const userData = userInfo.data as ISelectUserInfo;

  return (
    <ScrollArea className="h-full w-full p-0 pb-0 pt-2">
      <div className="mb-1 grid grid-cols-3">
        <CustomerInfoFields label="Name" value={userData.fullName} />
        <CustomerInfoFields label="Email" value={userData.email} />
        <CustomerInfoFields label="Phone" value={userData.phone} />
        <CustomerInfoFields
          label="Highest Education"
          value={userData.highestEducation}
        />
        <CustomerInfoFields label="Major" value={userData.major} />
        <CustomerInfoFields
          label="Brith Country"
          value={userData.brithCountry}
        />
        <CustomerInfoFields
          label="Nationality Country"
          value={userData.nationalityCountry}
        />
      </div>
      <Separator className="my-1" />
      <div className="mt-4 grid grid-cols-3">
        <CustomerInfoFields
          label="Currently In US"
          value={userData.currentlyInUS ? "Yes" : "No"}
        />
        <CustomerInfoFields
          label="Ever Been To US"
          value={userData.everBeenToUS ? "Yes" : "No"}
        />
        <CustomerInfoFields
          label="Ever Applied For Green Card"
          value={userData.everAppliedForGreenCard ? "Yes" : "No"}
        />
        <CustomerInfoFields
          label="Add Family Members"
          value={userData.addFamilyMembers ? "Yes" : "No"}
        />
        <CustomerInfoFields
          label="Current Employer In US"
          value={userData.currentEmployerInUS ? "Yes" : "No"}
        />
        <CustomerInfoFields
          label="Current Visa"
          value={userData.currentVisa.toUpperCase()}
        />
        <CustomerInfoFields
          label="Interested In"
          value={userData.interestedIn.toUpperCase()}
        />
        <CustomerInfoFields
          label="Is a Student"
          value={userData.isStudent ? "Yes" : "No"}
        />
        <CustomerInfoFields
          label="Graduation Year"
          value={userData.graduationYear}
        />
        <CustomerInfoFields label="Current Role" value={userData.currentRole} />
        <CustomerInfoFields
          label="Industry Type"
          value={userData.industryType}
        />
        <CustomerInfoFields
          label="Priority Date If Any"
          value={userData.priorityDateIfAny ?? "None"}
        />
        <CustomerInfoFields
          label="Field Expert In"
          value={userData.fieldExpertIn}
        />
      </div>
      <ScrollBar />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

type UserInfoFieldsProps = {
  label: string;
  value: string;
};

const CustomerInfoFields = ({ label, value }: UserInfoFieldsProps) => {
  return (
    <div className="flex flex-col pb-2">
      <p className="font-medium">{label}</p>
      <p className="">{value}</p>
    </div>
  );
};

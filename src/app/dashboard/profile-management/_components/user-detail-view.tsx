import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/components/elements/loader";
import { Separator } from "@/components/ui/separator";
import { type ISelectUserInfo } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { type User } from "@clerk/nextjs/server";
import TrackerBoard from "../../profile-tracker/_components/traker-board";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { CustomKanban } from "@/components/elements/custom-kanban";
import { format, parseISO } from "date-fns";

export const formatDateSafe = (dateString: string | null) => {
  try {
    // Return early if falsy value
    if (!dateString) return "N/A";

    // Handle extra quotes by removing them
    const cleanDate = dateString.replace(/^"+|"+$/g, "");

    // Return formatted date
    return format(parseISO(cleanDate), "MMMM d, yyyy");
  } catch (error) {
    return "Invalid date";
  }
};

const UserDetailView = ({
  customer,
  children,
}: {
  customer: User;
  children: React.ReactNode;
}) => {
  const userPillars = api.userDetails.getUserPillarsByUserId.useQuery({
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
      <Tabs defaultValue="personal-info" className="w-full pl-4">
        <div className="flex w-full items-center">
          {children}
          <TabsList className="grid w-[600px] grid-cols-3">
            <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
            <TabsTrigger value="visa-pillars">Visa Pillars</TabsTrigger>
            <TabsTrigger value="ticket-management">
              Ticket Management
            </TabsTrigger>
          </TabsList>
          <Link
            className="ml-auto mr-6"
            target="_blank"
            rel="noopener noreferrer"
            href={`/profile-report/${customer.id}`}
          >
            <Button size={"sm"} className="gap-1">
              View Report
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="h-[calc(100vh-7.8rem)]">
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
          <TabsContent
            className="h-full focus-visible:ring-0"
            value="ticket-management"
          >
            <div className="ml-2">
              <CustomKanban
                customer={customer}
                isInteractable={true}
                isAdmin={true}
              >
                {/* <CustomerSelect
          customers={customers}
          customer={selectedCustomer}
          setCustomer={setSelectedCustomer}
        /> */}
              </CustomKanban>
            </div>
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
  console.log("userData??", userData);

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
        <div className="flex flex-col pb-2">
          <p className="font-medium">LinkedIn</p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
            href={userData.linkedIn}
          >
            {userData.linkedIn.slice(0, 40)}
          </Link>
        </div>

        {!!userData.resumeUrl && (
          <div className="flex flex-col pb-2">
            <p className="font-medium">Resume/CV</p>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
              href={userData.resumeUrl}
            >
              {userData.resumeUrl.slice(0, 40)}
            </Link>
          </div>
        )}
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
          value={formatDateSafe(userData.priorityDateIfAny)}
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

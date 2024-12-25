import React from "react";
import { api } from "@/trpc/server";
import PdfViewer from "../_component/pdf-viewer";

const ProfileReportPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const userPillars = await api.userDetails.getUserPillarsByUserId({
    userId: params.slug,
  });
  const completedTickets = await api.kanban.getCompletedTicketsByUserId({
    userId: params.slug,
  });
  const userInfo = await api.userManagement.getUserInfoById({
    userId: params.slug,
  });

  if (!userInfo || !userPillars || !completedTickets) {
    return <div>User not found</div>;
  }

  return (
    <div className="mx-auto h-screen w-full max-w-5xl">
      <PdfViewer
        userInfo={userInfo}
        userPillars={userPillars}
        completedTickets={completedTickets}
      />
    </div>
  );
};

export default ProfileReportPage;

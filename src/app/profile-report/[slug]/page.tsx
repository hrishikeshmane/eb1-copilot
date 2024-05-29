import React from "react";
import { api } from "@/trpc/server";
import PdfViewer from "../_component/pdf-viewer";

const ProfileReportPage = async ({ params }: { params: { slug: string } }) => {
  const userPillars = await api.userDetails.getUserPillarsById({
    userId: params.slug,
  });
  const completedTickets = await api.kanban.getCompletedTicketsByUserId({
    userId: params.slug,
  });

  return (
    <div className="mx-auto h-screen w-full max-w-5xl bg-red-100">
      <PdfViewer
        userPillars={userPillars}
        completedTickets={completedTickets}
      />
    </div>
    // <div>
    //   <PDFViewer>
    //     <MyProfilePDF
    //       userPillars={userPillars}
    //       completedTickets={completedTickets}
    //     />
    //   </PDFViewer>
    // </div>
  );
};

export default ProfileReportPage;

"use client";

import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyProfilePDF from "../../../components/pdf/my-profile";
import {
  type ISelectUserInfo,
  type ISelectTickets,
  type ISelectUserVisaPillarDetails,
} from "@/server/db/schema";

type MyProfilePDFProps = {
  userInfo: ISelectUserInfo;
  userPillars: ISelectUserVisaPillarDetails[];
  completedTickets: ISelectTickets[];
};

const PdfViewer = ({
  userInfo,
  userPillars,
  completedTickets,
}: MyProfilePDFProps) => {
  return (
    <PDFViewer width={"100%"} height={"100%"}>
      <MyProfilePDF
        userInfo={userInfo}
        userPillars={userPillars}
        completedTickets={completedTickets}
      />
    </PDFViewer>
  );
};

export default PdfViewer;

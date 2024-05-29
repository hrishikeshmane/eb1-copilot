"use client";

import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyProfilePDF from "../../../components/pdf/my-profile";
import {
  type ISelectTickets,
  type ISelectUserVisaPillarDetails,
} from "@/server/db/schema";

type MyProfilePDFProps = {
  userPillars: ISelectUserVisaPillarDetails[];
  completedTickets: ISelectTickets[];
};

const PdfViewer = ({ userPillars, completedTickets }: MyProfilePDFProps) => {
  return (
    <PDFViewer width={"100%"} height={"100%"}>
      <MyProfilePDF
        userPillars={userPillars}
        completedTickets={completedTickets}
      />
    </PDFViewer>
  );
};

export default PdfViewer;

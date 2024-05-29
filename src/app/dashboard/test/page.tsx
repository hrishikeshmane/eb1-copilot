"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import MyProfilePDF from "@/components/pdf/my-profile";

const TestPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <PDFViewer>{/* <MyProfilePDF /> */}</PDFViewer>
    </main>
  );
};

export default TestPage;

"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import React from "react";

const TestPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone
        className="rounded-md bg-primary px-4 py-2 text-black"
        endpoint="resumeUploader"
        onClientUploadComplete={(data) => {
          console.log("Upload complete!", data);
        }}
      />
    </main>
  );
};

export default TestPage;

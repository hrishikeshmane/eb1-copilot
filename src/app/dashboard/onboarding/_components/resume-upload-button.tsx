"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { usePostHog } from "posthog-js/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { type FormType } from "./form-utils";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ClientUploadedFileData } from "uploadthing/types";
import { Button } from "@/components/ui/button";
import Loader from "@/components/elements/loader";
import { useUser } from "@clerk/nextjs";
import { useLogger } from "next-axiom";
import { pdfjs } from "react-pdf";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (
  resumeSetter: (file: File) => void,
  setResumeContent: (content: string) => void,
  ...args: Input
) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!e.target.files[0]) return;

    const file = e.target.files[0];
    resumeSetter(file);

    // Read PDF content
    const fileArrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: fileArrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n";
    }

    setResumeContent(fullText);

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
  };

  return {
    inputProps: {
      onChange,
      multiple: false,
      accept: "application/pdf",
    },
    isUploading: $ut.isUploading,
  };
};

const ResumeUploadButton = ({ form }: { form: UseFormReturn<FormType> }) => {
  const [resumeContent, setResumeContent] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const log = useLogger().with({ userId: user?.id });
  const posthog = usePostHog();
  const resumeSetter = (file: File) => {
    form.setValue("resume", file);
  };

  useEffect(() => {
    if (resumeContent) {
      console.log("Resume content:", resumeContent);
      form.setValue("resumeContent", resumeContent);
    }
  }, [resumeContent, form]);

  const { inputProps, isUploading } = useUploadThingInputProps(
    resumeSetter,
    setResumeContent, // Pass the setter function
    "resumeUploader",
    {
      onUploadBegin() {
        posthog.capture("upload_begin");
        toast.loading("Uploading your resume...", {
          id: "upload-begin",
        });
      },
      onUploadError(error) {
        posthog.capture("upload_error", { error });
        toast.dismiss("upload-begin");
        toast.error("Upload failed");
        log.error("Error uploading resume", {
          message: error.message,
          error: error,
        });
      },
      onClientUploadComplete(data) {
        toast.dismiss("upload-begin");
        toast.success("Upload complete!");
        form.setValue("resumeUrl", data[0]?.url ?? "");
      },
    },
  );

  if (isUploading) {
    return (
      <Button
        variant={"secondary"}
        disabled
        className="flex items-center justify-center gap-2"
      >
        <Loader className="h-fit w-fit" /> Uploading...
      </Button>
    );
  }

  return (
    <Input
      id="upload-button"
      type="file"
      className="cursor-pointer"
      {...inputProps}
    />
  );
};

export default ResumeUploadButton;

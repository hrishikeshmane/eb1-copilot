import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type FormType } from "./form-utils";
import {
  EDUCATION,
  type EducationOptions,
  HEAR_ABOUT_US,
  type HearAboutUsOption,
} from "@/lib/constants";
import ScrollToTop from "@/components/elements/scroll-to-top";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import ResumeUploadButton from "./resume-upload-button";
import { Button } from "@/components/ui/button";

type SubFormProps = {
  form: UseFormReturn<FormType>;
};

const PersonalInfoForm = ({ form }: SubFormProps) => {
  const posthog = usePostHog();
  return (
    <ul className="mx-1 grid grid-cols-2  gap-4 lg:grid-cols-3">
      <ScrollToTop />
      <li className="col-span-1">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Dev Patel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="dev@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="8888888888" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://www.linkedin.com/in/dev/"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="highestEducation"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>What is your highest level of education?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Education" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EDUCATION.map((option: EducationOptions) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>What was your Major?</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="brithCountry"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Country of Birth</FormLabel>
              <FormControl>
                <Input placeholder="India" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="nationalityCountry"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>Country of Nationality</FormLabel>
              <FormControl>
                <Input placeholder="India" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="hearAboutUs"
          render={({ field }) => (
            <FormItem className="flex h-full flex-col justify-between">
              <FormLabel>How did you hear about us?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {HEAR_ABOUT_US.map((option: HearAboutUsOption) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </li>

      <li className="col-span-1">
        <FormField
          control={form.control}
          name="resumeUrl"
          render={({ field }) => {
            // https://github.com/shadcn-ui/ui/issues/1085
            return (
              <FormItem className="flex h-full flex-col justify-between">
                <FormLabel>
                  Upload your CV{" "}
                  {form.watch("resumeUrl") && (
                    <span className="text-muted-foreground">
                      (Click to change)
                    </span>
                  )}
                </FormLabel>

                {/* <UploadButton
                  className="rounded-md bg-secondary px-4 py-2 text-black"
                  endpoint="resumeUploader"
                  onUploadBegin={() => {
                    toast.loading("Uploading your resume...", {
                      id: "upload-begin",
                    });
                  }}
                  onClientUploadComplete={(data) => {
                    toast.dismiss("upload-begin");
                    toast.success("Upload complete!");
                    form.setValue("resumeUrl", data[0]?.url ?? "");
                  }}
                  onUploadError={(error) => {
                    posthog.capture("upload_error", { error });
                    toast.dismiss("upload-begin");
                    toast.error("Upload failed!");
                  }}
                /> */}

                <FormControl>
                  {form.watch("resumeUrl") ? (
                    <Button
                      // disabled
                      variant={"outline"}
                      onClick={() => {
                        form.setValue("resumeUrl", "");
                        // form.setValue("resume", undefined);
                      }}
                    >
                      {
                        // if form.getValues("resume") is undefined return empty string slice the name to 20 characters and add "..." if it is greater than 20
                        !!form.getValues("resume")
                          ? (form.getValues("resume") as File)?.name?.length >
                            20
                            ? (form.getValues("resume") as File)?.name?.slice(
                                0,
                                20,
                              ) + "..."
                            : (form.getValues("resume") as File)?.name
                          : ""
                      }{" "}
                      Uploaded
                    </Button>
                  ) : (
                    <ResumeUploadButton form={form} />
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />
      </li>
    </ul>
  );
};

export default PersonalInfoForm;

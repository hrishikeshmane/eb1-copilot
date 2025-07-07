"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecommenderDetailsFormProps {
  args: { purpose: string };
  addResult: (result: any) => void;
}

export function RecommenderDetailsForm({
  args,
  addResult,
}: RecommenderDetailsFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    institution: "",
    field: "",
    credentials: "",
    relationship: "",
    email: "",
    phone: "",
  });

  const [additionalContext, setAdditionalContext] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addResult({
        recommenderDetails: formData,
        additionalContext,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    formData.fullName &&
    formData.jobTitle &&
    formData.institution &&
    formData.field &&
    formData.credentials &&
    formData.relationship;

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Recommender Details</CardTitle>
        <CardDescription>{args.purpose}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Dr. Jane Smith"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">
                Job Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                placeholder="Senior Research Scientist"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">
              Institution/Organization <span className="text-red-500">*</span>
            </Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={(e) => handleInputChange("institution", e.target.value)}
              placeholder="MIT Computer Science Department"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="field">
              Field of Expertise <span className="text-red-500">*</span>
            </Label>
            <Input
              id="field"
              value={formData.field}
              onChange={(e) => handleInputChange("field", e.target.value)}
              placeholder="Artificial Intelligence, Machine Learning"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentials">
              Major Credentials/Accomplishments{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="credentials"
              value={formData.credentials}
              onChange={(e) => handleInputChange("credentials", e.target.value)}
              placeholder="PhD from Stanford, 200+ publications, IEEE Fellow, recipient of ACM Prize..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">
              Relationship to Your Work <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="relationship"
              value={formData.relationship}
              onChange={(e) =>
                handleInputChange("relationship", e.target.value)
              }
              placeholder="We collaborated on the XYZ project, or they reviewed my published research in the field..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="jane.smith@mit.edu"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalContext">Additional Context</Label>
            <Textarea
              id="additionalContext"
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="Any additional information about your work together, specific projects, or context that would help in drafting the letter..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex-1"
            >
              {isSubmitting
                ? "Generating Letter..."
                : "Generate Letter of Recommendation"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  fullName: "",
                  jobTitle: "",
                  institution: "",
                  field: "",
                  credentials: "",
                  relationship: "",
                  email: "",
                  phone: "",
                });
                setAdditionalContext("");
              }}
              disabled={isSubmitting}
            >
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

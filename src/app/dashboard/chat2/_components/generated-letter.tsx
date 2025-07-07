"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Edit, CheckCircle2 } from "lucide-react";

interface GeneratedLetterProps {
  content: string;
  recommenderDetails: any;
  userInfo: any;
  userPillars: any;
}

export function GeneratedLetter({
  content,
  recommenderDetails,
}: GeneratedLetterProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadLetter = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `LOR_${recommenderDetails.fullName.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Letter of Recommendation Generated
            </CardTitle>
            <CardDescription>
              USCIS-compliant letter from {recommenderDetails.fullName}
            </CardDescription>
          </div>
          <Badge variant="secondary">EB1A Petition</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Letter Content */}
        <div className="rounded-lg border bg-gray-50 p-6">
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800">
            {content}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={copyToClipboard} variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy Text"}
          </Button>
          <Button onClick={downloadLetter} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Letter
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold">Recommender Info</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <strong>Name:</strong> {recommenderDetails.fullName}
              </p>
              <p>
                <strong>Title:</strong> {recommenderDetails.jobTitle}
              </p>
              <p>
                <strong>Institution:</strong> {recommenderDetails.institution}
              </p>
              <p>
                <strong>Field:</strong> {recommenderDetails.field}
              </p>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">Letter Details</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <strong>Type:</strong> EB1A Petition Support
              </p>
              <p>
                <strong>Length:</strong> ~{Math.ceil(content.length / 500)}{" "}
                pages
              </p>
              <p>
                <strong>Format:</strong> USCIS Compliant
              </p>
              <p>
                <strong>Generated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

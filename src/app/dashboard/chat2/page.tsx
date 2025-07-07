"use client";
import { useChat } from "ai/react";
import {
  AssistantRuntimeProvider,
  makeAssistantToolUI,
} from "@assistant-ui/react";
import { Thread } from "@/components/assistant-ui/thread";
import { api } from "@/trpc/react";
import Loader from "@/components/elements/loader";
import { useVercelUseChatRuntime } from "@assistant-ui/react-ai-sdk";
import { RecommenderDetailsForm } from "./_components/details-form";
import { GeneratedLetter } from "./_components/generated-letter";

// Tool UI for getRecommenderDetails
const GetRecommenderDetailsToolUI = makeAssistantToolUI<
  { purpose: string },
  any
>({
  toolName: "getRecommenderDetails",
  render: ({ args, addResult }) => (
    <RecommenderDetailsForm purpose={args.purpose} addResult={addResult} />
  ),
});

// Tool UI for generateRecommendationLetter
const GenerateRecommendationLetterToolUI = makeAssistantToolUI<
  any,
  { content: string; recommenderDetails: any; userInfo: any; userPillars: any }
>({
  toolName: "generateRecommendationLetter",
  render: ({ result }) =>
    result ? (
      <GeneratedLetter
        content={result.content}
        recommenderDetails={result.recommenderDetails}
        userInfo={result.userInfo}
        userPillars={result.userPillars}
      />
    ) : null,
});

export default function ChatPage() {
  const userInfo = api.userDetails.getUserInfo.useQuery();
  const userPillars = api.userDetails.getUserPillars.useQuery();

  const chat = useChat({
    api: "/api/chat",
    body: { userInfo: userInfo.data, userPillars: userPillars.data },
  });

  const runtime = useVercelUseChatRuntime(chat);

  if (userInfo.isLoading || userPillars.isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto -mt-4 flex h-[calc(100vh-4rem)] flex-col">
      <AssistantRuntimeProvider runtime={runtime}>
        <GetRecommenderDetailsToolUI />
        <GenerateRecommendationLetterToolUI />
        <Thread />
      </AssistantRuntimeProvider>
    </div>
  );
}

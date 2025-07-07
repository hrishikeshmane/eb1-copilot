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
import { RecommenderDetailsForm } from "./_components/recommender-details-form";
import { GeneratedLetter } from "./_components/generated-letter";
import { CreateTicketForm } from "./_components/create-ticket-form";

const GetRecommenderDetailsToolUI = makeAssistantToolUI<
  { purpose: string },
  any
>({
  toolName: "getRecommenderDetails",
  render: (props) => <RecommenderDetailsForm {...props} />,
});

const GenerateRecommendationLetterToolUI = makeAssistantToolUI<
  any,
  { content: string; recommenderDetails: any; userInfo: any; userPillars: any }
>({
  toolName: "generateRecommendationLetter",
  render: (props) => <GeneratedLetter {...props} />,
});

const CreateBacklogTicketToolUI = makeAssistantToolUI<
  {
    title: string;
    description?: string;
    pillars?: string[];
    dueDate?: string;
    assigneeId?: string;
  },
  { success: boolean; ticketId?: string }
>({
  toolName: "createBacklogTicket",
  render: (props) => <CreateTicketForm {...props} />,
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
        <CreateBacklogTicketToolUI />
        <Thread />
      </AssistantRuntimeProvider>
    </div>
  );
}

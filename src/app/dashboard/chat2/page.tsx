"use client";
import { useChat } from "ai/react";
import { useEdgeRuntime, AssistantRuntimeProvider } from "@assistant-ui/react";
import { Thread } from "@/components/assistant-ui/thread";
import { api } from "@/trpc/react";
import Loader from "@/components/elements/loader";
import { useVercelUseChatRuntime } from "@assistant-ui/react-ai-sdk";
import { nanoid } from "nanoid";

export default function ChatPage() {
  const userInfo = api.userDetails.getUserInfo.useQuery();
  const userPillars = api.userDetails.getUserPillars.useQuery();

  const chat = useChat({
    api: "/api/chat",
    body: { userInfo: userInfo.data, userPillars: userPillars.data },
    //   initialMessages: [
    //     {
    //       id: nanoid(),
    //       role: "system",
    //       content: `You are an AI assistant helping users with their US talent visa journey. Remember to keep you responses concise.
    // Here are the user details:
    // ${JSON.stringify(userInfo.data, null, 2)}

    // And here are the user's achievements:
    // ${JSON.stringify(userPillars.data, null, 2)}

    // Use this information to provide personalized responses to the user's questions about their visa journey, recommendations, or any other related queries.`,
    //     },
    //   ],
  });

  const runtime = useVercelUseChatRuntime(chat);

  if (userInfo.isLoading || userPillars.isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto -mt-4 flex h-[calc(100vh-4rem)] flex-col">
      <AssistantRuntimeProvider runtime={runtime}>
        <Thread
        // runtime={runtime}
        // assistantMessage={{ components: { Text: MarkdownText } }}
        />
      </AssistantRuntimeProvider>
    </div>
  );
}

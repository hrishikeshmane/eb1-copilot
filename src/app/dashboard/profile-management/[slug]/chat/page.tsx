"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ai-elements/prompt-input";
import { useChat } from "@ai-sdk/react";
import { api } from "@/trpc/react";
import { RecommenderDetailsForm } from "./_components/recommender-details-form";
import { GeneratedLetter } from "./_components/generated-letter";
import { CreateTicketForm } from "./_components/create-ticket-form";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { Response } from "@/components/ai-elements/response";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/source";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Loader } from "@/components/ai-elements/loader";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";

export default function Page({ params }: { params: { slug: string } }) {
  const userId = params.slug;
  const userInfo = api.userDetails.getUserInfoByUserId.useQuery({
    userId,
  });
  const userPillars = api.userDetails.getUserPillarsByUserId.useQuery({
    userId,
  });
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const { messages, sendMessage, status, addToolResult } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { userInfo: userInfo.data, userPillars: userPillars.data },
    }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });

  if (userInfo.isLoading || userPillars.isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto -mt-4 flex h-[calc(100vh-4rem)] max-w-4xl flex-col">
      <div className="flex h-full flex-col">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === "assistant" && (
                  <Sources>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "source-url":
                          return (
                            <>
                              <SourcesTrigger
                                count={
                                  message.parts.filter(
                                    (part) => part.type === "source-url",
                                  ).length
                                }
                              />
                              <SourcesContent key={`${message.id}-${i}`}>
                                <Source
                                  key={`${message.id}-${i}`}
                                  href={part.url}
                                  title={part.url}
                                />
                              </SourcesContent>
                            </>
                          );
                      }
                    })}
                  </Sources>
                )}
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <Response key={`${message.id}-${i}`}>
                              {part.text}
                            </Response>
                          );
                        case "reasoning":
                          return (
                            <Reasoning
                              key={`${message.id}-${i}`}
                              className="w-full"
                              isStreaming={status === "streaming"}
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        case "tool-getRecommenderDetails":
                          return (
                            <RecommenderDetailsForm
                              addResult={(result) =>
                                addToolResult({
                                  tool: "getRecommenderDetails",
                                  toolCallId: part.toolCallId,
                                  output: result,
                                })
                              }
                            />
                          );
                        case "tool-displayRecommendationLetter":
                          return (
                            <GeneratedLetter
                              result={
                                part.output as {
                                  content: string;
                                  recommenderDetails: any;
                                }
                              }
                            />
                          );
                        case "tool-createTicket":
                          return (
                            <CreateTicketForm
                              args={
                                part.input as {
                                  ticket: {
                                    title: string;
                                    description?: string;
                                    pillars?: string[];
                                    dueDate?: string;
                                  };
                                }
                              }
                              addResult={(result) =>
                                addToolResult({
                                  tool: "createTicket",
                                  toolCallId: part.toolCallId,
                                  output: result,
                                })
                              }
                            />
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              </div>
            ))}
            {status === "submitted" && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}

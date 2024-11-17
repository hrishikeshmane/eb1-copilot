"use client";
import { Thread, useEdgeRuntime } from "@assistant-ui/react";
import { makeMarkdownText } from "@assistant-ui/react-markdown";

const MarkdownText = makeMarkdownText();

export default function ChatPage() {
  const runtime = useEdgeRuntime({
    api: "/api/chat",
  });

  return (
    <div className="mx-auto flex h-[calc(100vh-6rem)] flex-col p-4 pt-0">
      <Thread
        runtime={runtime}
        assistantMessage={{ components: { Text: MarkdownText } }}
      />
    </div>
  );
}
